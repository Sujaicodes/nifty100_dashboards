# Bluestock IQ Deployment Notes

Private operator checklist for deploying the frontend on Vercel and the Django API on Railway.

## Railway backend

1. Create a Railway project for the backend.
2. Add PostgreSQL and Redis services.
3. Set backend variables:
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS=<your-railway-domain>`
   - `CORS_ALLOWED_ORIGINS=<your-vercel-domain>`
   - `CSRF_TRUSTED_ORIGINS=<your-vercel-domain>`
   - `DATABASE_URL=<railway-postgres-url>`
   - `REDIS_URL=<railway-redis-url>`
4. Deploy the backend service.
5. Run:

```powershell
python manage.py migrate
python manage.py import_excel_workbooks
```

6. Verify:

```text
https://<your-railway-domain>/api/health/
https://<your-railway-domain>/api/bootstrap/
```

## Vercel frontend

1. Import the repo into Vercel with `frontend/` as the project root.
2. Keep `frontend/vercel.json` in that root so deep links route back to `index.html`.
3. Set the Railway API URL in `frontend/config.js` before production deployment:

```js
window.BS_API_BASE = "https://<your-railway-domain>";
```

4. Deploy.
5. Verify these public pages:
   - `/`
   - `/companies/`
   - `/companies/TCS/`
   - `/dashboards/growth/`
   - `/reports/`
   - `/about/`

## Pre-launch smoke test

- `/api/bootstrap/` returns warehouse companies.
- Frontend source pill says warehouse companies, not fallback data.
- Company detail pages show charts, pros, cons, reports, and glossary/tooltips.
- Browser console has no CORS errors.
- `DJANGO_DEBUG` is false in production.
