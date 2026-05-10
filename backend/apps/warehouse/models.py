from django.db import models


class Sector(models.Model):
    sector_code = models.CharField(max_length=30, unique=True)
    sector_name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = "dim_sector"

    def __str__(self) -> str:
        return self.sector_name


class Company(models.Model):
    symbol = models.CharField(primary_key=True, max_length=20)
    company_name = models.CharField(max_length=255)
    sector = models.ForeignKey(Sector, related_name="companies", on_delete=models.PROTECT)
    company_logo = models.URLField(blank=True)
    website = models.URLField(blank=True)
    nse_url = models.URLField(blank=True)
    bse_url = models.URLField(blank=True)
    face_value = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    book_value = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    about_company = models.TextField(blank=True)

    class Meta:
        db_table = "dim_company"

    def __str__(self) -> str:
        return f"{self.company_name} ({self.symbol})"


class YearDimension(models.Model):
    year_label = models.CharField(max_length=40, unique=True)
    fiscal_year = models.IntegerField()
    quarter = models.CharField(max_length=4, blank=True)
    is_ttm = models.BooleanField(default=False)
    is_half_year = models.BooleanField(default=False)
    sort_order = models.IntegerField()

    class Meta:
        db_table = "dim_year"

    def __str__(self) -> str:
        return self.year_label


class HealthLabel(models.Model):
    label_name = models.CharField(max_length=30, unique=True)
    min_score = models.IntegerField()
    max_score = models.IntegerField()
    color_hex = models.CharField(max_length=7)

    class Meta:
        db_table = "dim_health_label"

    def __str__(self) -> str:
        return self.label_name


class ProfitLossFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.ForeignKey(YearDimension, on_delete=models.CASCADE)
    sales = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    expenses = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    operating_profit = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    opm_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    other_income = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    interest = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    depreciation = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    profit_before_tax = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    tax_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    net_profit = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    eps = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    dividend_payout_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    net_profit_margin_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    expense_ratio_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    interest_coverage = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "fact_profit_loss"
        unique_together = ("symbol", "year")


class BalanceSheetFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.ForeignKey(YearDimension, on_delete=models.CASCADE)
    equity_capital = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    reserves = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    borrowings = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    other_liabilities = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    total_liabilities = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    fixed_assets = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    cwip = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    investments = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    other_assets = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    total_assets = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    debt_to_equity = models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)
    equity_ratio = models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)

    class Meta:
        db_table = "fact_balance_sheet"
        unique_together = ("symbol", "year")


class CashFlowFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.ForeignKey(YearDimension, on_delete=models.CASCADE)
    operating_activity = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    investing_activity = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    financing_activity = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    net_cash_flow = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    free_cash_flow = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    cash_conversion_ratio = models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)

    class Meta:
        db_table = "fact_cash_flow"
        unique_together = ("symbol", "year")


class AnalysisFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    period_label = models.CharField(max_length=10)
    compounded_sales_growth_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    compounded_profit_growth_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    stock_price_cagr_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    roe_pct = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = "fact_analysis"
        unique_together = ("symbol", "period_label")


class MlScoreFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    computed_at = models.DateTimeField()
    overall_score = models.DecimalField(max_digits=8, decimal_places=2)
    profitability_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    growth_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    leverage_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    cashflow_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    dividend_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    trend_score = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    health_label = models.ForeignKey(HealthLabel, on_delete=models.PROTECT)

    class Meta:
        db_table = "fact_ml_scores"


class ProsConsFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_pro = models.BooleanField()
    category = models.CharField(max_length=100)
    text = models.TextField()
    source = models.CharField(max_length=20, default="MANUAL")
    confidence = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    generated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "fact_pros_cons"


class DocumentFact(models.Model):
    symbol = models.ForeignKey(Company, on_delete=models.CASCADE)
    year = models.ForeignKey(YearDimension, on_delete=models.CASCADE)
    annual_report = models.URLField(max_length=1000)
    document_type = models.CharField(max_length=40, default="ANNUAL_REPORT")

    class Meta:
        db_table = "fact_documents"
        unique_together = ("symbol", "year", "annual_report")
