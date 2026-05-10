from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.views.static import serve
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("styles.css", serve, {"document_root": settings.REPO_DIR / "frontend", "path": "styles.css"}, name="frontend-css"),
    path("app.js", serve, {"document_root": settings.REPO_DIR / "frontend", "path": "app.js"}, name="frontend-js"),
    path("api/", include("apps.api.urls")),
    path("", include("apps.web.urls")),
]
