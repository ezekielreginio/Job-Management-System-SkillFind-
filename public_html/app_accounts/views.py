from django.shortcuts import render
from allauth.account.views import SignupView,LoginView
from . import forms as custom_forms

# Create your views here.
class ApplicantLogin(LoginView):
    template_name = 'app_applicant/login.html' #return render(request, template, context)
    view_name = 'applicant_login'

class ApplicantSignup(SignupView):
    template_name = 'app_applicant/signup.html'
    form_class = custom_forms.ApplicantSignupForm
    view_name = 'applicant_signup'

class EmployerLogin(LoginView):
    template_name = 'app_employer/login.html'
    view_name = 'employer_login'

class EmployerSignup(SignupView):
    template_name = 'app_employer/signup.html'
    form_class = custom_forms.EmployerSignupForm
    view_name = 'employer_signup'

#Class Instantiation for Views (REQUIRED)
applicant_login = ApplicantLogin.as_view()
applicant_signup = ApplicantSignup.as_view()
employer_login = EmployerLogin.as_view()
employer_signup = EmployerSignup.as_view()