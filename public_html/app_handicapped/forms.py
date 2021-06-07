
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

   
class DateInput(forms.DateInput):
    input_type = 'date'


class PWDPortfolioExperience(forms.ModelForm):
    position_title = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    company_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    start_date = forms.DateField(required=True, widget=DateInput)
    end_date = forms.DateField(required=True, widget=DateInput)
    specialization = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    role = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    country = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    industry = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    position_level = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    salary_currency = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    salary = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_money ])
    experience_description = forms.CharField(max_length=3500, widget=forms.Textarea)

    class Meta:
        model = models.Experience
        exclude=('applicant',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-experience-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div( 
                    Field('position_title', css_class='pwd-input', placeholder="Position Title"),
                    Field('company_name', css_class='pwd-input', placeholder="Company Name"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('start_date', css_class='pwd-input', placeholder="Start Date"),
                    Field('end_date', css_class='pwd-input', placeholder="End Date"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('specialization', css_class='pwd-input', placeholder="Specialization"),
                    Field('role', css_class='pwd-input', placeholder="Role"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('country', css_class='pwd-input', placeholder="Country"),
                    Field('industry', css_class='pwd-input', placeholder="Industry"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('position_level', css_class='pwd-input', placeholder="Position Level"),
                    Field('salary_currency', css_class='pwd-input', placeholder="Salary Currency"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('salary', css_class='pwd-input', placeholder="Salary"),
                    Field('experience_description', css_class='pwd-input', placeholder="Experience Description"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ), 
                 css_class='row d-flex justify-content-center'
                ),
               
            ),
        )

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
        self.helper.form_action = '/handicapped/pwd-experience'
        self.fields['experience_level'].widget.attrs.update({
            'class': 'option-input radio'
        })
        self.helper.add_input(Submit('save', 'Save', css_class='experiencelevel-save-btn btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-danger-dark text-white', css_id="cancel-experiencelevel-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div(HTML(""" <label class="title">Experience Level*</label> """), 
                    css_class='col-3'
                    ),
                    Div( HTML(""" 
                          <label>
							<input type="radio" class="option-input radio" name="experience_level" id="id_experience_level_3" value="3" />
								I am a fresh graduate seeking my first job
						  </label>
                          <label>
							<input type="radio" class="option-input radio" name="experience_level" id="id_experience_level_2" value="2" />
								I am a student seeking internship or part-time jobs
						  </label>
                          <label>
							<input type="radio" class="option-input radio" name="experience_level" id="id_experience_level_1" value="1" />
								I have been working since
						  </label>
                          """),
                    Div(
                    Div(
                    Div(
                    HTML(""" <section class="input-container">
                                <label class="pwd-label">
                                <input class="pwd-in" type="text" placeholder="year" name="duration_year">
                                <span class="pwd-span">year</span>
                                </label>
                             </section> """),
                    css_class='col'    
                    ),
                    Div(
                    HTML(""" <section class="input-container">
                                <label class="pwd-label">
                                <input class="pwd-in" type="text" placeholder="month" name="duration_month">
                                <span class="pwd-span">month</span>
                                </label>
                             </section> """),
                    css_class='col'    
                    ),
                    css_class='row'    
                    ),
                    css_class='container'    
                    ),
                    css_class='col-9'
                    ),
                 css_class='row d-flex justify-content-center'
                ),
               
            ),
        )
        
class PWDEducation(forms.ModelForm):
    graduation_date = forms.DateField(widget=DateInput)
    university = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric])
    qualification = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric])
    university_location = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric])
    field_of_study = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric])
    major = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric])
    grade = forms.DecimalField(required=True)

    class Meta:
        model = models.Education
        #fields = '__all__'
        exclude = ('applicant', )
   

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_action = '/handicapped/pwd-education'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('save', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-education-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    Div( 
                    Field('graduation_date', css_class='pwd-input', placeholder="Graduation Date"),
                    Field('university', css_class='pwd-input', placeholder="University"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('qualification', css_class='pwd-input', placeholder="Qualification"),
                    Field('university_location', css_class='pwd-input', placeholder="University Location"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('field_of_study', css_class='pwd-input', placeholder="Field of Study"),
                    Field('major', css_class='pwd-input', placeholder="Major"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                    Div( 
                    Field('grade', css_class='pwd-input', placeholder="Grade"),
                    css_class='col container-fluid d-flex justify-content-center'
                    ),
                 css_class='row d-flex justify-content-center'
                ),
               
            ),
        )