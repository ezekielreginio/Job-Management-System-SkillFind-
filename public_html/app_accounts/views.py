from django.shortcuts import render, redirect
from allauth.account.views import SignupView,LoginView
from django.core.exceptions import ValidationError 
from . import forms as custom_forms
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate

# Create your views here.
class ApplicantLogin(LoginView):
    template_name = 'app_applicant/login.html' #return render(request, template, context)
    view_name = 'applicant_login'

class ApplicantSignup(SignupView):
    template_name = 'app_applicant/signup.html'
    form_class = custom_forms.ApplicantSignupForm
    view_name = 'applicant_signup'

def skillfind_login(request, level=None):
    form = custom_forms.CustomLoginForm
    errors = {}
    if request.method == "POST":
        form = custom_forms.CustomLoginForm(request.POST)
        email = request.POST.get('login') # $email = $_POST['login']
        password = request.POST.get('password')
        if form.is_valid():
            user = authenticate(request, username=email, password=password)
            u = User.objects.get(email=email)
            if u.groups.filter(name=level).exists():
                login(request, user)
                if request.GET.get("next"):
                    return redirect(request.GET.get("next"))
                else:
                    return redirect("/") 
            else:
                errors = {'The e-mail address and/or password you specified are not correct .'}

    context = {'form': form, 'errors': errors}
    return render(request, "app_"+level+"/login.html", context)

# class EmployerLogin(LoginView):
#     template_name = 'app_employer/login.html'
#     view_name = 'employer_login'

class EmployerSignup(SignupView):
    template_name = 'app_employer/signup.html'
    form_class = custom_forms.EmployerSignupForm
    view_name = 'employer_signup'

#Class Instantiation for Views (REQUIRED)
applicant_login = ApplicantLogin.as_view()
applicant_signup = ApplicantSignup.as_view()
# employer_login = EmployerLogin.as_view()
employer_signup = EmployerSignup.as_view()