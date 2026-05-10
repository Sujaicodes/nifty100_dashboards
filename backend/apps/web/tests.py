from pathlib import Path

from django.test import TestCase


class FrontendSourceTests(TestCase):
    def test_homepage_uses_shared_frontend_source(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Read 100 companies like a portfolio manager.")

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
