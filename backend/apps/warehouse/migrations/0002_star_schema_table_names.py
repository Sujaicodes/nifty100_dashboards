from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("warehouse", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelTable(name="sector", table="dim_sector"),
        migrations.AlterModelTable(name="company", table="dim_company"),
        migrations.AlterModelTable(name="yeardimension", table="dim_year"),
        migrations.AlterModelTable(name="healthlabel", table="dim_health_label"),
        migrations.AlterModelTable(name="profitlossfact", table="fact_profit_loss"),
        migrations.AlterModelTable(name="balancesheetfact", table="fact_balance_sheet"),
        migrations.AlterModelTable(name="cashflowfact", table="fact_cash_flow"),
        migrations.AlterModelTable(name="analysisfact", table="fact_analysis"),
        migrations.AlterModelTable(name="mlscorefact", table="fact_ml_scores"),
        migrations.AlterModelTable(name="prosconsfact", table="fact_pros_cons"),
    ]
