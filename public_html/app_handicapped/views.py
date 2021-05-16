from allauth.account.views import SignupView,LoginView
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


def pwd_experience(request):
    context ={}
    return render(request, "app_handicapped/pwd-experience.html", context)

def pwd_education(request):
    context ={}
    return render(request, "app_handicapped/pwd-education.html", context)

def pwd_skill(request):
    context ={}
    return render(request, "app_handicapped/pwd-skill.html", context)

def pwd_language(request):
    context ={}
    return render(request, "app_handicapped/pwd-language.html", context)

def pwd_portfolio(request):
    context ={}
    return render(request, "app_handicapped/pwd-portfolio.html", context)

handicapped_signup = PwdSignupForm.as_view()

handicapped_login = PwdSigninForm.as_view()

