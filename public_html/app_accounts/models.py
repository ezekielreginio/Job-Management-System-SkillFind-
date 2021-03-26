from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Employer(models.Model):
    contact_person = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=50, null=False, blank=False)
    contact_no = models.CharField(max_length=15, null=True)
    contact_person_name = models.CharField(max_length=50, null=True)
