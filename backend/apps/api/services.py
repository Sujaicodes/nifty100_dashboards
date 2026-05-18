from collections import defaultdict
from decimal import Decimal
from math import isfinite

from django.db import DatabaseError

from .analytics import attach_scores
from apps.warehouse.models import (
    AnalysisFact,
    BalanceSheetFact,
    CashFlowFact,
    Company,
    DocumentFact,
    MlScoreFact,
    ProfitLossFact,
    ProsConsFact,
    Sector,
    YearDimension,
)
from .sample_data import COMPANIES


def _to_float(value) -> float:
    if value is None:
        return 0.0
    if isinstance(value, Decimal):
        return float(value) if value.is_finite() else 0.0
    try:
        converted = float(value)
    except (TypeError, ValueError):
        return 0.0
    return converted if isfinite(converted) else 0.0


def _format_metric(value: float, suffix: str = "") -> str:
    return f"{value:.1f}{suffix}"


def _format_ratio(value: float) -> str:
    return f"{value:.2f}x"


def _is_meaningful_note(text: str) -> bool:
    normalized = text.strip()
    return bool(normalized) and normalized.upper() not in {"NULL", "N/A", "NA", "NONE", "-"}


def _warehouse_queryset():
    return Company.objects.select_related("sector")


def _latest_run_timestamp():
    return MlScoreFact.objects.order_by("-computed_at").values_list("computed_at", flat=True).first()


def _group_by_symbol(facts) -> dict[str, list]:
    grouped: dict[str, list] = defaultdict(list)
    for fact in facts:
        grouped[fact.symbol_id].append(fact)
    return grouped


def _latest_by_symbol(facts) -> dict[str, object]:
    latest = {}
    for fact in facts:
        latest.setdefault(fact.symbol_id, fact)
    return latest


def _serialize_warehouse_company(company: Company, related: dict | None = None) -> dict:
    return _serialize_warehouse_companies([company], related=related)[0]


