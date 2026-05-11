import os

from rest_framework.permissions import BasePermission


class PartnerApiKeyPermission(BasePermission):
    message = "A valid partner API key is required."

    def has_permission(self, request, view):
        expected = os.getenv("BLUESTOCK_PARTNER_API_KEY", "").strip()
        if not expected:
            return True

        header_key = request.headers.get("X-API-Key", "").strip()
        authorization = request.headers.get("Authorization", "").strip()
        bearer_key = authorization.removeprefix("Bearer ").strip() if authorization.startswith("Bearer ") else ""

        return header_key == expected or bearer_key == expected
