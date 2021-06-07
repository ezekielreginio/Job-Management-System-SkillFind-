from django.db import models

from app_employer_dashboard.models import JobListing
from django.contrib.auth.models import User 
# Create your models here.
class JobApplication(models.Model):
    joblisting = models.ForeignKey(JobListing, null=False, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, null=False, blank=False, default="subject for review")

    class Meta:
        unique_together = (('joblisting', 'applicant'))