def _serialize_warehouse_companies(companies: list[Company], related: dict | None = None) -> list[dict]:
    symbols = [company.symbol for company in companies]
    related = related or {
        "latest_scores": _latest_by_symbol(
            MlScoreFact.objects.filter(symbol_id__in=symbols).select_related("health_label").order_by("symbol_id", "-computed_at")
        ),
        "profits": _group_by_symbol(
            ProfitLossFact.objects.filter(symbol_id__in=symbols).select_related("year").order_by("symbol_id", "year__sort_order")
        ),
        "balances": _group_by_symbol(
            BalanceSheetFact.objects.filter(symbol_id__in=symbols).select_related("year").order_by("symbol_id", "year__sort_order")
        ),
        "cash_flows": _group_by_symbol(
            CashFlowFact.objects.filter(symbol_id__in=symbols).select_related("year").order_by("symbol_id", "year__sort_order")
        ),
        "analysis_3y": {
            fact.symbol_id: fact
            for fact in AnalysisFact.objects.filter(symbol_id__in=symbols, period_label="3Y")
        },
        "pros_cons": _group_by_symbol(ProsConsFact.objects.filter(symbol_id__in=symbols).order_by("symbol_id", "id")),
        "documents": _group_by_symbol(
            DocumentFact.objects.filter(symbol_id__in=symbols).select_related("year").order_by("symbol_id", "-year__sort_order")
        ),
    }

    payloads = []
    for company in companies:
        latest_score = related["latest_scores"].get(company.symbol)
        profit_facts = related["profits"].get(company.symbol, [])
        balance_facts = related["balances"].get(company.symbol, [])
        cash_facts = related["cash_flows"].get(company.symbol, [])
        analysis_3y = related["analysis_3y"].get(company.symbol)
        latest_profit = profit_facts[-1] if profit_facts else None
        latest_balance = balance_facts[-1] if balance_facts else None
        latest_cash = cash_facts[-1] if cash_facts else None
        balance_by_year = {fact.year_id: fact for fact in balance_facts}

        yearly_rows = []
        for fact in profit_facts:
            matching_balance = balance_by_year.get(fact.year_id)
            yearly_rows.append(
                {
                    "year": fact.year.fiscal_year,
                    "sales": _to_float(fact.sales),
                    "profit": _to_float(fact.net_profit),
                    "opm": _to_float(fact.opm_pct),
                    "debt": _to_float(matching_balance.debt_to_equity) if matching_balance else 0.0,
                    "eps": _to_float(fact.eps),
                    "dividend": _to_float(fact.dividend_payout_pct),
                }
            )

        notes = related["pros_cons"].get(company.symbol, [])
        pros = [note.text.strip() for note in notes if note.is_pro and _is_meaningful_note(note.text)]
        cons = [note.text.strip() for note in notes if not note.is_pro and _is_meaningful_note(note.text)]
        documents = [
            {
                "year": document.year.year_label,
                "fiscal_year": document.year.fiscal_year,
                "annual_report": document.annual_report,
                "document_type": document.document_type,
            }
            for document in related["documents"].get(company.symbol, [])
        ]

        payloads.append(
            {
                "symbol": company.symbol,
                "company_name": company.company_name,
                "sector": company.sector.sector_name,
                "company_logo": company.company_logo,
                "website": company.website,
                "nse_url": company.nse_url,
                "bse_url": company.bse_url,
                "about_company": company.about_company,
                "health_score": _to_float(latest_score.overall_score) if latest_score else 0.0,
                "health_label": latest_score.health_label.label_name if latest_score else "AVERAGE",
                "revenue": _to_float(latest_profit.sales) if latest_profit else 0.0,
                "roe": _to_float(analysis_3y.roe_pct) if analysis_3y else 0.0,
                "opm": _to_float(latest_profit.opm_pct) if latest_profit else 0.0,
                "debt_to_equity": _to_float(latest_balance.debt_to_equity) if latest_balance else 0.0,
                "sales_cagr_3y": _to_float(analysis_3y.compounded_sales_growth_pct) if analysis_3y else 0.0,
                "net_profit": _to_float(latest_profit.net_profit) if latest_profit else 0.0,
                "dividend_payout": _to_float(latest_profit.dividend_payout_pct) if latest_profit else 0.0,
                "interest_coverage": _to_float(latest_profit.interest_coverage) if latest_profit else 0.0,
                "cash_conversion": _to_float(latest_cash.cash_conversion_ratio) if latest_cash else 0.0,
                "years": yearly_rows,
                "pros": pros,
                "cons": cons,
                "documents": documents,
            }
        )
    return payloads


def _comparison_company_slice(company: dict) -> dict:
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "sector": company["sector"],
        "health_score": company["health_score"],
        "health_label": company["health_label"],
        "revenue": company["revenue"],
        "roe": company["roe"],
        "opm": company["opm"],
        "debt_to_equity": company["debt_to_equity"],
        "sales_cagr_3y": company["sales_cagr_3y"],
    }


