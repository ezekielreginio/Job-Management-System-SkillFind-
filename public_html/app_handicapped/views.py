from django.core.exceptions import ObjectDoesNotExist
from app_applicant_portfolio.models import Experience, ExperienceLevel, Education, Skill, Language, Resume
from allauth.account.views import SignupView,LoginView
from django.contrib.auth.decorators import login_required, user_passes_test
from . import forms as portfolio_forms
from django.shortcuts import render, redirect
from . import forms as custom_forms
from .forms import PwdSigninForm, PwdSignupForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate


# Create your views here.
@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def handicapped_index(request):
    context ={}
    return render(request, "app_handicapped/index.html", context)

class PwdSignupForm(SignupView):
    template_name = "app_handicapped/signup.html"
    form_class = custom_forms.PwdSignupForm
    view_name = 'handicapped_signup'
    def get_success_url(self):
        return "/handicapped/index"

class PwdSigninForm(LoginView):
    template_name = 'app_handicapped/login.html' #return render(request, template, context)
    view_name = 'handicapped_login'


def skillfindpwd_login(request, level=None):
    form = custom_forms.PwdSigninForm
    errors = {}
    if request.method == "POST":
        form = custom_forms.PwdSigninForm(request.POST)
        email = request.POST.get('login') # $email = $_POST['login']
        password = request.POST.get('password')
        if form.is_valid():
            user = authenticate(request, username=email, password=password)
            u = User.objects.get(email=email)
            if u.groups.filter(name="pwd").exists():
                login(request, user)
                if request.GET.get("next"):
                    return redirect(request.GET.get("next"))
                else:
                    return redirect("/handicapped/index") 
            else:
                errors = {'The e-mail address and/or password you specified are not correct .'}

    context = {'form': form, 'errors': errors}
    return render(request, "app_handicapped/login.html", context)


handicapped_signup = PwdSignupForm.as_view()

handicapped_login = PwdSigninForm.as_view()


@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_experience(request, pk=None):
    experience_form = portfolio_forms.PWDPortfolioExperience
    experience_level_desc = ''
    experience_info = None
    if not pk is None:
        experience_info = Experience.objects.get(id=pk)
        experience_form =portfolio_forms.PWDPortfolioExperience(instance = experience_info)
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

    experience_level_form = portfolio_forms.PWDExperienceLevel(instance=experience_level_obj)

        
    experience_list = None
    if request.method == 'POST':
        experience_form = portfolio_forms.PWDPortfolioExperience(request.POST, instance=experience_info)
        if experience_form.is_valid():
            exp_form = experience_form.save(commit=False)
            exp_form.applicant = request.user
            exp_form.save()
            return redirect('pwd_exp')
    else:
        try:
            experience_list = Experience.objects.all().filter(applicant_id=request.user.id)
        except ObjectDoesNotExist:
            experience_list = None

    context = {'form': experience_form, 'experience_list' : experience_list, 'experience_level_desc': experience_level_desc, 'experience_level_form': experience_level_form}
    return render(request, 'app_handicapped/pwd-experience.html', context)

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_experience_delete(request, pk=None):
    if request.method == "POST":
        experience = Experience.objects.get(id=pk)
        experience.delete()
    return redirect('/handicapped/pwd-eeone')

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_experience_level(request):
    try:
        experience_level = ExperienceLevel.objects.get(applicant_id = request.user.id)
    except ExperienceLevel.DoesNotExist:
        experience_level = None

    if request.method == 'POST':
        experience_level_form = portfolio_forms.PWDExperienceLevel(request.POST, instance=experience_level)
        if experience_level_form.is_valid():
            exp_form = experience_level_form.save(commit=False)
            exp_form.applicant = request.user
            exp_form.save()
            return redirect('/handicapped/pwd-eeone')
    else:
        print("Invalid Access")

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_education(request,op=None, pk=None):
    education_list = Education.objects.all().filter(applicant_id=request.user.id) # "SELECT * FROM Education WHERE applicant_id = ?"
    
    try:
        education_instance = Education.objects.get(id=pk) #SELECT * FROM Education where id=pk
    except Education.DoesNotExist:
        education_instance = None

    education_form = portfolio_forms.PWDEducation(instance=education_instance)
    
    if request.method == "POST":
        if op == 'delete':
            education = Education.objects.get(id=pk)
            education.delete()
            return redirect('pwd_edu')
        else:    
            education_list = None
            education_form = portfolio_forms.PWDEducation(request.POST, instance=education_instance)
            if education_form.is_valid():
                educ_form = education_form.save(commit=False)
                educ_form.applicant = request.user
                educ_form.save()
                
                return redirect('pwd_edu')

    context = {'education_form': education_form,'education_list': education_list}
    return render(request, 'app_handicapped/pwd-education.html', context)

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_skill(request,op=None, pk=None):
    skill_list = Skill.objects.all().filter(applicant_id=request.user.id)
    

    try:
        skill_instance = Skill.objects.get(id=pk) #SELECT * FROM Education where id=pk
    except Skill.DoesNotExist:
        skill_instance = None

    skill_form = portfolio_forms.PWDSkill(instance=skill_instance)
    if request.method == "POST":
        skill_form = portfolio_forms.PWDSkill(request.POST, instance=skill_instance)

        if op == "delete":
            skill = Skill.objects.get(id=pk)
            skill.delete()
            return redirect('pwd_sk')
        else:
            if skill_form.is_valid():
                sk_form = skill_form.save(commit=False)
                sk_form.applicant = request.user
                sk_form.save()
                return redirect('/handicapped/pwd-sltree')

    context = {'skill_form': skill_form, 'skill_list': skill_list}
    return render(request, 'app_handicapped/pwd-skill.html', context)


@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_language(request,op=None, pk=None):
    language_list = Language.objects.all().filter(applicant_id=request.user.id)
    try:
        language_instance = Language.objects.get(id=pk) #SELECT * FROM Education where id=pk
    except Language.DoesNotExist:
        language_instance = None

    language_form = portfolio_forms.PWDLanguage(instance=language_instance)

    if request.method == "POST":
        language_form = portfolio_forms.PWDLanguage(request.POST, instance=language_instance)

        if op == "delete":
            language = Language.objects.get(id=pk)
            language.delete()
            return redirect('pwd_lang')
        else:
            if language_form.is_valid():
                lang_form = language_form.save(commit=False)
                lang_form.applicant = request.user
                lang_form.save()
                return redirect('/handicapped/pwd-llfour')

    context = {'language_form': language_form, 'language_list': language_list}
    return render(request, 'app_handicapped/pwd-language.html', context)

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwdapplicant_resume(request,op=None, pk=None):
    try:
        resume_file = Resume.objects.get(applicant_id=request.user.id)
    except Resume.DoesNotExist:
        resume_file = None

    resume_form = portfolio_forms.PWDApplicantResume(instance=resume_file)
    if request.method == "POST":
        resume_form = portfolio_forms.PWDApplicantResume(request.POST, request.FILES, instance=resume_file)
        if resume_form.is_valid():
            res_form = resume_form.save(commit=False)
            res_form.applicant = request.user
            res_form.save()
            return redirect('/handicapped/resume')

    context = {'resume_form': resume_form}
    return render(request, 'app_handicapped/pwd-resume.html', context)

@login_required(login_url='/handicapped/login')
@user_passes_test(lambda u: u.groups.filter(name='pwd').exists())
def pwd_commandlist(request):
    context = {}
    return render(request,'app_handicapped/pwd-command-list.html', context)