from django.shortcuts import render, redirect
from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from . import forms as employer_forms

from .models import JobListing
from app_accounts.models import Employer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import JobListingSerializer

import json

# Create your views here.
@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def employer_dashboard(request):
    context ={}
    return render(request, "app_employer_dashboard/dashboard.html", context)

@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def employer_jobspanel(request):
    job_list = JobListing.objects.filter(employer = request.user.id)
    context ={"job_list": job_list}
    return render(request, "app_employer_dashboard/jobspanel.html", context)


@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def employer_addjob(request, pk=None):
    addjob_form = employer_forms.EmployerAddJobListing
    job_info = None
    if not pk is None:
        job_info = JobListing.objects.get(id=pk)
        addjob_form = employer_forms.EmployerAddJobListing(instance=job_info)

    if request.method == 'POST':
        request_data_qualifications = request.POST.get("qualifications")
        addjob_form = employer_forms.EmployerAddJobListing(request.POST, instance=job_info)
        
        if addjob_form.is_valid():
            add_form = addjob_form.save(commit=False)
            add_form.employer = Employer.objects.get(contact_person = request.user.id)
            add_form.qualification = json.loads(request_data_qualifications)
            addjob_form.save()
            return HttpResponse(status=200)
        else:
            print(addjob_form.errors)
    else:
        context ={
                'addjob_form' : addjob_form,
            }
        return render(request, "app_employer_dashboard/addjob.html", context)


@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def request_qualifications(request, pk=None):
    qualification_data = {
        'qualification_experience': {},
        'qualification_education': {},
        'qualification_location': None,
        'qualification_licenses': {},
        'qualification_languages': {},
    }
    
    job_info = JobListing.objects.get(id=pk)
    qualification_data = job_info.qualifications
    # qualification_data['qualification_experience'] = job_info.qualification_experience
    # qualification_data['qualification_education'] = job_info.qualification_education
    # qualification_data['qualification_location'] = job_info.qualification_location
    # qualification_data['qualification_licenses'] = job_info.qualification_license
    # qualification_data['qualification_languages'] = job_info.qualification_language
    return JsonResponse(qualification_data, status=200)

@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def update_jobstatus(request, pk=None):
    status = json.load(request)['status']
    job_info = JobListing.objects.get(id=pk)
    if(status == "Active"):
        job_info.is_active = "Active"
    elif (status == "Inactive"):
        job_info.is_active = "Inactive"
    job_info.save()
    response = {'status': status}
    return JsonResponse(response, status=200)

#REST APIs
@api_view(['GET', ])
def api_view_joblisting(request):
    try:
        job_list = JobListing.objects.get(id=1)
        print(job_list)
    except JobListing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if(request.method == "GET"):
        serializer = JobListingSerializer(job_list)
        context={"serial":serializer.data}
        print(serializer.data)
        return render(request, "index.html", context)
        #return Response(serializer.data)