from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

from django.core.management import call_command
from django.test import TestCase

from apps.warehouse.excel_reader import normalize_header, read_first_sheet
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
from apps.warehouse.document_import import seed_documents_from_source_if_empty
from apps.warehouse.management.commands.import_excel_workbooks import Command as ImportExcelCommand


def write_xlsx(
    path: Path,
    headers: list[str],
    rows: list[list[object]],
    title: str | None = None,
    relationship_target: str = "worksheets/sheet1.xml",
) -> None:
    def cell_reference(column_index: int, row_index: int) -> str:
        column = ""
        index = column_index + 1
        while index:
            index, remainder = divmod(index - 1, 26)
            column = chr(65 + remainder) + column
        return f"{column}{row_index}"

    def cell_xml(column_index: int, row_index: int, value: object) -> str:
        escaped = str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        return (
            f'<c r="{cell_reference(column_index, row_index)}" t="inlineStr">'
            f"<is><t>{escaped}</t></is></c>"
        )

    sheet_rows = [[title], headers, *rows] if title else [headers, *rows]
    sheet_xml = "".join(
        f'<row r="{row_index}">'
        + "".join(cell_xml(column_index, row_index, value) for column_index, value in enumerate(row))
        + "</row>"
        for row_index, row in enumerate(sheet_rows, start=1)
    )

    with ZipFile(path, "w") as workbook:
        workbook.writestr(
            "[Content_Types].xml",
            """<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>""",
        )
        workbook.writestr(
            "_rels/.rels",
            """<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>""",
        )
        workbook.writestr(
            "xl/workbook.xml",
            """<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets>
</workbook>""",
        )
        workbook.writestr(
            "xl/_rels/workbook.xml.rels",
            f"""<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="{relationship_target}"/>
</Relationships>""",
        )
        workbook.writestr(
            "xl/worksheets/sheet1.xml",
            f"""<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetData>{sheet_xml}</sheetData>
</worksheet>""",
        )


