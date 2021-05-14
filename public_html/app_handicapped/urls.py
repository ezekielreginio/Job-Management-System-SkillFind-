from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('handicapped/index', views.handicapped_index, name="handicapped_index"),
    path('handicapped/login', views.skillfindpwd_login, name="handicapped_login"),
    path('handicapped/signup', views.handicapped_signup, name="handicapped_signup"),
    path('handicapped/pwd-experience', views.pwd_experience, name="pwd_experience"),
    path('handicapped/pwd-education', views.pwd_education, name="pwd_education"),
    path('handicapped/pwd-skill', views.pwd_skill, name="pwd_skill"),
    path('handicapped/pwd-language', views.pwd_language, name="pwd_language"),
    
   
]