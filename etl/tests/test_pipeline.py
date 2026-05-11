from __future__ import annotations

import importlib.util
import tempfile
import textwrap
import unittest
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[2]


def load_module(relative_path: str, module_name: str):
    module_path = ROOT / relative_path
    spec = importlib.util.spec_from_file_location(module_name, module_path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


extract_module = load_module("etl/01_extract_from_mysql.py", "etl_extract")
transform_module = load_module("etl/02_clean_and_transform.py", "etl_transform")


class ExtractPipelineTests(unittest.TestCase):
    def test_extracts_headers_and_rows_from_mariadb_dump(self):
        sql_dump = textwrap.dedent(
            """
            CREATE TABLE `companies` (
              `company_id` varchar(20) DEFAULT NULL,
              `company_name` varchar(255) DEFAULT NULL,
              `website` varchar(255) DEFAULT NULL
            );
            INSERT INTO `companies` VALUES
            ('TCS','Tata Consultancy Services','https://www.tcs.com'),
            ('INFY','Infosys Ltd\\'s','NULL');
            """
        )

        columns = extract_module.extract_table_columns(sql_dump, "companies")
        blocks = extract_module.extract_table_blocks(sql_dump, "companies")
        rows = [extract_module.parse_row(row_text) for row_text in extract_module.split_rows(blocks[0])]

        self.assertEqual(columns, ["company_id", "company_name", "website"])
        self.assertEqual(rows[0][0], "TCS")
        self.assertEqual(rows[1][1], "Infosys Ltd's")
        self.assertEqual(rows[1][2], "")


class TransformPipelineTests(unittest.TestCase):
    def test_normalizes_year_variants(self):
        self.assertEqual(transform_module.normalize_year_label("Mar-24"), ("Mar 2024", 2024, 2024, False, False))
        self.assertEqual(transform_module.normalize_year_label("TTM"), ("TTM", None, 9999, True, False))
        self.assertEqual(transform_module.normalize_year_label("Sep 2024"), ("Sep 2024", 2024, 2024, False, True))

    def test_builds_clean_dimensions_and_facts_from_minimal_raw_data(self):
        with tempfile.TemporaryDirectory() as temp_dir:
          temp_path = Path(temp_dir)
          raw_dir = temp_path / "raw"
          clean_dir = temp_path / "clean"
          raw_dir.mkdir()

          pd.DataFrame(
              [
                  {
                      "company_id": "TCS",
                      "company_name": "Tata Consultancy Services \r\n",
                      "website": "https://www.tcs.com",
                      "book_value": 220,
                      "face_value": 1,
                  }
              ]
          ).to_csv(raw_dir / "companies.csv", index=False)

          pd.DataFrame(
              [
                  {
                      "company_id": "TCS",
                      "year": "Mar-24",
                      "sales": 245000,
                      "expenses": 183000,
                      "operating_profit": 62000,
                      "opm_pct": 25.4,
                      "interest": 1500,
                      "depreciation": 2000,
                      "net_profit": 46500,
                      "eps": 122,
                      "dividend_payout_pct": 74,
                  }
              ]
          ).to_csv(raw_dir / "profitandloss.csv", index=False)

          pd.DataFrame(
              [
                  {
                      "company_id": "TCS",
                      "year": "Mar 2024",
                      "equity_capital": 100,
                      "reserves": 50000,
                      "borrowings": 2000,
                      "other_liabilities": 10000,
                      "total_liabilities": 62100,
                      "fixed_assets": 12000,
                      "investments": 8000,
                      "other_assets": 42100,
                      "total_assets": 62100,
                  }
              ]
          ).to_csv(raw_dir / "balancesheet.csv", index=False)

          pd.DataFrame(
              [
                  {
                      "company_id": "TCS",
                      "year": "Mar 2024",
                      "operating_activity": 52000,
                      "investing_activity": -11000,
                      "financing_activity": -5000,
                      "net_cash_flow": 36000,
                  }
              ]
          ).to_csv(raw_dir / "cashflow.csv", index=False)

          pd.DataFrame(
              [
                  {
                      "company_id": "TCS",
                      "period": "3Y",
                      "compounded_sales_growth_pct": 12.4,
                      "compounded_profit_growth_pct": 11.2,
                      "stock_price_cagr_pct": 14.8,
                      "roe_pct": 46,
                  }
              ]
          ).to_csv(raw_dir / "analysis.csv", index=False)

          pd.DataFrame(
              [
                  {"company_id": "TCS", "pros": "Strong cash flow", "cons": "Mature growth"}
              ]
          ).to_csv(raw_dir / "prosandcons.csv", index=False)

          transform_module.run_pipeline(raw_dir, clean_dir)

          dim_year = pd.read_csv(clean_dir / "dim_year.csv")
          fact_profit_loss = pd.read_csv(clean_dir / "fact_profit_loss.csv")
          fact_balance_sheet = pd.read_csv(clean_dir / "fact_balance_sheet.csv")
          fact_cash_flow = pd.read_csv(clean_dir / "fact_cash_flow.csv")

          self.assertIn("Mar 2024", dim_year["year_label"].tolist())
          self.assertAlmostEqual(fact_profit_loss.loc[0, "net_profit_margin_pct"], 18.98, places=2)
          self.assertAlmostEqual(fact_balance_sheet.loc[0, "debt_to_equity"], 0.0399, places=4)
          self.assertAlmostEqual(fact_cash_flow.loc[0, "free_cash_flow"], 41000, places=2)


if __name__ == "__main__":
    unittest.main()
