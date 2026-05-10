from django.urls import path

from .views import FrontendView

urlpatterns = [
    path("", FrontendView.as_view(), name="frontend-home"),
]

