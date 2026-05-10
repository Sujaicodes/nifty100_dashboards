# Bluestock IQ

Frontend and backend foundation for a Nifty 100 financial intelligence platform.

## What is included now

- Investor-facing frontend prototype in `frontend/`
- Django + Django REST Framework backend scaffold in `backend/`
- API routes for company, sector, and executive overview demo data
- PostgreSQL/Redis/Celery Docker Compose setup for local development
- PostgreSQL warehouse tables aligned to the star-schema direction from the project brief
- Direct Excel workbook import for the seven exported source datasets

## Project layout

- `frontend/` static UI prototype and assets
- `backend/` Django project, API, warehouse models, and web integration
- `data/source/` source Excel workbooks used by the Django warehouse importer
- `docker-compose.yml` local app, database, and worker stack

## Fast start

1. Copy `.env.example` to `.env`
2. Build and run:

```powershell
docker compose up --build
```

3. Open:

```text
http://localhost:8000
```

## Key endpoints

- `/` frontend served by Django
- `/api/health/`
- `/api/bootstrap/`
- `/api/companies/`
- `/api/companies/TCS/`
- `/api/sectors/summary/`
- `/api/dashboard/executive-overview/`
- `/api/schema/`
- `/api/docs/`

## Real Excel ETL Flow

Place these files in `data/source/`:

- `companies.xlsx`
- `profitandloss.xlsx`
- `balancesheet.xlsx`
- `cashflow.xlsx`
- `analysis.xlsx`
- `prosandcons.xlsx`
- `documents.xlsx`

Then run:

```powershell
docker compose exec web python manage.py migrate
docker compose exec web python manage.py import_excel_workbooks
```

This command will:

1. read the Excel exports directly from `data/source/`
2. standardize years such as `Mar-24`, `Mar 2024`, and `TTM`
3. upsert dimensional and fact tables into PostgreSQL
4. preserve annual report links in `fact_documents`
5. generate first-pass company health scores in `fact_ml_scores`

The SQL-dump pipeline modules still live in:

- `etl/01_extract_from_mysql.py`
- `etl/02_clean_and_transform.py`
- `etl/03_load_to_warehouse.py`

The live Django importer is:

- `backend/apps/warehouse/management/commands/import_excel_workbooks.py`

## Current implementation note

The API now prefers PostgreSQL warehouse data when it exists and falls back to demo data only when the warehouse is unavailable or empty.
