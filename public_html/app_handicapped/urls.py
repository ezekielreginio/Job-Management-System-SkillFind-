from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from . import views

urlpatterns = [

    
    path('handicapped/index', views.handicapped_index, name="handicapped_index"),
    path('handicapped/login', views.skillfindpwd_login, name="handicapped_login"),
    path('handicapped/signup', views.handicapped_signup, name="handicapped_signup"),
    
    path('handicapped/pwd-eeone', views.pwd_experience, name="pwd_exp"),
    path('handicapped/pwd-eeone/edit/<str:pk>/', views.pwd_experience, name="pwd_experience_update"),
    path('handicapped/pwd-eeone/delete/<str:pk>/', views.pwd_experience_delete, name="pwd_experience_delete"),
    path('handicapped/level', views.pwd_experience_level, name="pwd_experience_level"),
    
    path('handicapped/pwd-edtwo', views.pwd_education, name="pwd_edu"),
    path('handicapped/pwd-edtwo/edit/<str:pk>/', views.pwd_education, name="pwd_education_update"),
    path('handicapped/pwd-edtwo/<str:op>/<str:pk>/', views.pwd_education, name="pwd_education_delete"),

    path('handicapped/pwd-sltree', views.pwd_skill, name="pwd_sk"),
    path('handicapped/pwd-sltree/edit/<str:pk>/', views.pwd_skill, name="pwd_skills_update"),
    path('handicapped/pwd-sltree/<str:op>/<str:pk>/', views.pwd_skill, name="pwd_skills_delete"),

    path('handicapped/pwd-llfour', views.pwd_language, name="pwd_lang"),
    path('handicapped/pwd-llfour/edit/<str:pk>/', views.pwd_language, name="pwd_languages_edit"),
    path('handicapped/pwd-llfour/<str:op>/<str:pk>/', views.pwd_language, name="pwd_languages_delete"),

    path('handicapped/resume', views.pwdapplicant_resume, name="pwdresume"),
    path('handicapped/commands', views.pwd_commandlist, name="pwdcommands"),
    
    path('login/handicapped/password_reset/', PasswordResetView.as_view(template_name='app_handicapped/pwd-password-reset.html'), name='password_reset'),
    path('handicapped/password_reset/done/', PasswordResetDoneView.as_view(template_name='app_handicapped/pwd-password-reset-done.html'), name='password_reset_done'),
    path('handicapped/password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name='app_handicapped/pwd-password-reset-confirm.html'), name='password_reset_confirm'),
    path('handicapped/password_reset_complete/', PasswordResetCompleteView.as_view(template_name='app_handicapped/pwd-password-reset-complete.html'), name='password_reset_complete'),
   
]