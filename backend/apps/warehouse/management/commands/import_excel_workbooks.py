from __future__ import annotations

from decimal import Decimal, InvalidOperation
from pathlib import Path
import re

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import DatabaseError
from django.utils import timezone

from apps.api.services import list_companies
from apps.warehouse.excel_reader import read_first_sheet
from apps.warehouse.models import (
    AnalysisFact,
    BalanceSheetFact,
    CashFlowFact,
    Company,
    DocumentFact,
    HealthLabel,
    MlScoreFact,
    ProfitLossFact,
    ProsConsFact,
    Sector,
    YearDimension,
)


WORKBOOKS = {
    "companies": "companies.xlsx",
    "profitandloss": "profitandloss.xlsx",
    "balancesheet": "balancesheet.xlsx",
    "cashflow": "cashflow.xlsx",
    "analysis": "analysis.xlsx",
    "prosandcons": "prosandcons.xlsx",
    "documents": "documents.xlsx",
}

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
    "BAJAJ_AUTO": "Auto",
    "BAJAJ-AUTO": "Auto",
    "AGTL": "Energy",
    "ULTRACEMCO": "Cement",
    "UNIONBANK": "Banking",
    "UNITDSPR": "Consumer Goods",
    "VBL": "Consumer Goods",
    "VEDL": "Energy",
    "WIPRO": "IT",
    "ZOMATO": "Consumer Goods",
    "ZYDUSLIFE": "Healthcare",
}

HEALTH_LABELS = [
    ("EXCELLENT", 85, 100, "#1d9a63"),
    ("GOOD", 70, 84, "#1040c0"),
    ("AVERAGE", 50, 69, "#f0c020"),
    ("WEAK", 35, 49, "#d02020"),
    ("POOR", 0, 34, "#121212"),
]


def value(record: dict[str, str], *keys: str, default: str = "") -> str:
    normalized = {key.lower(): item for key, item in record.items()}
    for key in keys:
        item = normalized.get(key.lower())
        if item not in (None, ""):
            return item
    return default


def decimal_value(record: dict[str, str], *keys: str) -> Decimal | None:
    raw = value(record, *keys)
    if raw in ("", "NULL", "Null", "null", "-"):
        return None
    cleaned = raw.replace(",", "").replace("%", "").strip()
    try:
        return Decimal(cleaned)
    except InvalidOperation:
        return None


def text_value(record: dict[str, str], *keys: str) -> str:
    return value(record, *keys).strip()


def symbol_value(record: dict[str, str], *, include_id: bool = False) -> str:
    keys = ("company_id", "symbol", "ticker", "code", "company", "id") if include_id else ("company_id", "symbol", "ticker", "code", "company")
    return text_value(record, *keys).upper().replace(" ", "")


def parse_period_metric(raw: str) -> tuple[str | None, Decimal | None]:
    normalized = " ".join(raw.strip().split())
    if not normalized:
        return None, None

    period = None
    if re.search(r"\b10\s*years?\b", normalized, flags=re.IGNORECASE):
        period = "10Y"
    elif re.search(r"\b5\s*years?\b", normalized, flags=re.IGNORECASE):
        period = "5Y"
    elif re.search(r"\b3\s*years?\b", normalized, flags=re.IGNORECASE):
        period = "3Y"
    elif "TTM" in normalized.upper():
        period = "TTM"

    value_match = re.search(r"(-?\d+(?:\.\d+)?)\s*%", normalized)
    if not value_match:
        value_match = re.search(r"(-?\d+(?:\.\d+)?)", normalized)
    if not value_match:
        return period, None

    return period, Decimal(value_match.group(1))


def normalize_year(raw: str) -> tuple[str, int | None, int, str, bool, bool]:
    label = raw.strip()
    if label.upper() == "TTM":
        return "TTM", None, 9999, "", True, False

    normalized = label.replace("-", " ")
    parts = normalized.split()
    if len(parts) != 2:
        return label, None, 0, "", False, False

    month = parts[0].title()
    year_part = parts[1]
    fiscal_year = int(f"20{year_part}") if len(year_part) == 2 and year_part.isdigit() else int(year_part)
    quarter = {"Jun": "Q1", "Sep": "Q2", "Dec": "Q3", "Mar": "Q4"}.get(month, "")
    return f"{month} {fiscal_year}", fiscal_year, fiscal_year, quarter, False, month in {"Sep", "Dec"}


