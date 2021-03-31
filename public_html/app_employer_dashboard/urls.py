from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    path('employer/dashboard', views.employer_dashboard, name="employer_dashboard"),
    path('employer/addjob', views.employer_addjob, name="employer_addjob"),
]