from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

from . import views

urlpatterns = [
    #path('jobs', views.SearchJob.as_view(), name="search_job"),
    path('jobs', views.searchjob, name="search_job"),
]