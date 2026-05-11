# Publishing And Refresh Guide

## Before publish

- Validate relationships and measure names.
- Run null and type checks in Power Query.
- Confirm sector and company slicers filter as intended.
- Test each page with at least one IT company, one bank, and one energy company.

## Power BI Service publish flow

1. Publish each PBIX to the target workspace.
2. Configure the PostgreSQL gateway connection.
3. Map credentials securely.
4. Run a manual refresh.
5. Validate visuals after refresh.

## Suggested refresh schedule

- Warehouse ETL: daily or on workbook update
- ML or scoring refresh: after ETL
- Power BI dataset refresh: after warehouse refresh completes

## Documentation to attach with delivery

- screenshot pack for all pages
- measure glossary
- relationship map
- refresh owner and contact
- known assumptions for placeholder companies or missing master data

## Acceptance checklist

- all seven PBIX files saved in `powerbi/`
- PostgreSQL refresh succeeds
- key measures match API and warehouse spot checks
- company slicers and sector slicers behave consistently
- documentation stored in the repo beside the PBIX files
