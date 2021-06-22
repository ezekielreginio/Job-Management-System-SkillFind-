
from django import forms
from allauth.account.forms import SignupForm, LoginForm
from django.contrib.auth.models import User, Group
from Include import validators
from crispy_forms.helper import FormHelper
from django.core.exceptions import ValidationError 
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field, Button, Div, HTML
from Include import validators
from app_applicant_portfolio import models

import re, datetime

class PwdSigninForm(LoginForm):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super(PwdSigninForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id_pwd_login'
        self.fields['login'].label = False
        self.fields['password'].label = False
        self.helper.layout = Layout(
            Fieldset(
                '',
                Field('login', css_class='form-control-lg'),
                Field('password', css_class='form-control-lg'),
            ),
            ButtonHolder(
                Submit('Submit', 'Login', css_class='btn btn-pwd')
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
      self.helper.form_id = 'id_pwd_signup'
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
                Submit('save', 'Sign Up', css_class='btn btn-pwd')
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

   
class DateInput(forms.DateInput):
    input_type = 'date'


class PWDPortfolioExperience(forms.ModelForm):
    position_title = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Position Title'}))
    company_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Company Name'}))
    start_date = forms.DateField(required=True, widget=DateInput)
    end_date = forms.DateField(required=True, widget=DateInput)
    specialization = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Specialization'}))
    role = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Role'}))
    country = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Country'}))
    industry = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Industry'}))
    position_level = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Position Level'}))
    salary_currency = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ], widget=forms.TextInput(attrs={'placeholder': 'Salary Currency'}))
    salary = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_money ], widget=forms.TextInput(attrs={'placeholder': 'Salary'}))
    experience_description = forms.CharField(max_length=3500, widget=forms.Textarea(attrs={'placeholder': 'Experience'}))

    class Meta:
        model = models.Experience
        exclude=('applicant',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id_pwd_exp'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('Submit', 'Save', css_class='btn-primary btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-experience-form"))

    def clean_end_date(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get("start_date")
        end_date = cleaned_data.get("end_date")

        format = "%Y-%m-%d"
        try:
            if datetime.datetime.strptime(str(start_date), format) > datetime.datetime.strptime(str(end_date), format):
                raise ValidationError("Invalid Dates, End Date Should Be Later than the Starting Date" )
        except ValueError:
            error = 'Invalid Dates'
        # reg = re.compile("^[a-zA-Z0-9 .,-_]*$")
        # if not reg.match(position_title):
        #     raise ValidationError("Invalid Input, Please Try Again")
        return end_date

class PWDExperienceLevel(forms.ModelForm):
    class Meta:
        model = models.ExperienceLevel
        exclude=('applicant', )
    CHOICES = [('2', 'I am a fresh graduate seeking my first job'), ('3', 'I am a student seeking internship or part-time jobs'), ('1', 'I have been working since')]
    experience_level = forms.ChoiceField(widget=forms.RadioSelect, choices=CHOICES)
    duration_year = forms.CharField(max_length=4, required=False, widget=forms.TextInput(attrs={'placeholder': 'Year'}))
    duration_month = forms.CharField(max_length=12, required=False, widget=forms.TextInput(attrs={'placeholder': 'Month'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['duration_year'].label = " "
        # self.fields['duration_month'].label = " "
        self.helper = FormHelper()
        self.helper.form_id = 'experiencelevel-form'
        self.helper.form_show_labels = False
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-3 text-right'
        self.helper.form_action = '/handicapped/pwd-exp'
        self.fields['experience_level'].widget.attrs.update({
            'class': 'option-input radio'
        })
        self.helper.add_input(Submit('save', 'Save', css_class='experiencelevel-save-btn btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-danger-dark text-white', css_id="cancel-experiencelevel-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div(HTML(""" <label for="id_experience_level_0" class="text-right requiredField">
                Experience level<span class="asteriskField">*</span> </label> """), css_class='col-3'),
                    Div('experience_level', css_class='col-8'),
                    css_class='row',
                ),
                Div(
                    Div(
                        css_class="col-3"
                    ),
                    Div(
                        'duration_year', css_class="col-2 mr-2",
                    ),
                    Div(
                        'duration_month', css_class="col-2",
                    ),
                    css_class='row d-none',
                    css_id='experience-duration',
                ),
            ),
        )
        
class PWDEducation(forms.ModelForm):
    graduation_date = forms.DateField(widget=DateInput)
    university = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'University'}))
    qualification = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Qualification'}))
    university_location = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'University Location'}))
    field_of_study = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Field of Study'}))
    major = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Major'}))
    grade = forms.DecimalField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Grade'}))
    additional_information = forms.CharField(max_length=3500, widget=forms.Textarea(attrs={'placeholder': 'Addition Information'}))
    class Meta:
        model = models.Education
        #fields = '__all__'
        exclude = ('applicant', )
   

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id_pwd_edu'
        self.helper.form_action = '/handicapped/pwd-edu'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('save', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-education-form"))


class PWDSkill(forms.ModelForm):
    skill = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Skill Name'}))
    proficiency = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Proficiency'}))

    class Meta:
        model = models.Skill
        exclude = ('applicant', )

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.form_id = 'id_pwd_sk'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('Submit', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('/handicapped/pwd-sk', 'Cancel', css_class='btn-danger-dark', css_id="cancel-skill-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div(HTML(''' <h5>Add Skill</h5> '''), css_class="col-12 pl-0"),
                    Div(
                        'skill', css_class="col-3 mr-2",
                    ),
                    Div(
                        'proficiency', css_class="col-3",
                    ),
                    css_class='row',
                ),
            ),
        )

class PWDLanguage(forms.ModelForm):
    language = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Language'}))
    proficiency = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Proficiency'}))

    class Meta:
        model = models.Language
        exclude = ('applicant', )

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id_pwd_lang'
        self.helper.form_class = 'form-horizontal'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('Submit', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('/handicapped/pwd-lang', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-language-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div(HTML(''' <h5 class="text-white">Add Language</h5> '''), css_class="col-12 pl-0"),
                    Div(
                        'language', css_class="col-3 mr-2",
                    ),
                    Div(
                        'proficiency', css_class="col-3",
                    ),
                    css_class='row',
                ),
            ),
        )

class PWDApplicantResume(forms.ModelForm):
    class Meta:
        model = models.Resume
        exclude = ('applicant', )

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('submit', 'Upload Now', css_class='btn-applicant'))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div(HTML(''' <h5 class="text-white">Upload Your Resume</h5> '''), css_class="col-12 pl-0"),
                    Div(
                        'resume', css_class="col-6 mr-2",
                    ),
                    css_class='row',
                ),
            ),
        )