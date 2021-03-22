from django.shortcuts import render
from django import forms as d_forms
import allauth.account.forms as forms
# Create your views here.

def index(request):
    context = {}
    return render(request, "index.html", context)

def base(request):
    context = {}
    return render(request, "base.html", context)