class ExcelReaderTests(TestCase):
    def test_read_first_sheet_normalizes_headers_and_rows(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / "companies.xlsx"
            write_xlsx(path, ["Company ID", "Company Name", "OPM %"], [["TCS", "Tata Consultancy", "24.5"]])

            records = read_first_sheet(path)

        self.assertEqual(records, [{"company_id": "TCS", "company_name": "Tata Consultancy", "opm_pct": "24.5"}])
        self.assertEqual(normalize_header("Dividend Payout %"), "dividend_payout_pct")

    def test_read_first_sheet_skips_title_row_and_resolves_absolute_xl_relationship(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / "profitandloss.xlsx"
            write_xlsx(
                path,
                ["Company ID", "Year", "Sales"],
                [["TCS", "Mar-24", "1000"]],
                title="MKT Fintech - Nifty 100 | profitandloss | 1 record",
                relationship_target="/xl/worksheets/sheet1.xml",
            )

            records = read_first_sheet(path)

        self.assertEqual(records, [{"company_id": "TCS", "year": "Mar-24", "sales": "1000"}])


class ImportExcelWorkbooksCommandTests(TestCase):
    def test_health_label_lookup_accepts_fractional_scores_between_integer_bands(self):
        HealthLabel.objects.create(label_name="GOOD", min_score=70, max_score=84, color_hex="#1040c0")
        HealthLabel.objects.create(label_name="EXCELLENT", min_score=85, max_score=100, color_hex="#1d9a63")

        label = ImportExcelCommand().health_label_for_score(84.5)

        self.assertEqual(label.label_name, "GOOD")

    def test_imports_excel_workbooks_into_star_schema_and_keeps_multiple_insights(self):
        with TemporaryDirectory() as directory:
            source_dir = Path(directory)
            write_xlsx(source_dir / "companies.xlsx", ["id", "company_name", "sector"], [["TCS", "Tata Consultancy", "IT"]])
            write_xlsx(
                source_dir / "profitandloss.xlsx",
                [
                    "company_id",
                    "year",
                    "sales",
                    "expenses",
                    "operating_profit",
                    "opm_percentage",
                    "interest",
                    "tax_percentage",
                    "net_profit",
                    "dividend_payout",
                ],
                [
                    ["TCS", "Mar-24", "1000", "700", "200", "20", "10", "25", "180", "30"],
                    ["WIPRO", "Mar-24", "500", "420", "80", "16", "4", "22", "60", "10"],
                ],
            )
            write_xlsx(
                source_dir / "balancesheet.xlsx",
                ["company_id", "year", "equity_capital", "reserves", "borrowings", "total_assets"],
                [["TCS", "Mar 2024", "100", "500", "300", "1200"]],
            )
            write_xlsx(
                source_dir / "cashflow.xlsx",
                ["company_id", "year", "operating_activity", "investing_activity", "financing_activity"],
                [["TCS", "Mar 2024", "250", "-100", "-20"]],
            )
            write_xlsx(
                source_dir / "analysis.xlsx",
                ["company_id", "compounded_sales_growth", "compounded_profit_growth", "stock_price_cagr", "roe"],
                [["TCS", "3 Years: 11%", "3 Years: 13%", "3 Years: 9%", "3 Years: 22%"]],
            )
            write_xlsx(
                source_dir / "prosandcons.xlsx",
                ["company_id", "pros", "cons"],
                [["TCS", "Strong cash generation", ""], ["TCS", "", "Client concentration risk"]],
            )
            write_xlsx(
                source_dir / "documents.xlsx",
                ["company_id", "year", "annual_report"],
                [["TCS", "Mar 2024", "https://example.com/tcs-annual-report.pdf"]],
            )

            call_command("import_excel_workbooks", source_dir=str(source_dir))

        company = Company.objects.get(symbol="TCS")
        year = YearDimension.objects.get(year_label="Mar 2024")
        profit_loss = ProfitLossFact.objects.get(symbol=company, year=year)
        balance_sheet = BalanceSheetFact.objects.get(symbol=company, year=year)
        cash_flow = CashFlowFact.objects.get(symbol=company, year=year)
        analysis = AnalysisFact.objects.get(symbol=company, period_label="3Y")

        self.assertEqual(company.company_name, "Tata Consultancy")
        self.assertTrue(Company.objects.filter(symbol="WIPRO", company_name="WIPRO").exists())
        self.assertEqual(profit_loss.opm_pct, 20)
        self.assertEqual(profit_loss.tax_pct, 25)
        self.assertEqual(profit_loss.dividend_payout_pct, 30)
        self.assertEqual(profit_loss.net_profit_margin_pct, 18)
        self.assertEqual(profit_loss.interest_coverage, 20)
        self.assertEqual(balance_sheet.debt_to_equity, 0.5)
        self.assertEqual(cash_flow.free_cash_flow, 150)
        self.assertEqual(analysis.compounded_sales_growth_pct, 11)
        self.assertEqual(analysis.compounded_profit_growth_pct, 13)
        self.assertEqual(analysis.stock_price_cagr_pct, 9)
        self.assertEqual(analysis.roe_pct, 22)
        self.assertEqual(ProsConsFact.objects.filter(symbol=company).count(), 2)
        self.assertTrue(DocumentFact.objects.filter(symbol=company, year=year, annual_report__contains="tcs-annual-report").exists())
        self.assertGreater(MlScoreFact.objects.get(symbol=company).overall_score, 0)

    def test_seed_documents_from_source_repairs_empty_document_table(self):
        with TemporaryDirectory() as directory:
            source_dir = Path(directory)
            write_xlsx(
                source_dir / "documents.xlsx",
                ["company_id", "year", "annual_report"],
                [["TCS", "2024", "https://example.com/tcs-2024.pdf"]],
            )
            sector = Sector.objects.create(sector_code="IT", sector_name="IT")
            company = Company.objects.create(symbol="TCS", company_name="Tata Consultancy", sector=sector)

            imported = seed_documents_from_source_if_empty(source_dir=source_dir)

        self.assertEqual(imported, 1)
        self.assertTrue(DocumentFact.objects.filter(symbol=company, annual_report="https://example.com/tcs-2024.pdf").exists())
