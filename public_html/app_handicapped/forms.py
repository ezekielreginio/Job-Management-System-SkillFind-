
from django import forms
from allauth.account.forms import SignupForm, LoginForm
from django.contrib.auth.models import User, Group
from Include import validators
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field

class PwdSigninForm(LoginForm):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(PwdSigninForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields['login'].label = False
        self.fields['password'].label = False
        self.helper.layout = Layout(
            Fieldset(
                '',
                Field('login', css_class='form-control-lg'),
                Field('password', css_class='form-control-lg'),
            ),
            ButtonHolder(
                Submit('submit', 'Login', css_class='btn btn-pwd')
            )
        )
        

class PwdSignupForm(SignupForm):
    first_name = forms.CharField(max_length=15, required=True, strip=True, validators=[validators.validate_alphanumeric])
    last_name = forms.CharField(max_length=15, required=True, strip=True, validators=[validators.validate_alphanumeric])
    user_group = forms.CharField(max_length=15, required=True, strip=True)
    def __init__(self, *args, **kwargs):
      self.request = kwargs.pop('request', None)
      super(PwdSignupForm, self).__init__(*args, **kwargs)
      self.helper = FormHelper()
      self.helper.form_show_labels = False
      self.helper.form_action = '/handicapped/signup'
      self.helper.layout = Layout(
            Fieldset(
                '',
                Field('first_name', placeholder='First Name', css_class='form form-control-lg'),
                Field('last_name', placeholder='Last Name', css_class='form form-control-lg'),
                Field('email', css_class='form form-control-lg'),
                Field('password1', css_class='form form-control-lg'),
                Field('password2', css_class='form form-control-lg'),
                Field('user_group', type='hidden', value='pwd'),
            ),
            ButtonHolder(
                Submit('submit', 'Sign Up', css_class='btn btn-pwd')
            )
        )

    def save(self, request):
        user = super
        user = super(PwdSignupForm, self).save(request)
        user_group = request.POST.get('user_group', False) #$_POST['user_group']
        add_group(user_group, user)


        return user

def add_group(user_group, user):
    if(user_group == "applicant" or user_group == "employer" or user_group == "pwd"):
                g = Group.objects.get(name=user_group)
                user.groups.add(g)
                return user   
      