def _generated_investor_notes(company: dict) -> tuple[list[str], list[str]]:
    pros = []
    cons = []
    symbol = company["symbol"]
    sector = company["sector"]
    health_score = company.get("health_score", 0.0)
    revenue = company.get("revenue", 0.0)
    opm = company.get("opm", 0.0)
    roe = company.get("roe", 0.0)
    debt_to_equity = company.get("debt_to_equity", 0.0)
    sales_cagr_3y = company.get("sales_cagr_3y", 0.0)
    dividend_payout = company.get("dividend_payout", 0.0)
    interest_coverage = company.get("interest_coverage", 0.0)
    cash_conversion = company.get("cash_conversion", 0.0)
    documents = company.get("documents", [])

    if revenue > 0:
        pros.append(f"{symbol} has a reported revenue base of Rs {round(revenue):,} Cr, giving the analysis a real operating scale to compare.")
    if opm >= 15:
        pros.append(f"Operating margin of {_format_metric(opm, '%')} shows a meaningful profit buffer before interest and tax.")
    elif opm > 0:
        cons.append(f"Operating margin of {_format_metric(opm, '%')} is modest, so margin stability should be checked against sector peers.")

    if roe >= 15:
        pros.append(f"ROE of {_format_metric(roe, '%')} indicates efficient use of shareholder capital.")
    elif roe > 0:
        cons.append(f"ROE of {_format_metric(roe, '%')} needs monitoring because returns are not yet clearly strong.")

    if debt_to_equity <= 0.75:
        pros.append(f"Debt-to-equity of {_format_ratio(debt_to_equity)} looks manageable for a non-lender balance sheet.")
    elif debt_to_equity > 1.5:
        cons.append(f"Debt-to-equity of {_format_ratio(debt_to_equity)} is elevated, so interest cost and refinancing risk matter.")
    else:
        cons.append(f"Debt-to-equity of {_format_ratio(debt_to_equity)} should be compared carefully within the {sector} sector.")

    if sales_cagr_3y >= 10:
        pros.append(f"3Y sales CAGR of {_format_metric(sales_cagr_3y, '%')} points to healthy growth momentum.")
    elif sales_cagr_3y > 0:
        cons.append(f"3Y sales CAGR of {_format_metric(sales_cagr_3y, '%')} is positive but not fast, so growth quality matters.")
    else:
        cons.append("Sales growth history is weak or unavailable, so the latest annual reports should be checked for demand drivers.")

    if cash_conversion >= 1:
        pros.append(f"Cash conversion of {_format_ratio(cash_conversion)} suggests reported profits are supported by operating cash flow.")
    elif cash_conversion > 0:
        cons.append(f"Cash conversion of {_format_ratio(cash_conversion)} is below ideal levels, so profit quality deserves a closer look.")
    else:
        cons.append("Cash conversion is unavailable or weak, so cash-flow statements need extra attention.")

    if interest_coverage >= 4:
        pros.append(f"Interest coverage of {_format_ratio(interest_coverage)} gives a cushion against financing costs.")
    elif interest_coverage > 0:
        cons.append(f"Interest coverage of {_format_ratio(interest_coverage)} leaves limited room if borrowing costs rise.")

    if documents:
        pros.append(f"{len(documents)} annual report links are available for source-level verification.")
    else:
        cons.append("Annual report links are missing, so source verification is limited.")

    if health_score < 70:
        health_note = f"Health score of {_format_metric(health_score)} is below the strong band, so the factor breakdown should be reviewed before drawing conclusions."
    elif health_score < 85:
        health_note = f"Health score of {_format_metric(health_score)} is solid but not excellent, so weaker factors still need review."
    else:
        health_note = f"Health score of {_format_metric(health_score)} is strong, but it should still be verified against valuation, filings, and sector context."
    cons.insert(0, health_note)
    if dividend_payout > 80:
        cons.append(f"Dividend payout of {_format_metric(dividend_payout, '%')} is high and may be hard to sustain without earnings growth.")
    elif dividend_payout == 0:
        cons.append("Dividend payout is unavailable or zero, so income-focused investors may need additional checks.")

    fallback_pros = [
        f"{symbol} has enough warehouse data for a first-pass financial review.",
        f"The company can be compared with other {sector} names using consistent warehouse metrics.",
        "The score model gives a structured starting point across profitability, growth, leverage, cash flow, dividend, and trend factors.",
    ]
    fallback_cons = [
        "Generated notes are based on structured financial metrics and should be verified against filings.",
        "Qualitative business risks may not be fully captured by the current warehouse data.",
        "Sector context is important before treating any single metric as positive or negative.",
    ]

    return (pros + fallback_pros)[:4], (cons + fallback_cons)[:4]


