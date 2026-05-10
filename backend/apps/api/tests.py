from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.warehouse.models import Company, DocumentFact, Sector, YearDimension


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
        company = Company.objects.create(symbol="DOCS", company_name="Docs Ltd", sector=sector)
        year = YearDimension.objects.create(year_label="Mar 2024", fiscal_year=2024, quarter="Q4", sort_order=2024)
        DocumentFact.objects.create(symbol=company, year=year, annual_report="https://example.com/report.pdf")

        response = self.client.get(reverse("company-detail", kwargs={"symbol": "DOCS"}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["documents"][0]["annual_report"], "https://example.com/report.pdf")
        self.assertEqual(response.data["documents"][0]["year"], "Mar 2024")
