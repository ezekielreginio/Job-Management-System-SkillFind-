from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class JobListing(models.Model):
    employer = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=50, null=False, blank=False)
    location = models.CharField(max_length=50, null=False, blank=False)
    remote = models.CharField(max_length=50, null=False, blank=False)
    accept_handicapped = models.CharField(max_length=5, null=False, blank=False)
    accepted_handicapped_types = models.JSONField(null=True, blank=True)
    hires_needed = models.IntegerField(null=False, blank=False)

    employment_type = models.CharField(max_length=15, null=False, blank=False)
    contract_type = models.JSONField(null=False, blank=False)
    job_schedules = models.JSONField(null=False, blank=False)
    start_date = models.DateField(null=True, blank=True)

    compensation_range = models.CharField(max_length=20, null=False, blank=False)
    initial_salary = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False)
    max_salary = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    supplemental_pay = models.JSONField(null=True, blank=True)
    benefits = models.JSONField(null=True, blank=True)

    application_type = models.CharField(max_length=20, null=False, blank=False)
    application_resume = models.CharField(max_length=25, null=False, blank=False)
    application_deadline = models.DateField(null=True, blank=True)
    application_email_recepient = models.EmailField(null=False, blank=False)
    job_description = models.TextField(max_length=3500, null=False, blank=False)

    qualification_experience = models.JSONField(null=True, blank=True)

    qualification_education = models.JSONField(null=True, blank=True)

    qualification_location = models.CharField(max_length=25, null=True, blank=True)

    qualification_license = models.JSONField(null=True, blank=True)

    qualification_language = models.JSONField(null=True, blank=True)

    is_active = models.BooleanField(null=False, blank=False, default=True)