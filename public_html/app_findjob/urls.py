from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

from . import views

urlpatterns = [
    #path('jobs', views.SearchJob.as_view(), name="search_job"),
    path('findjob', views.searchjob, name="search_job"),
    path('applyjob/<str:job_id>/', views.applyjob, name="apply_job"),
    path('applications', views.view_applications, name="view_applciations")
]