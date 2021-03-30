from django.shortcuts import render
from allauth.account.views import SignupView,LoginView
from django.core.exceptions import ValidationError 
from . import forms as custom_forms
from django.contrib.auth.models import User

# Create your views here.
class ApplicantLogin(LoginView):
    template_name = 'app_applicant/login.html' #return render(request, template, context)
    view_name = 'applicant_login'

class ApplicantSignup(SignupView):
    template_name = 'app_applicant/signup.html'
    form_class = custom_forms.ApplicantSignupForm
    view_name = 'applicant_signup'

def employer_login(request):
    form = custom_forms.CustomLoginForm
    errors = {}
    if request.method == "POST":
        email = request.POST.get('login')
        password = request.POST.get('password')
        try:
            user = User.objects.get(email=email) #SELECT * FROM Education where id=pk
        except User.DoesNotExist:
            form.errors = {'error':'The e-mail address and/or password you specified are not correct.'}


    context = {'form': form, 'errors': errors}
    return render(request, "app_employer/login.html", context)

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