from __future__ import annotations

from math import isfinite


DIMENSIONS = {
    "profitability": [
        ("opm", "OPM", True),
        ("roe", "ROE", True),
        ("net_profit_margin", "Net profit margin", True),
    ],
    "growth": [
        ("sales_cagr_3y", "3Y sales CAGR", True),
        ("sales_growth_yoy", "Revenue YoY growth", True),
        ("profit_growth_yoy", "Profit YoY growth", True),
    ],
    "leverage": [
        ("debt_to_equity", "Debt to equity", False),
        ("interest_coverage", "Interest coverage", True),
        ("equity_ratio_proxy", "Capital base ratio", True),
    ],
    "cashflow": [
        ("cash_conversion", "Cash conversion", True),
        ("free_cash_flow_margin", "Free cash flow margin", True),
        ("cashflow_stability", "Cash flow stability", True),
    ],
    "dividend": [
        ("dividend_payout", "Dividend payout", True),
        ("eps_growth_yoy", "EPS YoY growth", True),
    ],
    "trend": [
        ("revenue_consistency", "Revenue consistency", True),
        ("profit_consistency", "Profit consistency", True),
        ("opm_trend", "Margin trend", True),
    ],
}

WEIGHTS = {
    "profitability": 0.24,
    "growth": 0.22,
    "leverage": 0.18,
    "cashflow": 0.16,
    "dividend": 0.08,
    "trend": 0.12,
}


def safe_divide(numerator: float | int | None, denominator: float | int | None) -> float | None:
    if numerator is None or denominator in (None, 0):
        return None
    return float(numerator) / float(denominator)


def yoy_growth(current: float | int | None, previous: float | int | None) -> float | None:
    if current is None or previous in (None, 0):
        return None
    return ((float(current) - float(previous)) / abs(float(previous))) * 100


def cagr(start_value: float | int | None, end_value: float | int | None, periods: int) -> float | None:
    if start_value in (None, 0) or end_value in (None, 0) or periods <= 0:
        return None
    start = float(start_value)
    end = float(end_value)
    if start <= 0 or end <= 0:
        return None
    return ((end / start) ** (1 / periods) - 1) * 100


def percentile_score(value: float | None, population: list[float], *, higher_is_better: bool = True) -> float | None:
    if value is None:
        return None
    values = [item for item in population if item is not None and isfinite(item)]
    if not values:
        return None
    if higher_is_better:
        rank = sum(1 for item in values if item <= value)
    else:
        rank = sum(1 for item in values if item >= value)
    return round((rank / len(values)) * 100, 2)


def score_label(score: float) -> str:
    if score >= 85:
        return "EXCELLENT"
    if score >= 70:
        return "GOOD"
    if score >= 50:
        return "AVERAGE"
    if score >= 35:
        return "WEAK"
    return "POOR"


def score_tone(score: float) -> str:
    if score >= 85:
        return "best-in-class"
    if score >= 70:
        return "strong"
    if score >= 50:
        return "mixed"
    if score >= 35:
        return "fragile"
    return "weak"


def latest_row(company: dict) -> dict:
    rows = sorted(company.get("years", []), key=lambda item: item.get("year", 0))
    return rows[-1] if rows else {}


def build_growth_rows(company: dict) -> list[dict]:
    rows = sorted(company.get("years", []), key=lambda item: item.get("year", 0))
    growth_rows: list[dict] = []
    for index, row in enumerate(rows):
        previous = rows[index - 1] if index > 0 else None
        growth_rows.append(
            {
                "year": row.get("year"),
                "sales": row.get("sales"),
                "profit": row.get("profit"),
                "eps": row.get("eps"),
                "opm": row.get("opm"),
                "sales_growth_yoy": yoy_growth(row.get("sales"), previous.get("sales") if previous else None),
                "profit_growth_yoy": yoy_growth(row.get("profit"), previous.get("profit") if previous else None),
                "eps_growth_yoy": yoy_growth(row.get("eps"), previous.get("eps") if previous else None),
                "opm_change": (row.get("opm") - previous.get("opm")) if previous and row.get("opm") is not None and previous.get("opm") is not None else None,
            }
        )
    return growth_rows


def consistency_score(values: list[float | None]) -> float | None:
    usable = [value for value in values if value is not None]
    if not usable:
        return None
    positives = sum(1 for value in usable if value > 0)
    return round((positives / len(usable)) * 100, 2)


def first_non_null(values: list[float | None], periods: int) -> float | None:
    if periods <= 0 or len(values) <= periods:
        return None
    return values[-(periods + 1)]


