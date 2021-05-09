from django.shortcuts import render
from app_accounts.forms import CustomLoginForm

# Create your views here.
def handicapped_index(request):
    context ={}
    return render(request, "app_handicapped/index.html", context)


def handicapped_login(request, ):
    login_form = CustomLoginForm
    context ={'form': login_form}
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