from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

from . import views

urlpatterns = [
    path('employer/dashboard', views.employer_dashboard, name="employer_dashboard"),
    path('employer/jobspanel', views.employer_jobspanel, name="employer_jobspanel"),
    path('employer/addjob', views.employer_addjob, name="employer_addjob"),

    path('login/employer/password_reset/', PasswordResetView.as_view(template_name='app_employer/password-reset.html'), name='password_reset'),
    path('employer/password_reset/done/', PasswordResetDoneView.as_view(template_name='app_employer/password-reset-done.html'), name='password_reset_done'),
    path('employer/password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='app_employer/password-reset-confirm.html'), name='password_reset_confirm'),
    path('employer/password_reset_complete/', PasswordResetCompleteView.as_view(template_name='app_employer/password-reset-complete.html'), name='password_reset_complete'),

]