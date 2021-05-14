from django.shortcuts import render, HttpResponse
from django.core import serializers
from django.contrib.auth.models import User
from django.db.models import Q
from django import forms as d_forms
import allauth.account.forms as forms
from django.http import JsonResponse

#Models Import:
from app_accounts import models
from app_main.models import AutoComplete
from app_accounts.models import Employer

import json, datetime

# Create your views here.

def index(request):
    data = {}
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id) 
        user_level = user.groups.get()
        request.session['user_level'] = user_level.name

        if(user_level.name == 'applicant'):
            request.session['user_name'] = user.first_name

        elif(user_level.name == 'pwd'):
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

def autocomplete(request):
    field_name = request.GET.get("fieldname")
    data = AutoComplete.objects.values_list('data', flat=True).filter(field_name = field_name)
    #data = serializers.serialize('json', data)


    if (field_name=="company_name"):
        data = Employer.objects.values_list('company_name', flat=True)   
    
    context = {"data": list(data)}
    return HttpResponse(json.dumps(context), status=200)