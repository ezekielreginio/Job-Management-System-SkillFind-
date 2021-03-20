from django.db import models
from allauth.account.signals import user_signed_up
from django.contrib.auth.models import Group
from django.dispatch import receiver

# Create your models here.
@receiver(user_signed_up)
def user_signed_up_(sender, request, user, **kwargs):
    g = Group.objects.get(name='applicant')
    user.groups.add(g)