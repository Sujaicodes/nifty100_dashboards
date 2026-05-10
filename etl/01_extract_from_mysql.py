"""Extract MariaDB SQL dump tables into raw CSV files."""

from __future__ import annotations

import argparse
import csv
import io
import re
from pathlib import Path


TABLES = [
    "companies",
    "analysis",
    "balancesheet",
    "profitandloss",
    "cashflow",
    "prosandcons",
    "documents",
]


def extract_table_columns(sql_text: str, table_name: str) -> list[str]:
    pattern = re.compile(
        rf"CREATE TABLE\s+`{table_name}`\s*\((.*?)\)\s*(ENGINE|TYPE|\);)",
        re.DOTALL | re.IGNORECASE,
    )
    match = pattern.search(sql_text)
    if not match:
        return []

    columns = []
    for line in match.group(1).splitlines():
        stripped = line.strip()
        if not stripped.startswith("`"):
            continue
        column_match = re.match(r"`([^`]+)`", stripped)
        if column_match:
            columns.append(column_match.group(1))
    return columns


def extract_table_blocks(sql_text: str, table_name: str) -> list[str]:
    pattern = re.compile(
        rf"INSERT INTO\s+`{table_name}`(?:\s*\([^)]*\))?\s+VALUES\s*(.+?);",
        re.DOTALL | re.IGNORECASE,
    )
    return [match.group(1) for match in pattern.finditer(sql_text)]


def split_rows(values_block: str) -> list[str]:
    rows: list[str] = []
    buffer: list[str] = []
    depth = 0
    in_string = False
    escaped = False

    for character in values_block:
        buffer.append(character)

        if escaped:
            escaped = False
            continue

        if character == "\\":
            escaped = True
            continue

        if character == "'":
            in_string = not in_string
            continue

        if in_string:
            continue

        if character == "(":
            depth += 1
        elif character == ")":
            depth -= 1
            if depth == 0:
                row = "".join(buffer).strip().rstrip(",")
                if row:
                    rows.append(row)
                buffer = []

    return rows


def parse_row(row_text: str) -> list[str]:
    inner = row_text.strip()[1:-1]
    reader = csv.reader(
        io.StringIO(inner),
        delimiter=",",
        quotechar="'",
        escapechar="\\",
        skipinitialspace=True,
    )
    row = next(reader)
    normalized = []
    for value in row:
        cleaned = value.strip()
        normalized.append("" if cleaned in {"NULL", "Null", "null"} else cleaned)
    return normalized


def build_table_rows(sql_text: str, table_name: str) -> tuple[list[str], list[list[str]]]:
    columns = extract_table_columns(sql_text, table_name)
    rows: list[list[str]] = []
    for block in extract_table_blocks(sql_text, table_name):
        rows.extend(parse_row(row_text) for row_text in split_rows(block))

    if not columns and rows:
        columns = [f"column_{index + 1}" for index in range(len(rows[0]))]
    return columns, rows


def write_rows(output_path: Path, columns: list[str], rows: list[list[str]]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        if columns:
            writer.writerow(columns)
        writer.writerows(rows)


def run_extraction(sql_dump: Path, output_dir: Path) -> list[dict]:
    sql_text = sql_dump.read_text(encoding="utf-8")
    metadata = []
    for table_name in TABLES:
        columns, rows = build_table_rows(sql_text, table_name)
        output_path = output_dir / f"{table_name}.csv"
        write_rows(output_path, columns, rows)
        metadata.append(
            {
                "table": table_name,
                "rows": len(rows),
                "columns": columns,
                "path": str(output_path),
            }
        )
    return metadata


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract raw CSVs from a MariaDB SQL dump.")
    parser.add_argument("sql_dump", type=Path, help="Path to the source .sql dump file")
    parser.add_argument("--output-dir", type=Path, default=Path("data/raw"))
    args = parser.parse_args()

    for item in run_extraction(args.sql_dump, args.output_dir):
        print(f"{item['table']}: extracted {item['rows']} rows -> {item['path']}")
        print(f"  columns: {', '.join(item['columns']) if item['columns'] else 'none found'}")


if __name__ == "__main__":
    main()