def _ensure_investor_notes(company: dict) -> dict:
    generated_pros, generated_cons = _generated_investor_notes(company)
    company["pros"] = (company.get("pros", []) + [item for item in generated_pros if item not in company.get("pros", [])])[:4]
    company["cons"] = (company.get("cons", []) + [item for item in generated_cons if item not in company.get("cons", [])])[:4]
    return company


def _warehouse_companies_exist() -> bool:
    try:
        return Company.objects.exists()
    except DatabaseError:
        return False


def list_companies(sector: str | None = None) -> list[dict]:
    if _warehouse_companies_exist():
        try:
            companies = list(_warehouse_queryset().order_by("company_name"))
            all_companies = _serialize_warehouse_companies(companies)
            scored_companies = [_ensure_investor_notes(company) for company in attach_scores(all_companies)]
            if sector and sector != "All":
                return [company for company in scored_companies if company["sector"] == sector]
            return scored_companies
        except Exception as exc:
            print(f"Warehouse company serialization failed: {type(exc).__name__}: {exc}", flush=True)
            pass

    if sector and sector != "All":
        return attach_scores([company for company in COMPANIES if company["sector"] == sector])
    return attach_scores(COMPANIES)


def get_company(symbol: str) -> dict | None:
    return next((company for company in list_companies() if company["symbol"] == symbol), None)


def company_financial_summary(symbol: str) -> dict | None:
    company = get_company(symbol)
    if not company:
        return None

    latest_year = company["years"][-1] if company.get("years") else {}
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "sector": company["sector"],
        "health_score": company["health_score"],
        "health_label": company["health_label"],
        "summary": {
            "revenue": company["revenue"],
            "net_profit": company["net_profit"],
            "opm": company["opm"],
            "roe": company["roe"],
            "debt_to_equity": company["debt_to_equity"],
            "sales_cagr_3y": company["sales_cagr_3y"],
            "dividend_payout": company["dividend_payout"],
            "interest_coverage": company["interest_coverage"],
            "cash_conversion": company["cash_conversion"],
        },
        "latest_year": latest_year,
    }


def balance_sheet_trend(symbol: str) -> dict | None:
    if _warehouse_companies_exist():
        company = _warehouse_queryset().filter(symbol=symbol).first()
        if not company:
            return None
        rows = [
            {
                "year": fact.year.year_label,
                "fiscal_year": fact.year.fiscal_year,
                "equity_capital": _to_float(fact.equity_capital),
                "reserves": _to_float(fact.reserves),
                "borrowings": _to_float(fact.borrowings),
                "other_liabilities": _to_float(fact.other_liabilities),
                "total_liabilities": _to_float(fact.total_liabilities),
                "fixed_assets": _to_float(fact.fixed_assets),
                "cwip": _to_float(fact.cwip),
                "investments": _to_float(fact.investments),
                "other_assets": _to_float(fact.other_assets),
                "total_assets": _to_float(fact.total_assets),
                "debt_to_equity": _to_float(fact.debt_to_equity),
                "equity_ratio": _to_float(fact.equity_ratio),
            }
            for fact in BalanceSheetFact.objects.filter(symbol=company).select_related("year").order_by("-year__sort_order")
        ]
        return {"symbol": company.symbol, "company_name": company.company_name, "rows": rows}
    return None


def cash_flow_trend(symbol: str) -> dict | None:
    if _warehouse_companies_exist():
        company = _warehouse_queryset().filter(symbol=symbol).first()
        if not company:
            return None
        rows = [
            {
                "year": fact.year.year_label,
                "fiscal_year": fact.year.fiscal_year,
                "operating_activity": _to_float(fact.operating_activity),
                "investing_activity": _to_float(fact.investing_activity),
                "financing_activity": _to_float(fact.financing_activity),
                "net_cash_flow": _to_float(fact.net_cash_flow),
                "free_cash_flow": _to_float(fact.free_cash_flow),
                "cash_conversion_ratio": _to_float(fact.cash_conversion_ratio),
            }
            for fact in CashFlowFact.objects.filter(symbol=company).select_related("year").order_by("year__sort_order")
        ]
        return {"symbol": company.symbol, "company_name": company.company_name, "rows": rows}
    return None


