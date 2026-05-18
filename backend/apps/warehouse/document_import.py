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


def _year_defaults(label: str) -> dict:
    fiscal_year = int(label) if label.isdigit() else 0
    return {
        "fiscal_year": fiscal_year,
        "quarter": "",
        "is_ttm": label.upper() == "TTM",
        "is_half_year": False,
        "sort_order": fiscal_year,
    }


def _year_dimension(raw: str) -> YearDimension:
    label = raw.strip()
    return YearDimension.objects.update_or_create(
        year_label=label,
        defaults=_year_defaults(label),
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
    company_ids = set(Company.objects.values_list("symbol", flat=True))
    rows = []
    year_labels = set()
    seen = set()

    for record in records:
        symbol = _symbol_value(record)
        raw_year = _text_value(record, "year", "period", "year_label")
        annual_report = _text_value(record, "annual_report", "document_url", "url", "link")
        if not symbol or symbol not in company_ids or not raw_year or not annual_report:
            continue
        year_label = raw_year.strip()
        identity = (symbol, year_label, annual_report)
        if identity in seen:
            continue
        seen.add(identity)
        year_labels.add(year_label)
        rows.append(identity)

    with transaction.atomic():
        if DocumentFact.objects.exists():
            return 0

        existing_year_labels = set(YearDimension.objects.filter(year_label__in=year_labels).values_list("year_label", flat=True))
        YearDimension.objects.bulk_create(
            [
                YearDimension(year_label=label, **_year_defaults(label))
                for label in sorted(year_labels - existing_year_labels)
            ],
            ignore_conflicts=True,
        )
        years = {year.year_label: year for year in YearDimension.objects.filter(year_label__in=year_labels)}
        documents = [
            DocumentFact(
                symbol_id=symbol,
                year=years[year_label],
                annual_report=annual_report,
                document_type="ANNUAL_REPORT",
            )
            for symbol, year_label, annual_report in rows
            if year_label in years
        ]
        DocumentFact.objects.bulk_create(documents, ignore_conflicts=True, batch_size=500)

    return len(documents)