def year_dimension(raw: str) -> YearDimension:
    label, fiscal_year, sort_order, quarter, is_ttm, is_half_year = normalize_year(raw)
    return YearDimension.objects.update_or_create(
        year_label=label,
        defaults={
            "fiscal_year": fiscal_year or 0,
            "quarter": quarter,
            "is_ttm": is_ttm,
            "is_half_year": is_half_year,
            "sort_order": sort_order,
        },
    )[0]


class Command(BaseCommand):
    help = "Import the seven Excel workbook exports directly into the warehouse."

    def add_arguments(self, parser):
        parser.add_argument("--source-dir", type=str, default=str(settings.REPO_DIR / "data" / "source"))

    def handle(self, *args, **options):
        source_dir = Path(options["source_dir"]).resolve()
        if not source_dir.exists():
            raise CommandError(f"Source directory does not exist: {source_dir}")

        paths = self.resolve_workbook_paths(source_dir)
        records = {name: read_first_sheet(path) if path else [] for name, path in paths.items()}

        try:
            self.seed_health_labels()
            self.import_companies(records["companies"])
            self.ensure_missing_companies(records)
            self.import_profit_loss(records["profitandloss"])
            self.import_balance_sheet(records["balancesheet"])
            self.import_cash_flow(records["cashflow"])
            self.import_analysis(records["analysis"])
            self.import_pros_cons(records["prosandcons"])
            self.import_documents(records["documents"])
            self.compute_health_scores()
        except DatabaseError as exc:
            raise CommandError(
                "Database import failed. Run migrations first with: docker compose exec web python manage.py migrate"
            ) from exc

        self.stdout.write(self.style.SUCCESS("Excel workbook import completed."))

    def resolve_workbook_paths(self, source_dir: Path) -> dict[str, Path | None]:
        paths: dict[str, Path | None] = {}
        for name, filename in WORKBOOKS.items():
            candidates = [
                source_dir / filename,
                source_dir / filename.replace(".xlsx", ".xls"),
                source_dir / f"{name}.xlsx",
                source_dir / f"{name}.xls",
            ]
            paths[name] = next((candidate for candidate in candidates if candidate.exists()), None)
            if name != "documents" and paths[name] is None:
                self.stdout.write(self.style.WARNING(f"Missing workbook: {filename}"))
        return paths

    def seed_health_labels(self) -> None:
        for label, min_score, max_score, color in HEALTH_LABELS:
            HealthLabel.objects.update_or_create(
                label_name=label,
                defaults={"min_score": min_score, "max_score": max_score, "color_hex": color},
            )

    def import_companies(self, records: list[dict[str, str]]) -> None:
        for record in records:
            symbol = symbol_value(record, include_id=True)
            if not symbol:
                continue
            sector_name = text_value(record, "sector") or SECTOR_LOOKUP.get(symbol, "Unclassified")
            sector, _ = Sector.objects.update_or_create(
                sector_name=sector_name,
                defaults={"sector_code": sector_name.upper().replace(" ", "_")},
            )
            Company.objects.update_or_create(
                symbol=symbol,
                defaults={
                    "company_name": text_value(record, "company_name", "name") or symbol,
                    "sector": sector,
                    "company_logo": text_value(record, "company_logo", "logo"),
                    "website": text_value(record, "website"),
                    "nse_url": text_value(record, "nse_url", "nse_link", "nse_profile"),
                    "bse_url": text_value(record, "bse_url", "bse_link", "bse_profile"),
                    "face_value": decimal_value(record, "face_value"),
                    "book_value": decimal_value(record, "book_value"),
                    "about_company": text_value(record, "about_company", "about", "description"),
                },
            )

    def ensure_missing_companies(self, records: dict[str, list[dict[str, str]]]) -> None:
        symbols = sorted(
            {
                symbol_value(record)
                for workbook_name, workbook_records in records.items()
                if workbook_name != "companies"
                for record in workbook_records
                if symbol_value(record)
            }
        )
        for symbol in symbols:
            if Company.objects.filter(symbol=symbol).exists():
                continue
            sector_name = SECTOR_LOOKUP.get(symbol, "Unclassified")
            sector, _ = Sector.objects.update_or_create(
                sector_name=sector_name,
                defaults={"sector_code": sector_name.upper().replace(" ", "_")},
            )
            Company.objects.create(symbol=symbol, company_name=symbol, sector=sector)

    def company(self, symbol: str) -> Company | None:
        return Company.objects.filter(symbol=symbol).first()

    def import_profit_loss(self, records: list[dict[str, str]]) -> None:
        for record in records:
            company = self.company(symbol_value(record))
            raw_year = text_value(record, "year", "period", "year_label")
            if not company or not raw_year:
                continue
            year = year_dimension(raw_year)
            sales = decimal_value(record, "sales", "revenue")
            expenses = decimal_value(record, "expenses")
            operating_profit = decimal_value(record, "operating_profit", "op")
            interest = decimal_value(record, "interest")
            net_profit = decimal_value(record, "net_profit", "profit")
            ProfitLossFact.objects.update_or_create(
                symbol=company,
                year=year,
                defaults={
                    "sales": sales,
                    "expenses": expenses,
                    "operating_profit": operating_profit,
                    "opm_pct": decimal_value(record, "opm_pct", "opm", "opm_percentage"),
                    "other_income": decimal_value(record, "other_income"),
                    "interest": interest,
                    "depreciation": decimal_value(record, "depreciation"),
                    "profit_before_tax": decimal_value(record, "profit_before_tax", "pbt"),
                    "tax_pct": decimal_value(record, "tax_pct", "tax", "tax_percentage"),
                    "net_profit": net_profit,
                    "eps": decimal_value(record, "eps"),
                    "dividend_payout_pct": decimal_value(record, "dividend_payout_pct", "dividend", "dividend_payout"),
                    "net_profit_margin_pct": self.percent(net_profit, sales),
                    "expense_ratio_pct": self.percent(expenses, sales),
                    "interest_coverage": self.ratio(operating_profit, interest),
                },
            )

    def import_balance_sheet(self, records: list[dict[str, str]]) -> None:
        for record in records:
            company = self.company(symbol_value(record))
            raw_year = text_value(record, "year", "period", "year_label")
            if not company or not raw_year:
                continue
            year = year_dimension(raw_year)
            equity = decimal_value(record, "equity_capital")
            reserves = decimal_value(record, "reserves")
            borrowings = decimal_value(record, "borrowings")
            total_assets = decimal_value(record, "total_assets")
            capital_base = (equity or Decimal("0")) + (reserves or Decimal("0"))
            BalanceSheetFact.objects.update_or_create(
                symbol=company,
                year=year,
                defaults={
                    "equity_capital": equity,
                    "reserves": reserves,
                    "borrowings": borrowings,
                    "other_liabilities": decimal_value(record, "other_liabilities"),
                    "total_liabilities": decimal_value(record, "total_liabilities"),
                    "fixed_assets": decimal_value(record, "fixed_assets"),
                    "cwip": decimal_value(record, "cwip"),
                    "investments": decimal_value(record, "investments"),
                    "other_assets": decimal_value(record, "other_assets", "other_asset"),
                    "total_assets": total_assets,
                    "debt_to_equity": self.ratio(borrowings, capital_base),
                    "equity_ratio": self.ratio(capital_base, total_assets),
                },
            )

    def import_cash_flow(self, records: list[dict[str, str]]) -> None:
        for record in records:
            company = self.company(symbol_value(record))
            raw_year = text_value(record, "year", "period", "year_label")
            if not company or not raw_year:
                continue
            year = year_dimension(raw_year)
            operating = decimal_value(record, "operating_activity", "cash_from_operating_activity")
            investing = decimal_value(record, "investing_activity", "cash_from_investing_activity")
            financing = decimal_value(record, "financing_activity", "cash_from_financing_activity")
            profit = ProfitLossFact.objects.filter(symbol=company, year=year).first()
            CashFlowFact.objects.update_or_create(
                symbol=company,
                year=year,
                defaults={
                    "operating_activity": operating,
                    "investing_activity": investing,
                    "financing_activity": financing,
                    "net_cash_flow": decimal_value(record, "net_cash_flow"),
                    "free_cash_flow": (operating or Decimal("0")) + (investing or Decimal("0")),
                    "cash_conversion_ratio": self.ratio(operating, profit.net_profit if profit else None),
                },
            )

    def import_analysis(self, records: list[dict[str, str]]) -> None:
        for record in records:
            company = self.company(symbol_value(record))
            if not company:
                continue
            sales_period, sales_growth = parse_period_metric(text_value(record, "compounded_sales_growth", "compounded_sales_growth_pct", "sales_growth_pct"))
            profit_period, profit_growth = parse_period_metric(
                text_value(record, "compounded_profit_growth", "compounded_profit_growth_pct", "profit_growth_pct")
            )
            stock_period, stock_cagr = parse_period_metric(text_value(record, "stock_price_cagr", "stock_price_cagr_pct", "stock_cagr_pct"))
            roe_period, roe = parse_period_metric(text_value(record, "roe", "roe_pct"))
            period = text_value(record, "period", "period_label") or sales_period or profit_period or stock_period or roe_period or "3Y"
            AnalysisFact.objects.update_or_create(
                symbol=company,
                period_label=period,
                defaults={
                    "compounded_sales_growth_pct": sales_growth,
                    "compounded_profit_growth_pct": profit_growth,
                    "stock_price_cagr_pct": stock_cagr,
                    "roe_pct": roe,
                },
            )

    def import_pros_cons(self, records: list[dict[str, str]]) -> None:
        symbols = sorted({symbol_value(record) for record in records if symbol_value(record)})
        ProsConsFact.objects.filter(symbol_id__in=symbols).delete()

        for record in records:
            company = self.company(symbol_value(record))
            if not company:
                continue
            pro = text_value(record, "pros", "pro")
            con = text_value(record, "cons", "con")
            if pro:
                ProsConsFact.objects.create(symbol=company, is_pro=True, category="General", text=pro, source="MANUAL")
            if con:
                ProsConsFact.objects.create(symbol=company, is_pro=False, category="General", text=con, source="MANUAL")

    def import_documents(self, records: list[dict[str, str]]) -> None:
        for record in records:
            company = self.company(symbol_value(record))
            raw_year = text_value(record, "year", "period", "year_label")
            annual_report = text_value(record, "annual_report", "document_url", "url", "link")
            if not company or not raw_year or not annual_report:
                continue
            DocumentFact.objects.update_or_create(
                symbol=company,
                year=year_dimension(raw_year),
                annual_report=annual_report,
                defaults={"document_type": "ANNUAL_REPORT"},
            )

    def compute_health_scores(self) -> None:
        computed_at = timezone.now()
        for company_payload in list_companies():
            company = Company.objects.get(symbol=company_payload["symbol"])
            score_breakdown = company_payload.get("score_breakdown", {})
            profitability_score = score_breakdown.get("profitability", {}).get("score", 0.0)
            growth_score = score_breakdown.get("growth", {}).get("score", 0.0)
            leverage_score = score_breakdown.get("leverage", {}).get("score", 0.0)
            cashflow_score = score_breakdown.get("cashflow", {}).get("score", 0.0)
            dividend_score = score_breakdown.get("dividend", {}).get("score", 0.0)
            trend_score = score_breakdown.get("trend", {}).get("score", 0.0)
            overall_score = company_payload.get("health_score", 0.0)
            label = self.health_label_for_score(overall_score)

            MlScoreFact.objects.create(
                symbol=company,
                computed_at=computed_at,
                overall_score=self.decimal_score(overall_score),
                profitability_score=self.decimal_score(profitability_score),
                growth_score=self.decimal_score(growth_score),
                leverage_score=self.decimal_score(leverage_score),
                cashflow_score=self.decimal_score(cashflow_score),
                dividend_score=self.decimal_score(dividend_score),
                trend_score=self.decimal_score(trend_score),
                health_label=label,
            )

    def percent(self, numerator: Decimal | None, denominator: Decimal | None) -> Decimal | None:
        ratio = self.ratio(numerator, denominator)
        return ratio * Decimal("100") if ratio is not None else None

    def ratio(self, numerator: Decimal | None, denominator: Decimal | None) -> Decimal | None:
        if numerator is None or denominator in (None, Decimal("0")):
            return None
        return numerator / denominator

    def float_value(self, value: Decimal | None) -> float:
        return float(value) if value is not None else 0.0

    def clamp(self, value: float, minimum: float = 0.0, maximum: float = 100.0) -> float:
        return max(minimum, min(maximum, value))

    def leverage_score(self, debt_to_equity: Decimal | None) -> float:
        value = self.float_value(debt_to_equity)
        if value <= 0.1:
            return 100.0
        if value <= 1:
            return 85.0
        if value <= 2:
            return 65.0
        if value <= 4:
            return 40.0
        return 20.0

    def weighted_score(self, scores: list[tuple[float, float]]) -> float:
        return sum(score * weight for score, weight in scores)

    def decimal_score(self, value: float) -> Decimal:
        return Decimal(str(round(value, 2)))

    def health_label_for_score(self, score: float) -> HealthLabel:
        bounded_score = self.clamp(score)
        return HealthLabel.objects.filter(min_score__lte=bounded_score).order_by("-min_score").first()
