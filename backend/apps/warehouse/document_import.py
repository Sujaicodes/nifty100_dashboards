from __future__ import annotations

from pathlib import Path

from django.conf import settings
from django.db import DatabaseError, transaction

from apps.warehouse.excel_reader import read_first_sheet
from apps.warehouse.models import Company, DocumentFact, YearDimension


def _text_value(record: dict[str, str], *keys: str) -> str:
    normalized = {key.lower(): item for key, item in record.items()}
    for key in keys:
        item = normalized.get(key.lower())
        if item not in (None, ""):
            return item.strip()
    return ""


def _symbol_value(record: dict[str, str]) -> str:
    return _text_value(record, "company_id", "symbol", "ticker", "code", "company").upper().replace(" ", "")


def _year_dimension(raw: str) -> YearDimension:
    label = raw.strip()
    fiscal_year = int(label) if label.isdigit() else 0
    return YearDimension.objects.update_or_create(
        year_label=label,
        defaults={
            "fiscal_year": fiscal_year,
            "quarter": "",
            "is_ttm": label.upper() == "TTM",
            "is_half_year": False,
            "sort_order": fiscal_year,
        },
    )[0]


def seed_documents_from_source_if_empty(source_dir: Path | None = None) -> int:
    try:
        if DocumentFact.objects.exists():
            return 0
    except DatabaseError:
        return 0

    source = source_dir or settings.REPO_DIR / "data" / "source"
    workbook = Path(source) / "documents.xlsx"
    if not workbook.exists():
        return 0

    records = read_first_sheet(workbook)
    companies = {company.symbol: company for company in Company.objects.all()}
    imported = 0

    with transaction.atomic():
        if DocumentFact.objects.exists():
            return 0

        for record in records:
            company = companies.get(_symbol_value(record))
            raw_year = _text_value(record, "year", "period", "year_label")
            annual_report = _text_value(record, "annual_report", "document_url", "url", "link")
            if not company or not raw_year or not annual_report:
                continue
            DocumentFact.objects.update_or_create(
                symbol=company,
                year=_year_dimension(raw_year),
                annual_report=annual_report,
                defaults={"document_type": "ANNUAL_REPORT"},
            )
            imported += 1

    return imported
