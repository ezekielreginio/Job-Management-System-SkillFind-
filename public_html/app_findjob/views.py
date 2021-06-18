from django.core import serializers
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.decorators import api_view

from app_employer_dashboard.models import JobListing
from app_employer_dashboard.serializers import JobListingSerializer

import json

# Create your views here.
def searchjob(request):
    query = request.GET.get('q')
    queryset = JobListing.objects.filter(job_title__icontains = query).order_by('-id').select_related().values('job_title', 'location', 'job_description', 'id','date_posted', 'employer__company_name')
    context = {'queryset': queryset}
    return render(request, "./app_findjob/search.html", context)

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