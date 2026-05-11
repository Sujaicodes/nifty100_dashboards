"""Load clean star-schema CSVs into PostgreSQL with idempotent upserts."""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd
from sqlalchemy import create_engine, text


TABLE_ORDER = [
    ("dim_sector", ["sector_id"]),
    ("dim_company", ["symbol"]),
    ("dim_year", ["year_id"]),
    ("dim_health_label", ["label_id"]),
    ("fact_profit_loss", ["symbol", "year_id"]),
    ("fact_balance_sheet", ["symbol", "year_id"]),
    ("fact_cash_flow", ["symbol", "year_id"]),
    ("fact_analysis", ["symbol", "period_label"]),
    ("fact_ml_scores", ["symbol", "computed_at"]),
    ("fact_pros_cons", ["symbol", "is_pro", "text"]),
]


def build_connection_url(host: str, port: int, database: str, username: str, password: str) -> str:
    return f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}"


def load_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        return pd.DataFrame()
    return pd.read_csv(path).where(pd.notna, None)


def _quote_columns(columns: list[str]) -> str:
    return ", ".join(f'"{column}"' for column in columns)


def upsert_dataframe(engine, table_name: str, frame: pd.DataFrame, conflict_columns: list[str]) -> int:
    if frame.empty:
        return 0

    columns = list(frame.columns)
    insert_columns = _quote_columns(columns)
    value_columns = ", ".join(f":{column}" for column in columns)
    update_columns = ", ".join(
        f'"{column}" = EXCLUDED."{column}"'
        for column in columns
        if column not in conflict_columns
    )
    if not update_columns:
        update_columns = f'"{conflict_columns[0]}" = EXCLUDED."{conflict_columns[0]}"'

    sql = f"""
        INSERT INTO {table_name} ({insert_columns})
        VALUES ({value_columns})
        ON CONFLICT ({_quote_columns(conflict_columns)}) DO UPDATE
        SET {update_columns}
    """

    with engine.begin() as connection:
        connection.execute(text(sql), frame.to_dict("records"))
    return len(frame)


def load_clean_outputs(input_dir: Path) -> dict[str, pd.DataFrame]:
    return {
        table_name: load_csv(input_dir / f"{table_name}.csv")
        for table_name, _ in TABLE_ORDER
    }


def run_load(input_dir: Path, engine) -> dict[str, int]:
    frames = load_clean_outputs(input_dir)
    counts: dict[str, int] = {}
    for table_name, conflict_columns in TABLE_ORDER:
        counts[table_name] = upsert_dataframe(engine, table_name, frames[table_name], conflict_columns)
    return counts


def main() -> None:
    parser = argparse.ArgumentParser(description="Load clean CSVs into the PostgreSQL warehouse.")
    parser.add_argument("--input-dir", type=Path, default=Path("data/clean"))
    parser.add_argument("--host", default="localhost")
    parser.add_argument("--port", type=int, default=5432)
    parser.add_argument("--database", default="bluestock_dw")
    parser.add_argument("--username", default="postgres")
    parser.add_argument("--password", default="postgres")
    args = parser.parse_args()

    engine = create_engine(
        build_connection_url(
            host=args.host,
            port=args.port,
            database=args.database,
            username=args.username,
            password=args.password,
        )
    )

    counts = run_load(args.input_dir, engine)
    for table_name, row_count in counts.items():
        print(f"{table_name}: upserted {row_count} rows")


if __name__ == "__main__":
    main()
