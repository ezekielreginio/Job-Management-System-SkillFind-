from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import ObjectDoesNotExist
from django.views.generic.edit import FormView

from . import forms as portfolio_forms
from .models import Experience

import datetime

# Create your views here.
@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_portfolio(request):
    context = {}
    return render(request, 'app_applicant_portfolio/home.html', context)

def applicant_experience(request):
    experience_form = portfolio_forms.ApplicantPortfolioExperience
    if request.method == 'POST':
        experience_form = portfolio_forms.ApplicantPortfolioExperience(request.POST)
        if experience_form.is_valid():
            exp_form = experience_form.save(commit=False)
            exp_form.applicant = request.user
            exp_form.save()
            return redirect('/applicant/experience')
    else:
        try:
            experience_list = Experience.objects.all().filter(applicant_id=request.user.id)
        except ObjectDoesNotExist:
            experience_list = None

        context = {'form': experience_form, 'experience_list' : experience_list}
        return render(request, 'app_applicant_portfolio/experience.html', context)


