# Power BI Workspace

This folder is the Power BI delivery kit for the Nifty 100 financial intelligence project.

## Target PBIX outputs

Save the production files here after authoring them in Power BI Desktop:

- `01_executive_overview.pbix`
- `02_company_deep_dive.pbix`
- `03_sector_comparison.pbix`
- `04_health_scorecard.pbix`
- `05_growth_analytics.pbix`
- `06_debt_leverage.pbix`
- `07_dividend_returns.pbix`

## What is already prepared in this repo

- Warehouse-backed source data loaded into PostgreSQL `bluestock_dw`
- Route and feature mapping in the Django/frontend application
- API and schema contracts for company, sector, score, growth, debt, and document views
- Power BI build documentation in this folder

## Power BI authoring pack

- `dashboard_delivery_manifest.md`
- `postgres_connection_guide.md`
- `data_model_relationships.md`
- `dax_measure_library.md`
- `dashboard_build_specs.md`
- `publishing_and_refresh.md`

## Important limitation

Real `.pbix` binaries cannot be generated inside this coding environment because Microsoft Power BI Desktop is required. The repo now contains the complete build guide and measure catalog so the PBIX authoring step can be executed directly on a Windows machine with Power BI installed.

## Recommended build order

1. `01_executive_overview.pbix`
2. `02_company_deep_dive.pbix`
3. `03_sector_comparison.pbix`
4. `04_health_scorecard.pbix`
5. `05_growth_analytics.pbix`
6. `06_debt_leverage.pbix`
7. `07_dividend_returns.pbix`
