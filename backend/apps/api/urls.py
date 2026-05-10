from django.urls import path

from .views import (
    BootstrapView,
    CompanyDetailView,
    CompanyListView,
    ExecutiveOverviewView,
    HealthCheckView,
    SectorSummaryView,
)

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="api-health"),
    path("bootstrap/", BootstrapView.as_view(), name="api-bootstrap"),
    path("companies/", CompanyListView.as_view(), name="company-list"),
    path("companies/<str:symbol>/", CompanyDetailView.as_view(), name="company-detail"),
    path("sectors/summary/", SectorSummaryView.as_view(), name="sector-summary"),
    path("dashboard/executive-overview/", ExecutiveOverviewView.as_view(), name="executive-overview"),
]

