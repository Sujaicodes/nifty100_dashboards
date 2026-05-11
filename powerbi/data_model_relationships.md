# Data Model Relationships

Use a star-schema model in Power BI.

## Core relationships

| From Table | From Column | To Table | To Column | Cardinality |
| --- | --- | --- | --- | --- |
| `fact_profit_loss` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_profit_loss` | `year_id` | `dim_year` | `year_id` | Many-to-One |
| `fact_balance_sheet` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_balance_sheet` | `year_id` | `dim_year` | `year_id` | Many-to-One |
| `fact_cash_flow` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_cash_flow` | `year_id` | `dim_year` | `year_id` | Many-to-One |
| `fact_analysis` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_ml_scores` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_pros_cons` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `fact_documents` | `symbol` | `dim_company` | `symbol` | Many-to-One |
| `dim_company` | `sector` | `dim_sector` | `sector_name` | Many-to-One |

## Modeling guidance

- Keep cross-filter direction single where possible.
- Avoid snowflaking beyond the sector lookup.
- Use `dim_year[sort_order]` to sort `dim_year[year_label]`.
- Mark `dim_year` as the date/fiscal axis source for all year visuals.

## Recommended hidden technical columns

Hide from report view after modeling:

- foreign keys on facts when not needed by authors
- `sort_order`
- raw technical identifiers only used for joins

## Calculated expectations

The warehouse already computes several repeated metrics. Favor the fact-table values first, and only create DAX when the output is aggregation-specific, time-aware, or UI-specific.
