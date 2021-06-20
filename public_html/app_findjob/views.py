from django.core import serializers
from django.shortcuts import redirect, render
from django.db import IntegrityError
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required, user_passes_test

from app_employer_dashboard.models import JobListing
from app_employer_dashboard.serializers import JobListingSerializer

import json

from .models import JobApplication

# Create your views here.
def searchjob(request):
    query = request.GET.get('q')
    queryset = JobListing.objects.filter(job_title__icontains = query).order_by('-id').select_related().values('job_title', 'location', 'job_description', 'id','date_posted', 'employer__company_name')
    context = {'queryset': queryset}
    return render(request, "./app_findjob/search.html", context)

def pwdsearchjob(request):
    query = request.GET.get('q')
    queryset = JobListing.objects.filter(job_title__icontains = query, accept_handicapped='true').order_by('-id').select_related().values('job_title', 'location', 'job_description', 'id','date_posted', 'employer__company_name')
    context = {'queryset': queryset}
    return render(request, "./app_findjob/pwdsearch.html", context)

@login_required(login_url='/login/applicant')
@api_view(['GET', ])
def applyjob(request, job_id):
    try:
        job_listing = JobListing.objects.get(pk=job_id)
        job_application = JobApplication.objects.create(applicant_id=request.user.id, joblisting=job_listing)
        job_application.save()
    except IntegrityError:
        print("Already Exist")
    return redirect('view_applciations')

@login_required(login_url='/login/pwd')
@api_view(['GET', ])
def pwdapplyjob(request, job_id):
    try:
        job_listing = JobListing.objects.get(pk=job_id)
        job_application = JobApplication.objects.create(applicant_id=request.user.id, joblisting=job_listing)
        job_application.save()
    except IntegrityError:
        print("Already Exist")
    return redirect('pwdview_applications')


@login_required(login_url='/login/applicant')
def view_applications(request):
    queryset = JobApplication.objects.filter(applicant_id = request.user.id).order_by('-id').select_related().values('id','joblisting_id','joblisting__job_title', 'joblisting__employer__company_name', 'status')
    context = {'queryset': queryset}
    return render(request, "./app_applicant_portfolio/job_application.html", context)

@login_required(login_url='/login/pwd')
def pwdview_applications(request):
    queryset = JobApplication.objects.filter(applicant_id = request.user.id).order_by('-id').select_related().values('id','joblisting_id','joblisting__job_title', 'joblisting__employer__company_name', 'status')
    context = {'queryset': queryset}
    return render(request, "./app_applicant_portfolio/pwdjob_application.html", context)
# @api_view(['GET', ])
# def searchjob(request):
#     paginator = PageNumberPagination()
#     paginator.page_size = 1
#     person_objects = JobListing.objects.all()
    
#     result_page = paginator.paginate_queryset(person_objects, request)
#     serializer = JobListingSerializer(result_page, many=True)
#     print(paginator.get_paginated_response(serializer.data))
#     context = {}
#     return render(request, "index.html", context) #return render(request, "index.html", context)