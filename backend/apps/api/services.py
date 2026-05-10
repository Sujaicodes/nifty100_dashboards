from collections import defaultdict
from decimal import Decimal

from django.db import DatabaseError

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
        return float(value)
    return float(value)


def _warehouse_queryset():
    return Company.objects.select_related("sector")


def _serialize_warehouse_company(company: Company) -> dict:
    latest_score = MlScoreFact.objects.filter(symbol=company).select_related("health_label").order_by("-computed_at").first()
    latest_profit = ProfitLossFact.objects.filter(symbol=company).select_related("year").order_by("-year__sort_order").first()
    latest_balance = BalanceSheetFact.objects.filter(symbol=company).select_related("year").order_by("-year__sort_order").first()
    latest_cash = CashFlowFact.objects.filter(symbol=company).select_related("year").order_by("-year__sort_order").first()
    analysis_3y = AnalysisFact.objects.filter(symbol=company, period_label="3Y").first()

    balance_by_year = {
        fact.year_id: fact
        for fact in BalanceSheetFact.objects.filter(symbol=company).select_related("year")
    }
    yearly_profit_facts = ProfitLossFact.objects.filter(symbol=company).select_related("year").order_by("year__sort_order")
    yearly_rows = []
    for fact in yearly_profit_facts:
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

    pros = list(
        ProsConsFact.objects.filter(symbol=company, is_pro=True).values_list("text", flat=True)
    )
    cons = list(
        ProsConsFact.objects.filter(symbol=company, is_pro=False).values_list("text", flat=True)
    )
    documents = [
        {
            "year": document.year.year_label,
            "fiscal_year": document.year.fiscal_year,
            "annual_report": document.annual_report,
            "document_type": document.document_type,
        }
        for document in DocumentFact.objects.filter(symbol=company).select_related("year").order_by("-year__sort_order")
    ]

    return {
        "symbol": company.symbol,
        "company_name": company.company_name,
        "sector": company.sector.sector_name,
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


def _warehouse_companies_exist() -> bool:
    try:
        return Company.objects.exists()
    except DatabaseError:
        return False


def list_companies(sector: str | None = None) -> list[dict]:
    if _warehouse_companies_exist():
        queryset = _warehouse_queryset()
        if sector and sector != "All":
            queryset = queryset.filter(sector__sector_name=sector)
        return [_serialize_warehouse_company(company) for company in queryset.order_by("company_name")]

    if sector and sector != "All":
        return [company for company in COMPANIES if company["sector"] == sector]
    return COMPANIES


def get_company(symbol: str) -> dict | None:
    if _warehouse_companies_exist():
        company = _warehouse_queryset().filter(symbol=symbol).first()
        return _serialize_warehouse_company(company) if company else None
    return next((company for company in COMPANIES if company["symbol"] == symbol), None)


def available_years() -> list[int]:
    if _warehouse_companies_exist():
        years = YearDimension.objects.values_list("fiscal_year", flat=True).distinct()
        return sorted((year for year in years if year is not None), reverse=True)
    years = {entry["year"] for company in COMPANIES for entry in company["years"]}
    return sorted(years, reverse=True)


def sectors() -> list[str]:
    if _warehouse_companies_exist():
        return list(Sector.objects.order_by("sector_name").values_list("sector_name", flat=True))
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
    companies = list_companies()
    return {
        "companies": companies,
        "sectors": sectors(),
        "years": available_years(),
        "overview": executive_overview(companies),
        "sector_summary": sector_summary(companies),
    }
