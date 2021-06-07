from django.db import models
from django.contrib.auth.models import User
from storages.backends.dropbox import DropBoxStorage

# Create your models here.
class Experience(models.Model):
    applicant = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    position_title = models.CharField(max_length=50, null=False, blank=False)
    company_name = models.CharField(max_length=50, null=False, blank=False)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)
    specialization = models.CharField(max_length=50, null=False, blank=False)
    role = models.CharField(max_length=50, null=False, blank=False)
    country = models.CharField(max_length=50, null=False, blank=False)
    industry = models.CharField(max_length=50, null=False, blank=False)
    position_level = models.CharField(max_length=50, null=False, blank=False)
    salary_currency = models.CharField(max_length=50, null=False, blank=False)
    salary = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    experience_description = models.TextField(max_length= 3500, null=True, blank=True)

class ExperienceLevel(models.Model):
    applicant = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    experience_level = models.IntegerField(null=False, blank=False)
    duration_year = models.CharField(max_length=4, null=True, blank=True, default=None)
    duration_month = models.CharField(max_length=10, null=True, default=None)

class Education(models.Model):
    applicant = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    university = models.CharField(max_length=100, null=False, blank=False)
    graduation_date = models.DateField(null=False, blank=False)
    qualification = models.CharField(max_length=50, null=False, blank=False)
    university_location = models.CharField(max_length=50, null=False, blank=False)
    field_of_study = models.CharField(max_length=50, null=False, blank=False)
    major = models.CharField(max_length=30, null=False, blank=False)
    grade = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    additional_information = models.TextField(max_length= 3500, null=False, blank=False)

class Skill(models.Model):
    applicant = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    skill = models.CharField(max_length=30, null=False, blank=False)
    proficiency = models.CharField(max_length=30, null=False, blank=False)

class Language(models.Model):
    applicant = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    language = models.CharField(max_length=30, null=False, blank=False)
    proficiency = models.CharField(max_length=30, null=False, blank=False)

class Resume(models.Model):
    applicant = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resume', storage=DropBoxStorage(), null=True, blank=True)