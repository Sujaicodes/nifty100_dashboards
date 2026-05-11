from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import PartnerApiKeyPermission
from .services import (
    balance_sheet_trend,
    bootstrap_payload,
    cash_flow_trend,
    company_documents,
    company_financial_summary,
    company_pros_cons,
    executive_overview,
    get_company,
    growth_analytics,
    health_score_breakdown,
    list_companies,
    peer_comparison,
    sector_comparison,
    sector_summary,
)


COMPANY_LIST_PARAMETERS = [
    OpenApiParameter(name="sector", description="Filter by sector name.", required=False, type=str),
    OpenApiParameter(name="search", description="Case-insensitive match against company name or symbol.", required=False, type=str),
    OpenApiParameter(
        name="ordering",
        description="Sort by one field. Prefix with `-` for descending. Supported: company_name, symbol, sector, health_score, revenue, roe, opm, debt_to_equity, sales_cagr_3y.",
        required=False,
        type=str,
    ),
    OpenApiParameter(name="page", description="1-based page index.", required=False, type=int),
    OpenApiParameter(name="page_size", description="Results per page, capped at 100.", required=False, type=int),
]


def paginate(results: list[dict], page: int, page_size: int) -> dict:
    count = len(results)
    page = max(page, 1)
    page_size = min(max(page_size, 1), 100)
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "count": count,
        "page": page,
        "page_size": page_size,
        "next_page": page + 1 if end < count else None,
        "previous_page": page - 1 if page > 1 else None,
        "results": results[start:end],
    }


def int_query_param(request, name: str, default: int) -> int:
    raw = request.query_params.get(name, default)
    try:
        return int(raw)
    except (TypeError, ValueError):
        return default


def filter_and_sort_companies(request) -> list[dict]:
    sector = request.query_params.get("sector")
    search = request.query_params.get("search", "").strip().lower()
    ordering = request.query_params.get("ordering", "company_name")

    companies = list_companies(sector=sector)
    if search:
        companies = [
            company
            for company in companies
            if search in company["company_name"].lower() or search in company["symbol"].lower()
        ]

    ordering_map = {
        "company_name": "company_name",
        "symbol": "symbol",
        "sector": "sector",
        "health_score": "health_score",
        "revenue": "revenue",
        "roe": "roe",
        "opm": "opm",
        "debt_to_equity": "debt_to_equity",
        "sales_cagr_3y": "sales_cagr_3y",
    }
    descending = ordering.startswith("-")
    ordering_key = ordering.removeprefix("-")
    sort_key = ordering_map.get(ordering_key, "company_name")
    companies.sort(key=lambda item: item[sort_key], reverse=descending)
    return companies


class HealthCheckView(APIView):
    @extend_schema(summary="Health check", description="Simple service heartbeat for uptime checks.")
    def get(self, request):
        return Response({"status": "ok", "service": "bluestock-iq-api"}, status=status.HTTP_200_OK)


class BootstrapView(APIView):
    @extend_schema(summary="Website bootstrap payload", description="Public bootstrap payload used by the frontend dashboard shell.")
    def get(self, request):
        return Response(bootstrap_payload(), status=status.HTTP_200_OK)


class CompanyListView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(
        summary="List companies",
        description="Partner-facing company listing with pagination, sector filtering, search, and ordering.",
        parameters=COMPANY_LIST_PARAMETERS + [
            OpenApiParameter(
                name="X-API-Key",
                location=OpenApiParameter.HEADER,
                required=False,
                type=str,
                description="Partner API key. Required only when `BLUESTOCK_PARTNER_API_KEY` is configured.",
            )
        ],
    )
    def get(self, request):
        page = int_query_param(request, "page", 1)
        page_size = int_query_param(request, "page_size", 20)
        return Response(paginate(filter_and_sort_companies(request), page, page_size), status=status.HTTP_200_OK)


class CompanyDetailView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(
        summary="Get company detail",
        description="Partner-facing company profile, financial summary fields, annual reports, and qualitative insights.",
        parameters=[
            OpenApiParameter(
                name="X-API-Key",
                location=OpenApiParameter.HEADER,
                required=False,
                type=str,
                description="Partner API key. Required only when `BLUESTOCK_PARTNER_API_KEY` is configured.",
            )
        ],
    )
    def get(self, request, symbol: str):
        company = get_company(symbol)
        if not company:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(company, status=status.HTTP_200_OK)


class SectorSummaryView(APIView):
    @extend_schema(summary="Sector summary", description="Public sector rollup used by the website.")
    def get(self, request):
        return Response({"results": sector_summary()}, status=status.HTTP_200_OK)


class ExecutiveOverviewView(APIView):
    @extend_schema(summary="Executive overview", description="Public executive KPI summary for the dashboard shell.")
    def get(self, request):
        return Response(executive_overview(), status=status.HTTP_200_OK)


class CompanyFinancialSummaryView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Company financial summary", description="Latest financial snapshot plus current-period summary metrics for one company.")
    def get(self, request, symbol: str):
        payload = company_financial_summary(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyBalanceSheetTrendView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Balance sheet trend", description="Year-wise balance sheet fact rows for one company.")
    def get(self, request, symbol: str):
        payload = balance_sheet_trend(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyCashFlowTrendView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Cash flow trend", description="Year-wise cash flow fact rows for one company.")
    def get(self, request, symbol: str):
        payload = cash_flow_trend(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyHealthScoreView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Health score breakdown", description="Latest overall score, factor scores, and recent score history for one company.")
    def get(self, request, symbol: str):
        payload = health_score_breakdown(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyDocumentsView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Company documents", description="Annual report links and document metadata for one company.")
    def get(self, request, symbol: str):
        payload = company_documents(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyProsConsView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Company pros and cons", description="Qualitative strengths and watchpoints for one company.")
    def get(self, request, symbol: str):
        payload = company_pros_cons(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyPeerComparisonView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Peer comparison", description="Compare the selected company against its sector average and leading/lagging peers.")
    def get(self, request, symbol: str):
        payload = peer_comparison(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class CompanyGrowthAnalyticsView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(summary="Growth analytics", description="Company YoY revenue/profit/EPS growth plus 3Y, 5Y, and 10Y CAGR views computed on the backend.")
    def get(self, request, symbol: str):
        payload = growth_analytics(symbol)
        if not payload:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(payload, status=status.HTTP_200_OK)


class SectorComparisonView(APIView):
    permission_classes = [PartnerApiKeyPermission]

    @extend_schema(
        summary="Sector comparison",
        description="Compare selected sectors across health, revenue, margin, and company-level breakdowns.",
        parameters=[
            OpenApiParameter(
                name="sector",
                description="Repeat or comma-separate sectors to compare. If omitted, all sectors are included.",
                required=False,
                type=str,
                examples=[OpenApiExample("IT and Banking", value="IT,Banking")],
            )
        ],
    )
    def get(self, request):
        raw_values = request.query_params.getlist("sector")
        if len(raw_values) == 1 and "," in raw_values[0]:
            raw_values = [value.strip() for value in raw_values[0].split(",")]
        return Response(sector_comparison(raw_values), status=status.HTTP_200_OK)
