from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import bootstrap_payload, executive_overview, get_company, list_companies, sector_summary


class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok", "service": "bluestock-iq-api"}, status=status.HTTP_200_OK)


class BootstrapView(APIView):
    def get(self, request):
        return Response(bootstrap_payload(), status=status.HTTP_200_OK)


class CompanyListView(APIView):
    def get(self, request):
        sector = request.query_params.get("sector")
        return Response({"results": list_companies(sector=sector)}, status=status.HTTP_200_OK)


class CompanyDetailView(APIView):
    def get(self, request, symbol: str):
        company = get_company(symbol)
        if not company:
            return Response({"detail": "Company not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(company, status=status.HTTP_200_OK)


class SectorSummaryView(APIView):
    def get(self, request):
        return Response({"results": sector_summary()}, status=status.HTTP_200_OK)


class ExecutiveOverviewView(APIView):
    def get(self, request):
        return Response(executive_overview(), status=status.HTTP_200_OK)

