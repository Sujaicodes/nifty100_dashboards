from decimal import Decimal
from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

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


class ApiSmokeTests(APITestCase):
    def test_health_endpoint_returns_ok(self):
        response = self.client.get(reverse("api-health"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "ok")

    def test_bootstrap_endpoint_returns_company_list(self):
        response = self.client.get(reverse("api-bootstrap"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("companies", response.data)
        self.assertGreater(len(response.data["companies"]), 0)

    def test_company_list_prefers_warehouse_records_when_present(self):
        sector = Sector.objects.create(sector_code="IT", sector_name="IT")
        Company.objects.create(symbol="PERSISTED", company_name="Persisted Systems", sector=sector)

        response = self.client.get(reverse("company-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["symbol"], "PERSISTED")
        self.assertEqual(response.data["results"][0]["company_name"], "Persisted Systems")

    def test_company_detail_reads_warehouse_record_when_present(self):
        sector = Sector.objects.create(sector_code="BANK", sector_name="Banking")
        Company.objects.create(symbol="STORED", company_name="Stored Bank", sector=sector)

        response = self.client.get(reverse("company-detail", kwargs={"symbol": "STORED"}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["symbol"], "STORED")
        self.assertEqual(response.data["company_name"], "Stored Bank")

    def test_company_detail_includes_annual_report_documents(self):
        sector = Sector.objects.create(sector_code="IT", sector_name="IT")
        company = Company.objects.create(
            symbol="DOCS",
            company_name="Docs Ltd",
            sector=sector,
            website="https://example.com",
            nse_url="https://nse.example.com/docs",
            bse_url="https://bse.example.com/docs",
            about_company="A sample company profile.",
        )
        year = YearDimension.objects.create(year_label="Mar 2024", fiscal_year=2024, quarter="Q4", sort_order=2024)
        DocumentFact.objects.create(symbol=company, year=year, annual_report="https://example.com/report.pdf")

        response = self.client.get(reverse("company-detail", kwargs={"symbol": "DOCS"}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["website"], "https://example.com")
        self.assertEqual(response.data["nse_url"], "https://nse.example.com/docs")
        self.assertEqual(response.data["bse_url"], "https://bse.example.com/docs")
        self.assertEqual(response.data["about_company"], "A sample company profile.")
        self.assertEqual(response.data["documents"][0]["annual_report"], "https://example.com/report.pdf")
        self.assertEqual(response.data["documents"][0]["year"], "Mar 2024")

    def test_company_list_supports_search_ordering_and_pagination(self):
        sector = Sector.objects.create(sector_code="IT", sector_name="IT")
        Company.objects.create(symbol="AAA", company_name="Alpha Analytics", sector=sector)
        Company.objects.create(symbol="BBB", company_name="Beta Builders", sector=sector)
        Company.objects.create(symbol="CCC", company_name="Gamma Global", sector=sector)

        response = self.client.get(reverse("company-list"), {"search": "a", "ordering": "-company_name", "page_size": 2, "page": 1})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 3)
        self.assertEqual(response.data["page_size"], 2)
        self.assertEqual(len(response.data["results"]), 2)
        self.assertEqual(response.data["results"][0]["company_name"], "Gamma Global")

    def test_dedicated_company_endpoints_return_financial_slices(self):
        sector = Sector.objects.create(sector_code="NBFC", sector_name="NBFC")
        company = Company.objects.create(symbol="SLICE", company_name="Slice Finance", sector=sector)
        prior_year = YearDimension.objects.create(year_label="Mar 2023", fiscal_year=2023, quarter="Q4", sort_order=2023)
        year = YearDimension.objects.create(year_label="Mar 2024", fiscal_year=2024, quarter="Q4", sort_order=2024)
        label = HealthLabel.objects.create(label_name="GOOD", min_score=70, max_score=84, color_hex="#1040c0")

        ProfitLossFact.objects.create(
            symbol=company,
            year=prior_year,
            sales=Decimal("850"),
            operating_profit=Decimal("150"),
            opm_pct=Decimal("17.5"),
            net_profit=Decimal("100"),
            eps=Decimal("12"),
            dividend_payout_pct=Decimal("12"),
            interest_coverage=Decimal("4.2"),
        )
        ProfitLossFact.objects.create(
            symbol=company,
            year=year,
            sales=Decimal("1000"),
            operating_profit=Decimal("200"),
            opm_pct=Decimal("20"),
            net_profit=Decimal("150"),
            eps=Decimal("16"),
            dividend_payout_pct=Decimal("18"),
            interest_coverage=Decimal("5.5"),
        )
        BalanceSheetFact.objects.create(
            symbol=company,
            year=prior_year,
            equity_capital=Decimal("90"),
            reserves=Decimal("350"),
            borrowings=Decimal("170"),
            total_assets=Decimal("760"),
            debt_to_equity=Decimal("0.3860"),
            equity_ratio=Decimal("0.5780"),
        )
        BalanceSheetFact.objects.create(
            symbol=company,
            year=year,
            equity_capital=Decimal("100"),
            reserves=Decimal("400"),
            borrowings=Decimal("150"),
            total_assets=Decimal("800"),
            debt_to_equity=Decimal("0.3000"),
            equity_ratio=Decimal("0.6250"),
        )
        CashFlowFact.objects.create(
            symbol=company,
            year=year,
            operating_activity=Decimal("220"),
            investing_activity=Decimal("-50"),
            financing_activity=Decimal("-20"),
            net_cash_flow=Decimal("150"),
            free_cash_flow=Decimal("170"),
            cash_conversion_ratio=Decimal("1.4667"),
        )
        AnalysisFact.objects.create(
            symbol=company,
            period_label="3Y",
            compounded_sales_growth_pct=Decimal("14.20"),
            compounded_profit_growth_pct=Decimal("17.80"),
            stock_price_cagr_pct=Decimal("12.40"),
            roe_pct=Decimal("19.10"),
        )
        MlScoreFact.objects.create(
            symbol=company,
            computed_at="2026-05-10T12:00:00Z",
            overall_score=Decimal("78.50"),
            profitability_score=Decimal("80.00"),
            growth_score=Decimal("76.00"),
            leverage_score=Decimal("70.00"),
            cashflow_score=Decimal("82.00"),
            dividend_score=Decimal("55.00"),
            trend_score=Decimal("68.00"),
            health_label=label,
        )
        DocumentFact.objects.create(symbol=company, year=year, annual_report="https://example.com/slice-report.pdf")
        ProsConsFact.objects.create(symbol=company, is_pro=True, category="General", text="Strong margin profile")
        ProsConsFact.objects.create(symbol=company, is_pro=False, category="General", text="Funding costs can rise")

        summary_response = self.client.get(reverse("company-financial-summary", kwargs={"symbol": "SLICE"}))
        balance_response = self.client.get(reverse("company-balance-sheet-trend", kwargs={"symbol": "SLICE"}))
        cash_response = self.client.get(reverse("company-cash-flow-trend", kwargs={"symbol": "SLICE"}))
        health_response = self.client.get(reverse("company-health-score", kwargs={"symbol": "SLICE"}))
        documents_response = self.client.get(reverse("company-documents", kwargs={"symbol": "SLICE"}))
        pros_cons_response = self.client.get(reverse("company-pros-cons", kwargs={"symbol": "SLICE"}))
        peer_response = self.client.get(reverse("company-peer-comparison", kwargs={"symbol": "SLICE"}))
        growth_response = self.client.get(reverse("company-growth-analytics", kwargs={"symbol": "SLICE"}))

        self.assertEqual(summary_response.status_code, status.HTTP_200_OK)
        self.assertEqual(summary_response.data["summary"]["revenue"], 1000.0)
        self.assertEqual(balance_response.data["rows"][0]["debt_to_equity"], 0.3)
        self.assertEqual(cash_response.data["rows"][0]["free_cash_flow"], 170.0)
        self.assertIn("score_breakdown", health_response.data["latest"])
        self.assertIn("explanation", health_response.data["latest"]["score_breakdown"]["profitability"])
        self.assertEqual(documents_response.data["documents"][0]["annual_report"], "https://example.com/slice-report.pdf")
        self.assertEqual(pros_cons_response.data["pros"][0], "Strong margin profile")
        self.assertEqual(pros_cons_response.data["cons"][0], "Funding costs can rise")
        self.assertEqual(peer_response.data["selected_company"]["symbol"], "SLICE")
        self.assertAlmostEqual(growth_response.data["latest"]["sales_growth_yoy"], 17.6470588235, places=4)
        self.assertIsNone(growth_response.data["cagr_summary"]["sales_3y"])

    def test_sector_comparison_returns_selected_sectors(self):
        it = Sector.objects.create(sector_code="IT", sector_name="IT")
        banking = Sector.objects.create(sector_code="BANK", sector_name="Banking")
        Company.objects.create(symbol="TECH", company_name="Tech Co", sector=it)
        Company.objects.create(symbol="BANK", company_name="Bank Co", sector=banking)

        response = self.client.get(reverse("sector-comparison"), {"sector": "IT,Banking"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["selected_sectors"], ["IT", "Banking"])
        self.assertIn("summary", response.data)
        self.assertIn("companies", response.data)

    def test_partner_api_key_is_enforced_when_configured(self):
        sector = Sector.objects.create(sector_code="IT", sector_name="IT")
        Company.objects.create(symbol="LOCKED", company_name="Locked Systems", sector=sector)

        with patch.dict("os.environ", {"BLUESTOCK_PARTNER_API_KEY": "secret-key"}):
            denied = self.client.get(reverse("company-list"))
            allowed = self.client.get(reverse("company-list"), HTTP_X_API_KEY="secret-key")

        self.assertEqual(denied.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(allowed.status_code, status.HTTP_200_OK)
