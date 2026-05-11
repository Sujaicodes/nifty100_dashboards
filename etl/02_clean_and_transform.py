"""Clean raw CSV files and reshape them into star-schema warehouse outputs."""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd


SECTOR_LOOKUP = {
    "TCS": "IT",
    "INFY": "IT",
    "WIPRO": "IT",
    "HDFCBANK": "Banking",
    "AXISBANK": "Banking",
    "BANKBARODA": "Banking",
    "BAJFINANCE": "NBFC",
    "BAJAJFINSV": "NBFC",
    "SBILIFE": "Insurance",
    "RELIANCE": "Energy",
    "ADANIGREEN": "Power",
    "ADANIPOWER": "Power",
    "ADANIENSOL": "Energy",
    "ATGL": "Energy",
    "AMBUJACEM": "Cement",
    "APOLLOHOSP": "Healthcare",
    "ASIANPAINT": "Paint",
    "BAJAJ-AUTO": "Auto",
}

HEALTH_LABELS = [
    {"label_id": 1, "label_name": "EXCELLENT", "min_score": 85, "max_score": 100, "color_hex": "#1d9a63"},
    {"label_id": 2, "label_name": "GOOD", "min_score": 70, "max_score": 84, "color_hex": "#1040c0"},
    {"label_id": 3, "label_name": "AVERAGE", "min_score": 50, "max_score": 69, "color_hex": "#f0c020"},
    {"label_id": 4, "label_name": "WEAK", "min_score": 35, "max_score": 49, "color_hex": "#d02020"},
    {"label_id": 5, "label_name": "POOR", "min_score": 0, "max_score": 34, "color_hex": "#121212"},
]


def load_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        return pd.DataFrame()
    return pd.read_csv(path).replace({"NULL": pd.NA, "Null": pd.NA, "null": pd.NA})


def clean_company_names(series: pd.Series) -> pd.Series:
    return series.astype(str).str.replace(r"\s+", " ", regex=True).str.strip()


def normalize_year_label(value: str) -> tuple[str, int | None, int, bool, bool]:
    raw = str(value).strip()
    if raw.upper() == "TTM":
        return "TTM", None, 9999, True, False

    normalized = raw.replace("-", " ")
    parts = normalized.split()
    if len(parts) != 2:
        return raw, None, 0, False, False

    period, year_part = parts[0].title(), parts[1]
    fiscal_year = int(f"20{year_part}") if len(year_part) == 2 and year_part.isdigit() else int(year_part) if year_part.isdigit() else None
    if fiscal_year is None:
        return raw, None, 0, False, False

    is_half_year = period in {"Sep", "Dec"}
    return f"{period} {fiscal_year}", fiscal_year, fiscal_year, False, is_half_year


def _year_column_name(df: pd.DataFrame) -> str | None:
    for candidate in ("year", "Year", "report_date", "period"):
        if candidate in df.columns:
            return candidate
    return None


def _symbol_column_name(df: pd.DataFrame) -> str | None:
    for candidate in ("company_id", "symbol", "ticker", "code"):
        if candidate in df.columns:
            return candidate
    return None


