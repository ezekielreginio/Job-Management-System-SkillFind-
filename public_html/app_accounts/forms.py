from .models import Employer
from django import forms
from allauth.account.forms import SignupForm, LoginForm
from django.contrib.auth.models import User, Group
from Include import validators
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field

class ApplicantSignupForm(SignupForm):
    first_name = forms.CharField(max_length=15, required=True, strip=True, validators=[validators.validate_alphanumeric])
    last_name = forms.CharField(max_length=15, required=True, strip=True, validators=[validators.validate_alphanumeric])
    user_group = forms.CharField(max_length=15, required=True, strip=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.helper.form_action = '/signup/applicant'
        self.helper.layout = Layout(
            Fieldset(
                '',
                Field('first_name', placeholder='First Name'),
                Field('last_name', placeholder='Last Name'),
                'email',
                'password1',
                'password2',
                Field('user_group', type='hidden', value='applicant'),
            ),
            ButtonHolder(
                Submit('submit', 'Sign Up', css_class='btn btn-primary btn-block')
            )
        )
    
    def save(self, request):
        user = super(ApplicantSignupForm, self).save(request)
        user_group = request.POST.get('user_group', False) #$_POST['user_group']
        add_group(user_group, user)

        return user
        
class EmployerSignupForm(SignupForm):
    company_name = forms.CharField(max_length=30, required=True, strip=True, widget=forms.TextInput(attrs={'placeholder': 'Company Name'}), validators=[validators.validate_alphanumeric ])
    contact_no = forms.CharField(max_length=15, required=True, widget=forms.TextInput(attrs={'placeholder': 'Contact Number'}), validators=[validators.validate_phone ])
    contact_person_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'placeholder': 'Company Person'}), validators=[validators.validate_alphanumeric ])
    user_group = forms.CharField(max_length=15, required=True, strip=True)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.helper.form_action = '/signup/employer'
        self.helper.layout = Layout(
            Fieldset(
                '',
                Field('company_name', placeholder='Company Name', required=True),
                Field('contact_person_name', placeholder='Contact Person', required=True),
                Field('contact_no', placeholder='Contact Number', required=True),
                'email',
                'password1',
                'password2',
                Field('user_group', type='hidden', value='employer'),
            ),
            ButtonHolder(
                Submit('submit', 'Sign Up', css_class='btn btn-primary btn-block')
            )
        )
    
    def save(self, request):
        user = super(EmployerSignupForm, self).save(request)
        user_group = request.POST.get('user_group', False) #$_POST['user_group']
        add_group(user_group, user)
        employer = Employer(
                contact_person=user,
                company_name=self.cleaned_data.get('company_name'),
                contact_no = self.cleaned_data.get('contact_no'),
                contact_person_name = self.cleaned_data.get('contact_person_name')
                )
        employer.save()
        return employer.contact_person
        
class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(CustomLoginForm, self).__init__(*args, **kwargs)

class CustomSignupForm(SignupForm):
    company_name = forms.CharField(max_length=50, required=False, strip=True, widget=forms.TextInput(attrs={'placeholder': 'Company Name', 'required': 'true'}), validators=[validators.validate_alphanumeric, ])
    contact_no = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'placeholder': 'Contact Number', 'required': 'true'}))
    contact_person_name = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'placeholder': 'Company Person', 'required': 'true'}))
    first_name = forms.CharField(max_length=50, required=False, strip=True, widget=forms.TextInput(attrs={'placeholder': 'First Name', 'required': 'true'}))
    last_name = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'placeholder': 'Last Name', 'required': 'true'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False

    def save(self, request):
        user_group = request.POST.get('user_group', False) #$_POST['user_group']
        if(user_group == "employer" or user_group == "applicant"):
            user = super(CustomSignupForm, self).save(request)
            g = Group.objects.get(name=user_group)
            user.groups.add(g)
            if(user_group == "employer"):
                employer = Employer(
                contact_person=user,
                company_name=self.cleaned_data.get('company_name'),
                contact_no = self.cleaned_data.get('contact_no'),
                contact_person_name = self.cleaned_data.get('contact_person_name')
                )
                employer.save()
                
                return employer.contact_person
            else:
                return user

# Form Methods:
def add_group(user_group, user):
    if(user_group == "applicant" or user_group == "employer"):
                g = Group.objects.get(name=user_group)
                user.groups.add(g)
                return user