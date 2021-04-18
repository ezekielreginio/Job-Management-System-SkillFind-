from django.shortcuts import render
from django.contrib.auth.models import User
from django import forms as d_forms
import allauth.account.forms as forms

#Models Import:
from app_accounts import models

# Create your views here.

def index(request):
    data = {}
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id) 
        user_level = user.groups.get()
        request.session['user_level'] = user_level.name

        if(user_level.name == 'applicant'):
            request.session['user_name'] = user.first_name
        
        elif(user_level.name == 'employer'):
            try:
                employer_info = models.Employer.objects.get(contact_person_id=request.user.id)
            except models.Employer.DoesNotExist:
                employer_info = None
            request.session['user_name'] = employer_info.contact_person_name
            request.session['company_name'] = employer_info.company_name

    context = {'data': data}
    return render(request, "index.html", context)

def base(request):
    context = {}
    return render(request, "base.html", context)