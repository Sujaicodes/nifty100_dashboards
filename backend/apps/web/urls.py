from django.urls import path

from .views import FrontendView

urlpatterns = [
    path("companies/", FrontendView.as_view(), name="frontend-companies"),
    path("companies/<str:symbol>/", FrontendView.as_view(), name="frontend-company-detail"),
    path("dashboards/", FrontendView.as_view(), name="frontend-dashboards"),
    path("dashboards/<str:dashboard_id>/", FrontendView.as_view(), name="frontend-dashboard"),
    path("reports/", FrontendView.as_view(), name="frontend-reports"),
    path("about/", FrontendView.as_view(), name="frontend-about"),
    path("", FrontendView.as_view(), name="frontend-home"),
]
