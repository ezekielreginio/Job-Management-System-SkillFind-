from django.shortcuts import render, redirect
from django.core import serializers
from django.http import JsonResponse, HttpResponse, FileResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from . import forms as employer_forms

from .models import JobListing
from app_accounts.models import Employer
from app_findjob.models import JobApplication
from app_applicant_portfolio.models import Resume

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView

from .serializers import JobListingSerializer

import json
import dropbox

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

@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def view_applicants(request,pk):
    job_list = JobListing.objects.get(id=pk)
    queryset = JobApplication.objects.filter(joblisting_id=job_list).order_by('-id').select_related().values('applicant__first_name', 'applicant__last_name', 'status', 'applicant__resume__resume', 'applicant_id')
    context = {'queryset': queryset, 'job_title': job_list.job_title}
    print(context)
    return render(request, "app_employer_dashboard/applicantslist.html", context)

@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def get_resume(request, pk):
    resume = Resume.objects.get(applicant_id=pk)
    print(str(resume.resume))
    dbx = dropbox.Dropbox('L-u71KTIt0UAAAAAAAAAAWTj6W9E7Ko7RUTerWQLxQv3r7JMy_NhnebvStvkS3Nr')

    
    with open("Sample.pdf", "wb+") as f:
        metadata,res = dbx.files_download(str(resume.resume))   
        # f = open('Sample.pdf', 'wb+')
        # f.write(res.content)
        return HttpResponse(res.content, content_type='application/pdf')
    

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

class request_jobquery(ListAPIView):
    serializer_class = JobListingSerializer
    def get_queryset(self):
        id = self.request.GET.get("id")
        return JobListing.objects.filter(id=id)

# @api_view(['GET', ])
# def request_jobquery(request, pk=None):
#     try:
#         job = JobListing.objects.filter(id=pk)
#     except JobListing.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     print(job.job_title)
#     if(request.method == "GET"):
#         serializer = JobListingSerializer(job)
#         return Response(serializer.data)