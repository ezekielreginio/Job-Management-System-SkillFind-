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

# Create your views here.
class SearchJob(ListAPIView):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter, )
    search_fields = ('job_title', )
    
@api_view(['GET', ])
def searchjob(request):
    paginator = PageNumberPagination()
    paginator.page_size = 1
    person_objects = JobListing.objects.all()
    
    result_page = paginator.paginate_queryset(person_objects, request)
    serializer = JobListingSerializer(result_page, many=True)
    print(paginator.get_paginated_response(serializer.data))
    context = {}
    return render(request, "index.html", context) #return render(request, "index.html", context)