from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.api.sample_data import COMPANIES
from apps.warehouse.models import (
    AnalysisFact,
    BalanceSheetFact,
    CashFlowFact,
    Company,
    HealthLabel,
    MlScoreFact,
    ProfitLossFact,
    ProsConsFact,
    Sector,
    YearDimension,
)


HEALTH_LABELS = [
    ("EXCELLENT", 85, 100, "#1d9a63"),
    ("GOOD", 70, 84, "#1040c0"),
    ("AVERAGE", 50, 69, "#f0c020"),
    ("WEAK", 35, 49, "#d02020"),
    ("POOR", 0, 34, "#121212"),
]


class Command(BaseCommand):
    help = "Seed the warehouse with the in-repo demo company dataset."

    def handle(self, *args, **options):
        label_lookup = {}
        for label_name, min_score, max_score, color_hex in HEALTH_LABELS:
            label, _ = HealthLabel.objects.update_or_create(
                label_name=label_name,
                defaults={
                    "min_score": min_score,
                    "max_score": max_score,
                    "color_hex": color_hex,
                },
            )
            label_lookup[label_name] = label

        for company_payload in COMPANIES:
            sector, _ = Sector.objects.update_or_create(
                sector_name=company_payload["sector"],
                defaults={"sector_code": company_payload["sector"].upper().replace(" ", "_")},
            )

            company, _ = Company.objects.update_or_create(
                symbol=company_payload["symbol"],
                defaults={
                    "company_name": company_payload["company_name"],
                    "sector": sector,
                },
            )

            AnalysisFact.objects.update_or_create(
                symbol=company,
                period_label="3Y",
                defaults={
                    "compounded_sales_growth_pct": company_payload["sales_cagr_3y"],
                    "roe_pct": company_payload["roe"],
                },
            )

            score_label = label_lookup[company_payload["health_label"]]
            MlScoreFact.objects.filter(symbol=company).delete()
            MlScoreFact.objects.create(
                symbol=company,
                computed_at=timezone.now(),
                overall_score=company_payload["health_score"],
                profitability_score=company_payload["opm"],
                growth_score=company_payload["sales_cagr_3y"],
                leverage_score=max(0, 100 - (company_payload["debt_to_equity"] * 10)),
                cashflow_score=company_payload["cash_conversion"] * 50,
                dividend_score=company_payload["dividend_payout"],
                trend_score=company_payload["roe"],
                health_label=score_label,
            )

            for year_row in company_payload["years"]:
                year_dimension, _ = YearDimension.objects.update_or_create(
                    year_label=f"Mar {year_row['year']}",
                    defaults={
                        "fiscal_year": year_row["year"],
                        "quarter": "Q4",
                        "is_ttm": False,
                        "is_half_year": False,
                        "sort_order": year_row["year"],
                    },
                )

                ProfitLossFact.objects.update_or_create(
                    symbol=company,
                    year=year_dimension,
                    defaults={
                        "sales": year_row["sales"],
                        "operating_profit": year_row["profit"],
                        "opm_pct": year_row["opm"],
                        "net_profit": year_row["profit"],
                        "eps": year_row["eps"],
                        "dividend_payout_pct": year_row["dividend"],
                        "interest_coverage": company_payload["interest_coverage"],
                    },
                )

                BalanceSheetFact.objects.update_or_create(
                    symbol=company,
                    year=year_dimension,
                    defaults={
                        "debt_to_equity": year_row["debt"],
                    },
                )

                CashFlowFact.objects.update_or_create(
                    symbol=company,
                    year=year_dimension,
                    defaults={
                        "cash_conversion_ratio": company_payload["cash_conversion"],
                    },
                )

            ProsConsFact.objects.filter(symbol=company).delete()
            for text in company_payload["pros"]:
                ProsConsFact.objects.create(
                    symbol=company,
                    is_pro=True,
                    category="General",
                    text=text,
                    source="MANUAL",
                )
            for text in company_payload["cons"]:
                ProsConsFact.objects.create(
                    symbol=company,
                    is_pro=False,
                    category="General",
                    text=text,
                    source="MANUAL",
                )

        self.stdout.write(self.style.SUCCESS("Demo warehouse data seeded successfully."))