def build_feature_record(company: dict) -> dict:
    growth_rows = build_growth_rows(company)
    latest = growth_rows[-1] if growth_rows else {}
    revenues = [row.get("sales") for row in growth_rows]
    profits = [row.get("profit") for row in growth_rows]
    opms = [row.get("opm") for row in growth_rows]

    revenue_base = (company.get("revenue") or 0) - (company.get("net_profit") or 0)
    capital_base_proxy = revenue_base if revenue_base > 0 else None

    free_cash_flow_margin = safe_divide((company.get("cash_conversion") or 0) * (company.get("net_profit") or 0), company.get("revenue"))
    if free_cash_flow_margin is not None:
        free_cash_flow_margin *= 100

    sales_growth_values = [row.get("sales_growth_yoy") for row in growth_rows[1:]]
    profit_growth_values = [row.get("profit_growth_yoy") for row in growth_rows[1:]]
    opm_change_values = [row.get("opm_change") for row in growth_rows[1:]]

    features = {
        "symbol": company["symbol"],
        "company_name": company["company_name"],
        "sector": company["sector"],
        "opm": company.get("opm"),
        "roe": company.get("roe"),
        "net_profit_margin": safe_divide(company.get("net_profit"), company.get("revenue")),
        "debt_to_equity": company.get("debt_to_equity"),
        "interest_coverage": company.get("interest_coverage"),
        "cash_conversion": company.get("cash_conversion"),
        "dividend_payout": company.get("dividend_payout"),
        "sales_cagr_3y": company.get("sales_cagr_3y"),
        "sales_growth_yoy": latest.get("sales_growth_yoy"),
        "profit_growth_yoy": latest.get("profit_growth_yoy"),
        "eps_growth_yoy": latest.get("eps_growth_yoy"),
        "opm_trend": sum(opm_change_values[-3:]) / len(opm_change_values[-3:]) if opm_change_values[-3:] else None,
        "revenue_consistency": consistency_score(sales_growth_values),
        "profit_consistency": consistency_score(profit_growth_values),
        "free_cash_flow_margin": free_cash_flow_margin,
        "cashflow_stability": consistency_score([company.get("cash_conversion")] + [latest.get("sales_growth_yoy")]),
        "equity_ratio_proxy": safe_divide(capital_base_proxy, company.get("revenue")),
        "growth_rows": growth_rows,
        "cagr_summary": {
            "sales_3y": cagr(first_non_null(revenues, 3), revenues[-1] if revenues else None, 3),
            "sales_5y": cagr(first_non_null(revenues, 5), revenues[-1] if revenues else None, 5),
            "sales_10y": cagr(first_non_null(revenues, 10), revenues[-1] if revenues else None, 10),
            "profit_3y": cagr(first_non_null(profits, 3), profits[-1] if profits else None, 3),
            "profit_5y": cagr(first_non_null(profits, 5), profits[-1] if profits else None, 5),
            "profit_10y": cagr(first_non_null(profits, 10), profits[-1] if profits else None, 10),
        },
    }

    if features["net_profit_margin"] is not None:
        features["net_profit_margin"] *= 100
    if features["equity_ratio_proxy"] is not None:
        features["equity_ratio_proxy"] *= 100

    return features


def explain_dimension(name: str, score: float, metrics: list[dict]) -> str:
    if not metrics:
        return f"{name.title()} is unavailable because the required financial inputs are missing."

    top_metrics = sorted(metrics, key=lambda item: item["percentile"], reverse=True)[:2]
    details = ", ".join(f"{metric['label']} {metric['value_display']}" for metric in top_metrics)
    return f"{name.title()} is {score_tone(score)} because {details} rank well versus the tracked universe."


def attach_scores(companies: list[dict]) -> list[dict]:
    feature_records = [build_feature_record(company) for company in companies]

    populations = {
        metric_name: [record.get(metric_name) for record in feature_records if record.get(metric_name) is not None]
        for dimensions in DIMENSIONS.values()
        for metric_name, _, _ in dimensions
    }

    enriched: list[dict] = []
    for company, features in zip(companies, feature_records):
        breakdown = {}
        overall_score = 0.0
        total_weight = 0.0

        for dimension_name, specs in DIMENSIONS.items():
            metric_payloads = []
            metric_scores = []
            for metric_name, label, higher_is_better in specs:
                raw_value = features.get(metric_name)
                percentile = percentile_score(raw_value, populations.get(metric_name, []), higher_is_better=higher_is_better)
                if percentile is None:
                    continue
                metric_scores.append(percentile)
                metric_payloads.append(
                    {
                        "metric": metric_name,
                        "label": label,
                        "value": raw_value,
                        "value_display": f"{round(raw_value, 2)}" if raw_value is not None else "NA",
                        "percentile": percentile,
                        "higher_is_better": higher_is_better,
                    }
                )

            dimension_score_value = round(sum(metric_scores) / len(metric_scores), 2) if metric_scores else 0.0
            breakdown[dimension_name] = {
                "score": dimension_score_value,
                "label": score_label(dimension_score_value),
                "metrics": metric_payloads,
                "explanation": explain_dimension(dimension_name, dimension_score_value, metric_payloads),
            }
            overall_score += dimension_score_value * WEIGHTS[dimension_name]
            total_weight += WEIGHTS[dimension_name]

        normalized_overall = round(overall_score / total_weight, 2) if total_weight else 0.0
        enriched.append(
            {
                **company,
                "health_score": normalized_overall,
                "health_label": score_label(normalized_overall),
                "score_breakdown": breakdown,
                "latest_yoy_sales_growth": features.get("sales_growth_yoy"),
                "latest_yoy_profit_growth": features.get("profit_growth_yoy"),
                "latest_yoy_eps_growth": features.get("eps_growth_yoy"),
                "growth_rows": features.get("growth_rows", []),
                "cagr_summary": features.get("cagr_summary", {}),
            }
        )
    return enriched
