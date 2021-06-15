from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

from . import views

urlpatterns = [
    path('employer/dashboard', views.employer_dashboard, name="employer_dashboard"),
    path('employer/jobspanel', views.employer_jobspanel, name="employer_jobspanel"),
    path('employer/addjob', views.employer_addjob, name="employer_addjob"),
    path('employer/addjob/<str:pk>/addjob', views.employer_addjob, name="employer_updatejob"),
    path('employer/addjob/<str:pk>/', views.employer_addjob, name="employer_updatejob"),

    path('employer/viewapplicants/<str:pk>/', views.view_applicants, name="employer_viewapplicants"),
    path('employer/viewresume/<str:pk>/', views.get_resume, name="employer_viewresume"),
    path('updateapplication/', views.update_application_status, name="update_application_status" ),

    path('ajax/requestqualifications/<str:pk>', views.request_qualifications, name='request_qualification'),
    path('ajax/updatejoblistingstatus/<str:pk>/', views.update_jobstatus, name='update_jobstatus'),
    path('ajax/jobquery', views.request_jobquery.as_view(), name='job_query'),

    path('login/employer/password_reset/', PasswordResetView.as_view(template_name='app_employer/password-reset.html'), name='password_reset'),
    path('employer/password_reset/done/', PasswordResetDoneView.as_view(template_name='app_employer/password-reset-done.html'), name='password_reset_done'),
    path('employer/password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='app_employer/password-reset-confirm.html'), name='password_reset_confirm'),
    path('employer/password_reset_complete/', PasswordResetCompleteView.as_view(template_name='app_employer/password-reset-complete.html'), name='password_reset_complete'),

    path('joblistings/view/', views.api_view_joblisting, name='request_joblisting'),
]