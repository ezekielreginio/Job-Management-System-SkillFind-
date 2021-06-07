from django.core.exceptions import ObjectDoesNotExist
from app_applicant_portfolio.models import Experience, ExperienceLevel, Education
from allauth.account.views import SignupView,LoginView
from django.contrib.auth.decorators import login_required, user_passes_test
from . import forms as portfolio_forms
from django.shortcuts import render, redirect
from . import forms as custom_forms
from .forms import PwdSigninForm, PwdSignupForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate


# Create your views here.
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




def pwd_skill(request):
    context ={}
    return render(request, "app_handicapped/pwd-skill.html", context)

def pwd_language(request):
    context ={}
    return render(request, "app_handicapped/pwd-language.html", context)



handicapped_signup = PwdSignupForm.as_view()

handicapped_login = PwdSigninForm.as_view()


@login_required(login_url='/login/pwd')
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
            return redirect('pwd_experience')
    else:
        try:
            experience_list = Experience.objects.all().filter(applicant_id=request.user.id)
        except ObjectDoesNotExist:
            experience_list = None

    context = {'form': experience_form, 'experience_list' : experience_list, 'experience_level_desc': experience_level_desc, 'experience_level_form': experience_level_form}
    return render(request, 'app_handicapped/pwd-experience.html', context)

@login_required(login_url='/login/pwd')
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
            return redirect('education')
        else:    
            education_list = None
            education_form = portfolio_forms.PWDEducation(request.POST, instance=education_instance)
            if education_form.is_valid():
                educ_form = education_form.save(commit=False)
                educ_form.applicant = request.user
                educ_form.save()
                
                return redirect('pwd_education')

    context = {'education_form': education_form,'education_list': education_list}
    return render(request, 'app_handicapped/pwd-education.html', context)