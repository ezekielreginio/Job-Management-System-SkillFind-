from .models import Employer
from django import forms
from allauth.account.forms import SignupForm
from django.contrib.auth.models import User, Group

class CustomSignupForm(SignupForm):
    company_name = forms.CharField(max_length=50, required=False, strip=True, widget=forms.TextInput(attrs={'placeholder': 'Company Name', 'required': 'true'}))
    contact_no = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'placeholder': 'Contact Number', 'required': 'true'}))
    contact_person_name = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'placeholder': 'Company Person', 'required': 'true'}))
    first_name = forms.CharField(max_length=50, strip=True, widget=forms.TextInput(attrs={'placeholder': 'First Name', 'required': 'true'}))
    last_name = forms.CharField(max_length=15, widget=forms.TextInput(attrs={'placeholder': 'Last Name', 'required': 'true'}))

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user_group = request.POST.get('user_group', False)
        if(user_group == "employer"):
            employer = Employer(
            contact_person=user,
            company_name=self.cleaned_data.get('company_name'),
            contact_no = self.cleaned_data.get('contact_no'),
            contact_person_name = self.cleaned_data.get('contact_person_name')
            )
            employer.save()
            g = Group.objects.get(name=user_group)
            user.groups.add(g)
            return employer.contact_person
        else:
            return user