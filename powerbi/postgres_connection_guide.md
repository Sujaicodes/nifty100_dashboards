# PostgreSQL Connection Guide

## Target warehouse

- Server: `localhost:5432`
- Database: `bluestock_dw`
- Source type: PostgreSQL

## Power BI Desktop connection steps

1. Open Power BI Desktop.
2. Select `Get Data`.
3. Choose `PostgreSQL database`.
4. Enter:
   - Server: `localhost:5432`
   - Database: `bluestock_dw`
5. Choose `Import`.
6. Authenticate with the PostgreSQL credentials configured in your local environment.

## Tables to import

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

## Power Query checks before loading

- Verify all numeric columns import as numeric or decimal types.
- Ensure `year_id` stays numeric across all fact tables.
- Ensure `computed_at` imports as datetime.
- Confirm `is_ttm` and `is_half_year` import as boolean.
- Check null counts for ratio fields like `debt_to_equity` and `interest_coverage`.

## Security note

Do not hardcode passwords in PBIX files meant for sharing. Use:

- local credential storage for Desktop development
- Power BI Gateway credentials for scheduled refresh

## Recommended Power Query renames

Use business-friendly aliases where useful:

- `dim_company` -> `Company`
- `dim_year` -> `Year`
- `dim_sector` -> `Sector`
- `fact_profit_loss` -> `Profit Loss`
- `fact_balance_sheet` -> `Balance Sheet`
- `fact_cash_flow` -> `Cash Flow`
- `fact_analysis` -> `Growth Analysis`
- `fact_ml_scores` -> `Health Scores`
- `fact_pros_cons` -> `Pros Cons`
- `fact_documents` -> `Annual Reports`
