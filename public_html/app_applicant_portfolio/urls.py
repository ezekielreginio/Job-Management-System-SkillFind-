from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('applicant/portfolio', views.applicant_portfolio),
]