# Power BI Delivery Manifest

This repo is prepared for the following production PBIX outputs:

- `powerbi/01_executive_overview.pbix`
- `powerbi/02_company_deep_dive.pbix`
- `powerbi/03_sector_comparison.pbix`
- `powerbi/04_health_scorecard.pbix`
- `powerbi/05_growth_analytics.pbix`
- `powerbi/06_debt_leverage.pbix`
- `powerbi/07_dividend_returns.pbix`

## Data source contract

These PBIX files should connect to the PostgreSQL warehouse after the Excel workbook import is processed end-to-end:

- `dim_company`
- `dim_year`
- `dim_sector`
- `dim_health_label`
- `fact_profit_loss`
- `fact_balance_sheet`
- `fact_cash_flow`
- `fact_analysis`
- `fact_ml_scores`
- `fact_pros_cons`
- `fact_documents`

## Current blocker

The PostgreSQL warehouse is populated from the Excel source files. The actual `.pbix` binaries still need to be authored in Power BI Desktop against the populated warehouse.