def health_score_breakdown(symbol: str) -> dict | None:
    company_payload = get_company(symbol)
    company_model = _warehouse_queryset().filter(symbol=symbol).first() if _warehouse_companies_exist() else None
    if not company_payload:
        return None

    history = [
        {
            "computed_at": score.computed_at.isoformat(),
            "overall_score": _to_float(score.overall_score),
            "profitability_score": _to_float(score.profitability_score),
            "growth_score": _to_float(score.growth_score),
            "leverage_score": _to_float(score.leverage_score),
            "cashflow_score": _to_float(score.cashflow_score),
            "dividend_score": _to_float(score.dividend_score),
            "trend_score": _to_float(score.trend_score),
            "health_label": score.health_label.label_name,
        }
        for score in MlScoreFact.objects.filter(symbol=company_model).select_related("health_label").order_by("-computed_at")[:10]
    ]
    return {
        "symbol": company_payload["symbol"],
        "company_name": company_payload["company_name"],
        "latest": {
            "overall_score": company_payload["health_score"],
            "health_label": company_payload["health_label"],
            "score_breakdown": company_payload.get("score_breakdown", {}),
        },
        "history": history,
    }


def company_documents(symbol: str) -> dict | None:
    company = get_company(symbol)
    if not company:
        return None
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "documents": company.get("documents", []),
    }


def company_pros_cons(symbol: str) -> dict | None:
    company = get_company(symbol)
    if not company:
        return None
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "pros": company.get("pros", []),
        "cons": company.get("cons", []),
    }


def sector_comparison(selected_sectors: list[str] | None = None) -> dict:
    companies = list_companies()
    if selected_sectors:
        selected = {sector.strip() for sector in selected_sectors if sector.strip()}
        companies = [company for company in companies if company["sector"] in selected]

    summary = sector_summary(companies)
    company_breakdown: dict[str, list[dict]] = defaultdict(list)
    for company in companies:
        company_breakdown[company["sector"]].append(_comparison_company_slice(company))

    for sector_name in company_breakdown:
        company_breakdown[sector_name].sort(key=lambda item: (-item["health_score"], item["company_name"]))

    return {
        "selected_sectors": selected_sectors or [],
        "summary": summary,
        "companies": dict(company_breakdown),
    }


def peer_comparison(symbol: str) -> dict | None:
    company = get_company(symbol)
    if not company:
        return None

    sector_peers = [item for item in list_companies(sector=company["sector"]) if item["symbol"] != symbol]
    sector_population = sector_peers + [company]
    sector_average = {
        "health_score": round(sum(item["health_score"] for item in sector_population) / len(sector_population), 2),
        "roe": round(sum(item["roe"] for item in sector_population) / len(sector_population), 2),
        "opm": round(sum(item["opm"] for item in sector_population) / len(sector_population), 2),
        "debt_to_equity": round(sum(item["debt_to_equity"] for item in sector_population) / len(sector_population), 2),
        "sales_cagr_3y": round(sum(item["sales_cagr_3y"] for item in sector_population) / len(sector_population), 2),
    }

    ranked = sorted(sector_population, key=lambda item: (-item["health_score"], item["company_name"]))
    top_peers = [_comparison_company_slice(item) for item in ranked[:3]]
    bottom_peers = [_comparison_company_slice(item) for item in ranked[-3:]]
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "sector": company["sector"],
        "selected_company": _comparison_company_slice(company),
        "sector_average": sector_average,
        "top_peers": top_peers,
        "bottom_peers": bottom_peers,
        "comparison_gap": {
            "health_score": round(company["health_score"] - sector_average["health_score"], 2),
            "roe": round(company["roe"] - sector_average["roe"], 2),
            "opm": round(company["opm"] - sector_average["opm"], 2),
            "debt_to_equity": round(company["debt_to_equity"] - sector_average["debt_to_equity"], 2),
            "sales_cagr_3y": round(company["sales_cagr_3y"] - sector_average["sales_cagr_3y"], 2),
        },
    }


