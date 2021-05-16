from rest_framework import serializers

from .models import JobListing
from app_accounts.models import Employer

class EmployerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Employer
        fields = '__all__'

class JobListingSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer(read_only = True)

    class Meta:
        model = JobListing
        fields = '__all__'