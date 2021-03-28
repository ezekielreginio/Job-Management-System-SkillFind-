from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('applicant/portfolio', views.applicant_portfolio, name="portfolio"),
    path('applicant/experience', views.applicant_experience, name="experience"),
    path('applicant/experience/edit/<str:pk>/', views.applicant_experience, name="experience_update"),
    path('applicant/experience/delete/<str:pk>/', views.applicant_experience_delete, name="experience_delete"),
    path('applicant/experiencelevel', views.applicant_experience_level, name="experience_level"),
]