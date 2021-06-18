from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('applicant/portfolio', views.applicant_portfolio, name="portfolio"),
    
    path('applicant/experience', views.applicant_experience, name="experience"),
    path('applicant/experience/edit/<str:pk>/', views.applicant_experience, name="experience_update"),
    path('applicant/experience/delete/<str:pk>/', views.applicant_experience_delete, name="experience_delete"),
    path('applicant/experiencelevel', views.applicant_experience_level, name="experience_level"),

    path('applicant/education', views.applicant_education, name="education"),
    path('applicant/education/edit/<str:pk>/', views.applicant_education, name="education_update"),
    path('applicant/education/<str:op>/<str:pk>/', views.applicant_education, name="education_delete"),

    path('applicant/skills', views.applicant_skills, name="skills"),
    path('applicant/skills/edit/<str:pk>/', views.applicant_skills, name="skills_update"),
    path('applicant/skills/<str:op>/<str:pk>/', views.applicant_skills, name="skills_delete"),

    path('applicant/languages', views.applicant_languages, name="languages"),
    path('applicant/languages/edit/<str:pk>/', views.applicant_languages, name="languages_edit"),
    path('applicant/languages/<str:op>/<str:pk>/', views.applicant_languages, name="languages_delete"),
    
    path('applicant/personal_info/', views.applicant_personal_info, name="applicant_personal_info"),
    path('applicant/personal_info/edit/<str:pk>/', views.applicant_personal_info, name="personalinfo_update"),

    path('applicant/resume', views.applicant_resume, name="resume"),
    
    path('login/applicant/password_reset/', PasswordResetView.as_view(template_name='app_applicant/password-reset.html'), name='password_reset'),
    path('applicant/password_reset/done/', PasswordResetDoneView.as_view(template_name='app_applicant/password-reset-done.html'), name='password_reset_done'),
    path('applicant/password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='app_applicant/password-reset-confirm.html'), name='password_reset_confirm'),
    path('applicant/password_reset_complete/', PasswordResetCompleteView.as_view(template_name='app_applicant/password-reset-complete.html'), name='password_reset_complete'),

    path('applicant/oauth/', include('social_django.urls', namespace='social')),  # <-- here
]