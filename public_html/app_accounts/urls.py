from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    #path('login/applicant', views.applicant_login),
    path('signup/applicant', views.applicant_signup),
    path('login/<str:level>/', views.skillfind_login),
    path('signup/employer', views.employer_signup),
]