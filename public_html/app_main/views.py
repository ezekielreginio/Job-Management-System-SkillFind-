from django.shortcuts import render
from django import forms as d_forms
import allauth.account.forms as forms
# Create your views here.

def index(request):
    form_login = forms.LoginForm()
    context = {'form': form_login}
    return render(request, "index.html", context)