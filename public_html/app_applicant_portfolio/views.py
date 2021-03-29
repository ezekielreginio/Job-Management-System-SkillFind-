from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.decorators import method_decorator
from django.core.exceptions import ObjectDoesNotExist
from django.views.generic.edit import FormView

from . import forms as portfolio_forms
from .models import Experience, ExperienceLevel, Education, Skill

import datetime

# Create your views here.
@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_portfolio(request):
    context = {}
    return render(request, 'app_applicant_portfolio/home.html', context)

@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_experience(request, pk=None):
    experience_form = portfolio_forms.ApplicantPortfolioExperience
    experience_level_desc = ''
    experience_info = None
    if not pk is None:
        experience_info = Experience.objects.get(id=pk)
        experience_form =portfolio_forms.ApplicantPortfolioExperience(instance=experience_info)
    try:
        experience_level_obj = ExperienceLevel.objects.get(applicant_id = request.user.id)
        experience_level = experience_level_obj.experience_level
    
        if experience_level == 2:
            experience_level_desc = 'Fresh Graduate/Entry Level'
        elif experience_level == 3:
            experience_level_desc = 'Student Seeking Internship or Part-Time Jobs'
        elif experience_level == 1:
            experience_level_desc = 'Has Working Experience Since '+experience_level_obj.duration_month+' '+experience_level_obj.duration_year
    
    except ExperienceLevel.DoesNotExist:
        experience_level_obj = None
        experience_level_desc = "None"

    experience_level_form = portfolio_forms.ApplicantExperienceLevel(instance=experience_level_obj)

        
    experience_list = None
    if request.method == 'POST':
        experience_form = portfolio_forms.ApplicantPortfolioExperience(request.POST, instance=experience_info)
        if experience_form.is_valid():
            exp_form = experience_form.save(commit=False)
            exp_form.applicant = request.user
            exp_form.save()
            return redirect('experience')
    else:
        try:
            experience_list = Experience.objects.all().filter(applicant_id=request.user.id)
        except ObjectDoesNotExist:
            experience_list = None

    context = {'form': experience_form, 'experience_list' : experience_list, 'experience_level_desc': experience_level_desc, 'experience_level_form': experience_level_form}
    return render(request, 'app_applicant_portfolio/experience.html', context)

@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_experience_delete(request, pk=None):
    if request.method == "POST":
        experience = Experience.objects.get(id=pk)
        experience.delete()
    return redirect('/applicant/experience')

@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_experience_level(request):
    try:
        experience_level = ExperienceLevel.objects.get(applicant_id = request.user.id)
    except ExperienceLevel.DoesNotExist:
        experience_level = None

    if request.method == 'POST':
        experience_level_form = portfolio_forms.ApplicantExperienceLevel(request.POST, instance=experience_level)
        if experience_level_form.is_valid():
            exp_form = experience_level_form.save(commit=False)
            exp_form.applicant = request.user
            exp_form.save()
            return redirect('/applicant/experience')
    else:
        print("Invalid Access")

@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_education(request,op=None, pk=None):
    education_list = Education.objects.all().filter(applicant_id=request.user.id) # "SELECT * FROM Education WHERE applicant_id = ?"
    
    try:
        education_instance = Education.objects.get(id=pk) #SELECT * FROM Education where id=pk
    except Education.DoesNotExist:
        education_instance = None

    education_form = portfolio_forms.ApplicantEducation(instance=education_instance)
    
    if request.method == "POST":
        if op == 'delete':
            education_form = portfolio_forms.ApplicantEducation
            education = Education.objects.get(id=pk)
            education.delete()
        else:    
            education_list = None
            education_form = portfolio_forms.ApplicantEducation(request.POST, instance=education_instance)
            if education_form.is_valid():
                educ_form = education_form.save(commit=False)
                educ_form.applicant = request.user
                educ_form.save()
                
                return redirect('education')

    context = {'education_form': education_form,'education_list': education_list}
    return render(request, 'app_applicant_portfolio/education.html', context)

@login_required(login_url='/login/applicant')
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_skills(request,op=None, pk=None):
    skill_list = Skill.objects.all().filter(applicant_id=request.user.id)
    

    try:
        skill_instance = Skill.objects.get(id=pk) #SELECT * FROM Education where id=pk
    except Skill.DoesNotExist:
        skill_instance = None

    skill_form = portfolio_forms.ApplicantSkill(instance=skill_instance)
    if request.method == "POST":
        skill_form = portfolio_forms.ApplicantSkill(request.POST, instance=skill_instance)

        if op == "delete":
            print("delete")
            skill_form = portfolio_forms.ApplicantSkill
            skill = Skill.objects.get(id=pk)
            skill.delete()
        else:
            if skill_form.is_valid():
                sk_form = skill_form.save(commit=False)
                sk_form.applicant = request.user
                sk_form.save()
                return redirect('/applicant/skills')

    context = {'skill_form': skill_form, 'skill_list': skill_list}
    return render(request, 'app_applicant_portfolio/skills.html', context)