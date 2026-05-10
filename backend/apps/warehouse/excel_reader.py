from __future__ import annotations

from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET


NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
    "office_rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def _text(element: ET.Element | None) -> str:
    if element is None:
        return ""
    return "".join(element.itertext())


def _column_index(cell_reference: str) -> int:
    letters = "".join(character for character in cell_reference if character.isalpha())
    index = 0
    for letter in letters:
        index = index * 26 + (ord(letter.upper()) - ord("A") + 1)
    return max(index - 1, 0)


def _shared_strings(workbook: ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in workbook.namelist():
        return []
    root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
    return [_text(item) for item in root.findall("main:si", NS)]


def _first_sheet_path(workbook: ZipFile) -> str:
    workbook_root = ET.fromstring(workbook.read("xl/workbook.xml"))
    sheet = workbook_root.find("main:sheets/main:sheet", NS)
    if sheet is None:
        raise ValueError("Workbook does not contain a worksheet.")

    relationship_id = sheet.attrib[f"{{{NS['office_rel']}}}id"]
    relationships = ET.fromstring(workbook.read("xl/_rels/workbook.xml.rels"))
    for relationship in relationships.findall("rel:Relationship", NS):
        if relationship.attrib["Id"] == relationship_id:
            target = relationship.attrib["Target"].replace("\\", "/").lstrip("/")
            return target if target.startswith("xl/") else f"xl/{target}"
    raise ValueError("Could not resolve first worksheet path.")


def _cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    value_node = cell.find("main:v", NS)

    if cell_type == "inlineStr":
        return _text(cell.find("main:is", NS)).strip()
    if value_node is None:
        return ""

    raw_value = value_node.text or ""
    if cell_type == "s" and raw_value.isdigit():
        index = int(raw_value)
        return shared_strings[index].strip() if index < len(shared_strings) else ""
    return raw_value.strip()


def read_first_sheet(path: Path) -> list[dict[str, str]]:
    with ZipFile(path) as workbook:
        shared_strings = _shared_strings(workbook)
        sheet_path = _first_sheet_path(workbook)
        sheet_root = ET.fromstring(workbook.read(sheet_path))

    rows: list[list[str]] = []
    for row in sheet_root.findall(".//main:sheetData/main:row", NS):
        values: list[str] = []
        for cell in row.findall("main:c", NS):
            column_index = _column_index(cell.attrib.get("r", "A1"))
            while len(values) <= column_index:
                values.append("")
            values[column_index] = _cell_value(cell, shared_strings)
        if any(value.strip() for value in values):
            rows.append(values)

    if not rows:
        return []

    header_index = 0
    for index, row in enumerate(rows):
        populated_cells = [value for value in row if value.strip()]
        if len(populated_cells) >= 2:
            header_index = index
            break

    headers = [normalize_header(value) for value in rows[header_index]]
    records = []
    for row in rows[header_index + 1 :]:
        record = {}
        for index, header in enumerate(headers):
            if not header:
                continue
            record[header] = row[index].strip() if index < len(row) else ""
        if any(value for value in record.values()):
            records.append(record)
    return records


def normalize_header(value: str) -> str:
    header = value.strip().lower()
    replacements = {
        "%": "pct",
        "&": "and",
        "/": "_",
        "-": "_",
        " ": "_",
        ".": "",
        "\n": "_",
        "\r": "_",
    }
    for source, target in replacements.items():
        header = header.replace(source, target)
    while "__" in header:
        header = header.replace("__", "_")
    return header.strip("_")
