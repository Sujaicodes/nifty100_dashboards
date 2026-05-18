#!/bin/sh
set -eu

python manage.py migrate --noinput

if [ "${IMPORT_EXCEL_ON_STARTUP:-true}" = "true" ]; then
  (
    python manage.py import_excel_workbooks || echo "Excel warehouse import failed"
  ) &
fi

echo "Starting Gunicorn on port ${PORT:-8000}"
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000}
