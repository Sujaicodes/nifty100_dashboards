from pathlib import Path

from django.test import TestCase


class FrontendSourceTests(TestCase):
    def test_homepage_uses_shared_frontend_source(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Understand big Indian companies without reading 20 reports first.")

    def test_company_detail_route_uses_shared_frontend_source(self):
        response = self.client.get("/companies/TCS/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Company Detail")
        self.assertContains(response, 'href="/styles.css"')
        self.assertContains(response, 'src="/app.js"')

    def test_dashboard_route_uses_shared_frontend_source(self):
        response = self.client.get("/dashboards/debt/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Dashboard Detail")

    def test_new_top_level_routes_use_shared_frontend_source(self):
        companies = self.client.get("/companies/")
        reports = self.client.get("/reports/")
        about = self.client.get("/about/")
        dashboards = self.client.get("/dashboards/")

        self.assertEqual(companies.status_code, 200)
        self.assertEqual(reports.status_code, 200)
        self.assertEqual(about.status_code, 200)
        self.assertEqual(dashboards.status_code, 200)
        self.assertContains(companies, "Companies")
        self.assertContains(reports, "Annual reports in one place")
        self.assertContains(about, "Why this platform should feel trustworthy to a beginner")
        self.assertContains(dashboards, "Dashboard Directory")

    def test_root_level_frontend_assets_are_served(self):
        css_response = self.client.get("/styles.css")
        js_response = self.client.get("/app.js")
        css_content = b"".join(css_response.streaming_content)
        js_content = b"".join(js_response.streaming_content)

        self.assertEqual(css_response.status_code, 200)
        self.assertEqual(js_response.status_code, 200)
        self.assertIn(b"--background", css_content)
        self.assertIn(b"async function init()", js_content)

    def test_frontend_html_file_exists_as_single_shared_entry(self):
        frontend_entry = Path(__file__).resolve().parents[3] / "frontend" / "index.html"
        self.assertTrue(frontend_entry.exists())
