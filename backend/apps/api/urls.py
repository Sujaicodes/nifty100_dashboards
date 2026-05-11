from django.urls import path

from .views import (
    BootstrapView,
    CompanyBalanceSheetTrendView,
    CompanyCashFlowTrendView,
    CompanyDetailView,
    CompanyDocumentsView,
    CompanyFinancialSummaryView,
    CompanyGrowthAnalyticsView,
    CompanyHealthScoreView,
    CompanyListView,
    CompanyPeerComparisonView,
    CompanyProsConsView,
    ExecutiveOverviewView,
    HealthCheckView,
    SectorComparisonView,
    SectorSummaryView,
)

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="api-health"),
    path("bootstrap/", BootstrapView.as_view(), name="api-bootstrap"),
    path("companies/", CompanyListView.as_view(), name="company-list"),
    path("companies/<str:symbol>/", CompanyDetailView.as_view(), name="company-detail"),
    path("companies/<str:symbol>/financial-summary/", CompanyFinancialSummaryView.as_view(), name="company-financial-summary"),
    path("companies/<str:symbol>/balance-sheet-trend/", CompanyBalanceSheetTrendView.as_view(), name="company-balance-sheet-trend"),
    path("companies/<str:symbol>/cash-flow-trend/", CompanyCashFlowTrendView.as_view(), name="company-cash-flow-trend"),
    path("companies/<str:symbol>/health-score/", CompanyHealthScoreView.as_view(), name="company-health-score"),
    path("companies/<str:symbol>/documents/", CompanyDocumentsView.as_view(), name="company-documents"),
    path("companies/<str:symbol>/pros-cons/", CompanyProsConsView.as_view(), name="company-pros-cons"),
    path("companies/<str:symbol>/peer-comparison/", CompanyPeerComparisonView.as_view(), name="company-peer-comparison"),
    path("companies/<str:symbol>/growth-analytics/", CompanyGrowthAnalyticsView.as_view(), name="company-growth-analytics"),
    path("sectors/summary/", SectorSummaryView.as_view(), name="sector-summary"),
    path("sectors/comparison/", SectorComparisonView.as_view(), name="sector-comparison"),
    path("dashboard/executive-overview/", ExecutiveOverviewView.as_view(), name="executive-overview"),
]
