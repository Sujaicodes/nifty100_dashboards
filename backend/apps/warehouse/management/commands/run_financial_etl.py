from __future__ import annotations

import importlib.util
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from sqlalchemy import create_engine


def load_etl_module(filename: str, alias: str):
    module_path = settings.REPO_DIR / "etl" / filename
    spec = importlib.util.spec_from_file_location(alias, module_path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


extract_module = load_etl_module("01_extract_from_mysql.py", "etl_extract")
transform_module = load_etl_module("02_clean_and_transform.py", "etl_transform")
load_module = load_etl_module("03_load_to_warehouse.py", "etl_load")


class Command(BaseCommand):
    help = "Run the full SQL dump to warehouse ETL flow."

    def add_arguments(self, parser):
        parser.add_argument("sql_dump", type=str, help="Path to the source SQL dump file.")
        parser.add_argument("--data-dir", type=str, default=str(settings.REPO_DIR / "data"))

    def handle(self, *args, **options):
        sql_dump = Path(options["sql_dump"]).resolve()
        data_dir = Path(options["data_dir"]).resolve()
        raw_dir = data_dir / "raw"
        clean_dir = data_dir / "clean"

        extract_module.run_extraction(sql_dump, raw_dir)
        transform_module.run_pipeline(raw_dir, clean_dir)

        engine = create_engine(
            load_module.build_connection_url(
                host=settings.DATABASES["default"]["HOST"],
                port=int(settings.DATABASES["default"]["PORT"]),
                database=settings.DATABASES["default"]["NAME"],
                username=settings.DATABASES["default"]["USER"],
                password=settings.DATABASES["default"]["PASSWORD"],
            )
        )
        counts = load_module.run_load(clean_dir, engine)
        for table_name, row_count in counts.items():
            self.stdout.write(f"{table_name}: upserted {row_count} rows")
