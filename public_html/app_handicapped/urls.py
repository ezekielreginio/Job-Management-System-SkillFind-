from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('handicapped/index', views.handicapped_index, name="handicapped_index"),
   
]