def growth_analytics(symbol: str) -> dict | None:
    company = get_company(symbol)
    if not company:
        return None

    growth_rows = company.get("growth_rows", [])
    latest = growth_rows[-1] if growth_rows else {}
    return {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "latest": {
            "sales_growth_yoy": latest.get("sales_growth_yoy"),
            "profit_growth_yoy": latest.get("profit_growth_yoy"),
            "eps_growth_yoy": latest.get("eps_growth_yoy"),
            "opm_change": latest.get("opm_change"),
        },
        "cagr_summary": company.get("cagr_summary", {}),
        "yoy_growth": growth_rows,
    }


def available_years() -> list[int]:
    if _warehouse_companies_exist():
        try:
            years = YearDimension.objects.values_list("fiscal_year", flat=True).distinct()
            return sorted((year for year in years if year is not None), reverse=True)
        except Exception as exc:
            print(f"Warehouse years lookup failed: {type(exc).__name__}: {exc}", flush=True)
            pass
    years = {entry["year"] for company in COMPANIES for entry in company["years"]}
    return sorted(years, reverse=True)


def sectors() -> list[str]:
    if _warehouse_companies_exist():
        try:
            return list(Sector.objects.order_by("sector_name").values_list("sector_name", flat=True))
        except Exception as exc:
            print(f"Warehouse sector lookup failed: {type(exc).__name__}: {exc}", flush=True)
            pass
    return sorted({company["sector"] for company in COMPANIES})


def executive_overview(companies: list[dict] | None = None) -> dict:
    companies = companies or list_companies()
    excellent = sum(1 for company in companies if company["health_score"] >= 85)
    weak = sum(1 for company in companies if company["health_score"] < 50)

    return {
        "total_companies": len(companies),
        "average_roe": round(sum(company["roe"] for company in companies) / len(companies), 2),
        "excellent_health_count": excellent,
        "weak_health_count": weak,
        "average_health_score": round(sum(company["health_score"] for company in companies) / len(companies), 2),
    }


def sector_summary(companies: list[dict] | None = None) -> list[dict]:
    companies = companies or list_companies()
    grouped: dict[str, list[dict]] = defaultdict(list)
    for company in companies:
        grouped[company["sector"]].append(company)

    summary = []
    for sector_name, companies in grouped.items():
        summary.append(
            {
                "sector": sector_name,
                "company_count": len(companies),
                "average_health_score": round(sum(company["health_score"] for company in companies) / len(companies), 2),
                "average_roe": round(sum(company["roe"] for company in companies) / len(companies), 2),
                "total_revenue": sum(company["revenue"] for company in companies),
                "average_opm": round(sum(company["opm"] for company in companies) / len(companies), 2),
            }
        )
    return sorted(summary, key=lambda item: item["total_revenue"], reverse=True)


def bootstrap_payload() -> dict:
    try:
        companies = list_companies()
        return {
            "companies": companies,
            "sectors": sectors(),
            "years": available_years(),
            "overview": executive_overview(companies),
            "sector_summary": sector_summary(companies),
        }
    except Exception as exc:
        print(f"Bootstrap payload failed: {type(exc).__name__}: {exc}", flush=True)
        companies = attach_scores(COMPANIES)
        return {
            "companies": companies,
            "sectors": sorted({company["sector"] for company in companies}),
            "years": sorted({entry["year"] for company in companies for entry in company["years"]}, reverse=True),
            "overview": executive_overview(companies),
            "sector_summary": sector_summary(companies),
        }