def _normalize_year_columns(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    year_column = _year_column_name(df)
    if not year_column:
        return df

    year_parts = df[year_column].apply(normalize_year_label)
    df = df.copy()
    df["year_label"] = year_parts.apply(lambda item: item[0])
    df["fiscal_year"] = year_parts.apply(lambda item: item[1])
    df["sort_order"] = year_parts.apply(lambda item: item[2])
    df["is_ttm"] = year_parts.apply(lambda item: item[3])
    df["is_half_year"] = year_parts.apply(lambda item: item[4])
    return df


def _series(df: pd.DataFrame, *candidates: str, default=0.0) -> pd.Series:
    for candidate in candidates:
        if candidate in df.columns:
            return pd.to_numeric(df[candidate], errors="coerce").fillna(default)
    return pd.Series([default] * len(df), index=df.index)


def _text_series(df: pd.DataFrame, *candidates: str, default: str = "") -> pd.Series:
    for candidate in candidates:
        if candidate in df.columns:
            return df[candidate].fillna(default).astype(str)
    return pd.Series([default] * len(df), index=df.index)


def build_dim_company(companies: pd.DataFrame) -> pd.DataFrame:
    if companies.empty:
        return pd.DataFrame(
            columns=[
                "symbol",
                "company_name",
                "sector",
                "company_logo",
                "website",
                "nse_url",
                "bse_url",
                "face_value",
                "book_value",
                "about_company",
            ]
        )

    symbol_column = _symbol_column_name(companies) or "company_id"
    company_name_column = "company_name" if "company_name" in companies.columns else companies.columns[0]
    clean = companies.copy()
    clean[company_name_column] = clean_company_names(clean[company_name_column])
    clean["sector"] = clean[symbol_column].map(SECTOR_LOOKUP).fillna("Unclassified")

    return pd.DataFrame(
        {
            "symbol": clean[symbol_column].astype(str).str.strip(),
            "company_name": clean[company_name_column],
            "sector": clean["sector"],
            "company_logo": _text_series(clean, "logo", "company_logo"),
            "website": _text_series(clean, "website"),
            "nse_url": _text_series(clean, "nse_url"),
            "bse_url": _text_series(clean, "bse_url"),
            "face_value": _series(clean, "face_value"),
            "book_value": _series(clean, "book_value"),
            "about_company": _text_series(clean, "about_company", "description"),
        }
    ).drop_duplicates(subset=["symbol"])


def build_dim_sector(dim_company: pd.DataFrame) -> pd.DataFrame:
    sectors = sorted(dim_company["sector"].dropna().unique().tolist()) if not dim_company.empty else []
    return pd.DataFrame(
        [
            {
                "sector_id": index + 1,
                "sector_name": sector_name,
                "sector_code": sector_name.upper().replace(" ", "_"),
                "description": f"{sector_name} companies in the Nifty 100 universe",
            }
            for index, sector_name in enumerate(sectors)
        ]
    )


def build_dim_year(*frames: pd.DataFrame) -> pd.DataFrame:
    normalized_frames = [_normalize_year_columns(frame) for frame in frames if not frame.empty]
    year_rows = []
    for frame in normalized_frames:
        if "year_label" not in frame.columns:
            continue
        year_rows.extend(
            frame[["year_label", "fiscal_year", "sort_order", "is_ttm", "is_half_year"]]
            .drop_duplicates()
            .to_dict("records")
        )

    if not year_rows:
        return pd.DataFrame(columns=["year_id", "year_label", "fiscal_year", "quarter", "is_ttm", "is_half_year", "sort_order"])

    dim_year = pd.DataFrame(year_rows).drop_duplicates().sort_values(["sort_order", "year_label"]).reset_index(drop=True)
    dim_year["year_id"] = range(1, len(dim_year) + 1)
    dim_year["quarter"] = dim_year["year_label"].str.split().str[0].map({"Mar": "Q4", "Dec": "Q3", "Sep": "Q2", "Jun": "Q1"}).fillna("")
    return dim_year[["year_id", "year_label", "fiscal_year", "quarter", "is_ttm", "is_half_year", "sort_order"]]


def build_fact_profit_loss(raw_profit: pd.DataFrame, dim_year: pd.DataFrame) -> pd.DataFrame:
    if raw_profit.empty:
        return pd.DataFrame()
    frame = _normalize_year_columns(raw_profit)
    symbol_column = _symbol_column_name(frame) or "company_id"
    frame = frame.merge(dim_year[["year_id", "year_label"]], on="year_label", how="left")
    frame["sales"] = _series(frame, "sales", "revenue")
    frame["expenses"] = _series(frame, "expenses")
    frame["operating_profit"] = _series(frame, "operating_profit")
    frame["interest"] = _series(frame, "interest")
    frame["net_profit"] = _series(frame, "net_profit", "profit")
    frame["net_profit_margin_pct"] = (frame["net_profit"] / frame["sales"]).replace([pd.NA, float("inf"), -float("inf")], 0).fillna(0) * 100
    frame["expense_ratio_pct"] = (frame["expenses"] / frame["sales"]).replace([pd.NA, float("inf"), -float("inf")], 0).fillna(0) * 100
    frame["interest_coverage"] = (frame["operating_profit"] / frame["interest"].replace(0, pd.NA)).fillna(0)
    return pd.DataFrame(
        {
            "symbol": frame[symbol_column].astype(str).str.strip(),
            "year_id": frame["year_id"],
            "sales": frame["sales"],
            "expenses": frame["expenses"],
            "operating_profit": frame["operating_profit"],
            "opm_pct": _series(frame, "opm_pct"),
            "other_income": _series(frame, "other_income"),
            "interest": frame["interest"],
            "depreciation": _series(frame, "depreciation"),
            "profit_before_tax": _series(frame, "profit_before_tax", "pbt"),
            "tax_pct": _series(frame, "tax_pct"),
            "net_profit": frame["net_profit"],
            "eps": _series(frame, "eps"),
            "dividend_payout_pct": _series(frame, "dividend_payout_pct", "dividend"),
            "net_profit_margin_pct": frame["net_profit_margin_pct"].round(4),
            "expense_ratio_pct": frame["expense_ratio_pct"].round(4),
            "interest_coverage": frame["interest_coverage"].round(4),
        }
    )


def build_fact_balance_sheet(raw_balance: pd.DataFrame, dim_year: pd.DataFrame) -> pd.DataFrame:
    if raw_balance.empty:
        return pd.DataFrame()
    frame = _normalize_year_columns(raw_balance)
    symbol_column = _symbol_column_name(frame) or "company_id"
    frame = frame.merge(dim_year[["year_id", "year_label"]], on="year_label", how="left")
    equity_capital = _series(frame, "equity_capital")
    reserves = _series(frame, "reserves")
    borrowings = _series(frame, "borrowings")
    total_assets = _series(frame, "total_assets")
    capital_base = (equity_capital + reserves).replace(0, pd.NA)

    return pd.DataFrame(
        {
            "symbol": frame[symbol_column].astype(str).str.strip(),
            "year_id": frame["year_id"],
            "equity_capital": equity_capital,
            "reserves": reserves,
            "borrowings": borrowings,
            "other_liabilities": _series(frame, "other_liabilities"),
            "total_liabilities": _series(frame, "total_liabilities"),
            "fixed_assets": _series(frame, "fixed_assets"),
            "cwip": _series(frame, "cwip"),
            "investments": _series(frame, "investments"),
            "other_assets": _series(frame, "other_assets"),
            "total_assets": total_assets,
            "debt_to_equity": (borrowings / capital_base).fillna(0).round(4),
            "equity_ratio": ((equity_capital + reserves) / total_assets.replace(0, pd.NA)).fillna(0).round(4),
        }
    )


def build_fact_cash_flow(raw_cash: pd.DataFrame, dim_year: pd.DataFrame, fact_profit_loss: pd.DataFrame) -> pd.DataFrame:
    if raw_cash.empty:
        return pd.DataFrame()
    frame = _normalize_year_columns(raw_cash)
    symbol_column = _symbol_column_name(frame) or "company_id"
    frame = frame.merge(dim_year[["year_id", "year_label"]], on="year_label", how="left")
    frame["operating_activity"] = _series(frame, "operating_activity")
    frame["investing_activity"] = _series(frame, "investing_activity")
    frame["financing_activity"] = _series(frame, "financing_activity")
    frame["net_cash_flow"] = _series(frame, "net_cash_flow")
    frame["free_cash_flow"] = frame["operating_activity"] + frame["investing_activity"]

    merged = frame.merge(
        fact_profit_loss[["symbol", "year_id", "net_profit"]],
        left_on=[symbol_column, "year_id"],
        right_on=["symbol", "year_id"],
        how="left",
    )
    merged["cash_conversion_ratio"] = (
        merged["operating_activity"] / merged["net_profit"].replace(0, pd.NA)
    ).fillna(0)

    return pd.DataFrame(
        {
            "symbol": merged[symbol_column].astype(str).str.strip(),
            "year_id": merged["year_id"],
            "operating_activity": merged["operating_activity"],
            "investing_activity": merged["investing_activity"],
            "financing_activity": merged["financing_activity"],
            "net_cash_flow": merged["net_cash_flow"],
            "free_cash_flow": merged["free_cash_flow"].round(4),
            "cash_conversion_ratio": merged["cash_conversion_ratio"].round(4),
        }
    )


def build_fact_analysis(raw_analysis: pd.DataFrame) -> pd.DataFrame:
    if raw_analysis.empty:
        return pd.DataFrame(columns=["symbol", "period_label", "compounded_sales_growth_pct", "compounded_profit_growth_pct", "stock_price_cagr_pct", "roe_pct"])

    symbol_column = _symbol_column_name(raw_analysis) or "company_id"
    period_column = "period" if "period" in raw_analysis.columns else "period_label" if "period_label" in raw_analysis.columns else None
    if period_column is None:
        raise ValueError("Analysis table must include a period or period_label column.")

    frame = raw_analysis.copy()
    return pd.DataFrame(
        {
            "symbol": frame[symbol_column].astype(str).str.strip(),
            "period_label": frame[period_column].astype(str).str.strip(),
            "compounded_sales_growth_pct": _series(frame, "compounded_sales_growth_pct", "sales_growth_pct"),
            "compounded_profit_growth_pct": _series(frame, "compounded_profit_growth_pct", "profit_growth_pct"),
            "stock_price_cagr_pct": _series(frame, "stock_price_cagr_pct", "stock_cagr_pct"),
            "roe_pct": _series(frame, "roe_pct"),
        }
    )


def build_fact_pros_cons(raw_pros_cons: pd.DataFrame) -> pd.DataFrame:
    if raw_pros_cons.empty:
        return pd.DataFrame(columns=["symbol", "is_pro", "category", "text", "source", "confidence", "generated_at"])
    symbol_column = _symbol_column_name(raw_pros_cons) or "company_id"
    rows = []
    for _, record in raw_pros_cons.iterrows():
        symbol = str(record[symbol_column]).strip()
        if pd.notna(record.get("pros")) and str(record.get("pros")).strip():
            rows.append({"symbol": symbol, "is_pro": True, "category": "General", "text": str(record["pros"]).strip(), "source": "MANUAL", "confidence": "", "generated_at": ""})
        if pd.notna(record.get("cons")) and str(record.get("cons")).strip():
            rows.append({"symbol": symbol, "is_pro": False, "category": "General", "text": str(record["cons"]).strip(), "source": "MANUAL", "confidence": "", "generated_at": ""})
    return pd.DataFrame(rows)


def build_sector_mapping(dim_company: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "symbol": dim_company["symbol"],
            "company_name": dim_company["company_name"],
            "sector": dim_company["sector"],
        }
    )


