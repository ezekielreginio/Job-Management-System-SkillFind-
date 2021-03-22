from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('login/applicant', views.applicant_login),
    path('signup/applicant', views.applicant_signup),
    path('login/employer', views.employer_login),
    path('signup/employer', views.employer_signup),
    # path('signup/applicant', views.signup, name="base"),
    # path('login/employer', views.login, name="base"),
    # path('signup/employer', views.signup, name="base"),
]