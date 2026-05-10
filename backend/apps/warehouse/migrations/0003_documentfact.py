from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("warehouse", "0002_star_schema_table_names"),
    ]

    operations = [
        migrations.CreateModel(
            name="DocumentFact",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("annual_report", models.URLField(max_length=1000)),
                ("document_type", models.CharField(default="ANNUAL_REPORT", max_length=40)),
                ("symbol", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="warehouse.company")),
                ("year", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="warehouse.yeardimension")),
            ],
            options={
                "db_table": "fact_documents",
                "unique_together": {("symbol", "year", "annual_report")},
            },
        ),
    ]