def write_frame(path: Path, frame: pd.DataFrame) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frame.to_csv(path, index=False)


def run_pipeline(input_dir: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    raw_companies = load_csv(input_dir / "companies.csv")
    raw_profit = load_csv(input_dir / "profitandloss.csv")
    raw_balance = load_csv(input_dir / "balancesheet.csv")
    raw_cash = load_csv(input_dir / "cashflow.csv")
    raw_analysis = load_csv(input_dir / "analysis.csv")
    raw_pros_cons = load_csv(input_dir / "prosandcons.csv")

    dim_company = build_dim_company(raw_companies)
    dim_sector = build_dim_sector(dim_company)
    dim_year = build_dim_year(raw_profit, raw_balance, raw_cash)
    dim_health_label = pd.DataFrame(HEALTH_LABELS)
    fact_profit_loss = build_fact_profit_loss(raw_profit, dim_year)
    fact_balance_sheet = build_fact_balance_sheet(raw_balance, dim_year)
    fact_cash_flow = build_fact_cash_flow(raw_cash, dim_year, fact_profit_loss)
    fact_analysis = build_fact_analysis(raw_analysis)
    fact_pros_cons = build_fact_pros_cons(raw_pros_cons)
    fact_ml_scores = pd.DataFrame(
        columns=[
            "symbol",
            "computed_at",
            "overall_score",
            "profitability_score",
            "growth_score",
            "leverage_score",
            "cashflow_score",
            "dividend_score",
            "trend_score",
            "health_label",
        ]
    )
    sector_mapping = build_sector_mapping(dim_company)

    write_frame(output_dir / "dim_company.csv", dim_company)
    write_frame(output_dir / "dim_sector.csv", dim_sector)
    write_frame(output_dir / "dim_year.csv", dim_year)
    write_frame(output_dir / "dim_health_label.csv", dim_health_label)
    write_frame(output_dir / "fact_profit_loss.csv", fact_profit_loss)
    write_frame(output_dir / "fact_balance_sheet.csv", fact_balance_sheet)
    write_frame(output_dir / "fact_cash_flow.csv", fact_cash_flow)
    write_frame(output_dir / "fact_analysis.csv", fact_analysis)
    write_frame(output_dir / "fact_pros_cons.csv", fact_pros_cons)
    write_frame(output_dir / "fact_ml_scores.csv", fact_ml_scores)
    write_frame(input_dir.parent / "sector_mapping.csv", sector_mapping)


def main() -> None:
    parser = argparse.ArgumentParser(description="Clean and transform extracted CSVs.")
    parser.add_argument("--input-dir", type=Path, default=Path("data/raw"))
    parser.add_argument("--output-dir", type=Path, default=Path("data/clean"))
    args = parser.parse_args()

    run_pipeline(args.input_dir, args.output_dir)
    print(f"clean outputs written to {args.output_dir}")


if __name__ == "__main__":
    main()
