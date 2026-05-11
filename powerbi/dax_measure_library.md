# DAX Measure Library

Use these measures as the starting catalog across the seven PBIX files.

## Base measures

```DAX
Total Companies = DISTINCTCOUNT(dim_company[symbol])

Total Sales = SUM(fact_profit_loss[sales])

Total Net Profit = SUM(fact_profit_loss[net_profit])

Average OPM % = AVERAGE(fact_profit_loss[opm_pct])

Average ROE % = AVERAGE(fact_analysis[roe_pct])

Average Debt To Equity = AVERAGE(fact_balance_sheet[debt_to_equity])

Average Health Score = AVERAGE(fact_ml_scores[overall_score])
```

## Health measures

```DAX
Excellent Companies =
COUNTROWS(
    FILTER(fact_ml_scores, fact_ml_scores[overall_score] >= 85)
)

Weak Poor Companies =
COUNTROWS(
    FILTER(fact_ml_scores, fact_ml_scores[overall_score] < 50)
)
```

## Latest-period helpers

```DAX
Latest Fiscal Year =
MAX(dim_year[fiscal_year])

ROE Last Year =
CALCULATE(
    AVERAGE(fact_analysis[roe_pct]),
    KEEPFILTERS(dim_year[fiscal_year] = [Latest Fiscal Year])
)

Revenue Last Year =
CALCULATE(
    [Total Sales],
    KEEPFILTERS(dim_year[fiscal_year] = [Latest Fiscal Year])
)
```

## Growth measures

```DAX
3Y Sales CAGR =
CALCULATE(
    AVERAGE(fact_analysis[compounded_sales_growth_pct]),
    KEEPFILTERS(fact_analysis[period_label] = "3Y")
)

5Y Sales CAGR =
CALCULATE(
    AVERAGE(fact_analysis[compounded_sales_growth_pct]),
    KEEPFILTERS(fact_analysis[period_label] = "5Y")
)

10Y Sales CAGR =
CALCULATE(
    AVERAGE(fact_analysis[compounded_sales_growth_pct]),
    KEEPFILTERS(fact_analysis[period_label] = "10Y")
)

3Y Profit CAGR =
CALCULATE(
    AVERAGE(fact_analysis[compounded_profit_growth_pct]),
    KEEPFILTERS(fact_analysis[period_label] = "3Y")
)
```

## Margin and cash-flow measures

```DAX
Net Profit Margin % =
DIVIDE(SUM(fact_profit_loss[net_profit]), SUM(fact_profit_loss[sales])) * 100

Expense Ratio % =
DIVIDE(SUM(fact_profit_loss[expenses]), SUM(fact_profit_loss[sales])) * 100

Free Cash Flow =
SUM(fact_cash_flow[free_cash_flow])

Cash Conversion Ratio =
DIVIDE(SUM(fact_cash_flow[operating_activity]), SUM(fact_profit_loss[net_profit]))

Interest Coverage =
DIVIDE(SUM(fact_profit_loss[operating_profit]), SUM(fact_profit_loss[interest]))
```

## Balance-sheet measures

```DAX
Equity Ratio =
DIVIDE(
    SUM(fact_balance_sheet[equity_capital]) + SUM(fact_balance_sheet[reserves]),
    SUM(fact_balance_sheet[total_assets])
)

Total Borrowings = SUM(fact_balance_sheet[borrowings])

Total Assets = SUM(fact_balance_sheet[total_assets])
```

## Ranking and UX helpers

```DAX
Company Rank By Score =
RANKX(
    ALLSELECTED(dim_company[company_name]),
    [Average Health Score],
    ,
    DESC
)

Top Company Per Sector Flag =
VAR SectorRank =
    RANKX(
        ALLSELECTED(dim_company[company_name]),
        [Average Health Score],
        ,
        DESC
    )
RETURN IF(SectorRank = 1, 1, 0)
```

## Time-intelligence style comparisons

```DAX
Sales Previous Year =
CALCULATE(
    [Total Sales],
    FILTER(
        ALL(dim_year),
        dim_year[fiscal_year] = MAX(dim_year[fiscal_year]) - 1
    )
)

Sales YoY % =
DIVIDE([Total Sales] - [Sales Previous Year], [Sales Previous Year]) * 100

Net Profit Previous Year =
CALCULATE(
    [Total Net Profit],
    FILTER(
        ALL(dim_year),
        dim_year[fiscal_year] = MAX(dim_year[fiscal_year]) - 1
    )
)

Net Profit YoY % =
DIVIDE([Total Net Profit] - [Net Profit Previous Year], [Net Profit Previous Year]) * 100
```
