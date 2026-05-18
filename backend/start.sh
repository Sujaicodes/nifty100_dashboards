#!/bin/sh
set -eu

python manage.py migrate --noinput

if [ "${IMPORT_EXCEL_ON_STARTUP:-true}" = "true" ]; then
  python manage.py import_excel_workbooks
fi

exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000}
