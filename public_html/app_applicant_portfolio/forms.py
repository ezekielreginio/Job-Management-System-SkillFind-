from . import models
from django import forms
from allauth.account.forms import SignupForm
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError 
from Include import validators
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field, Button, Div, HTML
from Include import validators

import re, datetime

class DateInput(forms.DateInput):
    input_type = 'date'

class ApplicantPortfolioExperience(forms.ModelForm):
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
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-3 text-right'
        self.helper.field_class = 'col-8'
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary btn-applicant'))
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

class ApplicantExperienceLevel(forms.ModelForm):
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
        self.helper.form_action = '/applicant/experiencelevel'
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

class ApplicantEducation(forms.ModelForm):
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
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-3 text-right text-white'
        self.helper.field_class = 'col-8'
        self.helper.add_input(Submit('save', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-education-form"))

class ApplicantSkill(forms.ModelForm):
    skill = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Skill Name'}))
    proficiency = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Proficiency'}))

    class Meta:
        model = models.Skill
        exclude = ('applicant', )

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('/applicant/skills', 'Cancel', css_class='btn-danger-dark', css_id="cancel-skill-form"))
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

class ApplicantLanguage(forms.ModelForm):
    language = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Language'}))
    proficiency = forms.CharField(max_length=50, required=True, validators=[validators.validate_alphanumeric], widget=forms.TextInput(attrs={'placeholder': 'Proficiency'}))

    class Meta:
        model = models.Language
        exclude = ('applicant', )

    def __init__(self, *args, **kwargs): #constructor
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.form_show_labels = False
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-applicant'))
        self.helper.add_input(Button('/applicant/languages', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-language-form"))
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

class ApplicantResume(forms.ModelForm):
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


class ApplicantPersonalInfo(forms.ModelForm):
    firstname = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    lastname = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    birthday = forms.DateField(required=True, widget=DateInput)
    place_of_birth = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    gender = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    resident_address = forms.CharField(max_length=100, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    zip_code = forms.CharField(required=True, strip=True, validators=[validators.validate_alphanumeric ])
    telephone_no = forms.CharField(required=True, strip=True, validators=[validators.validate_alphanumeric ])
    cellphone_no = forms.CharField(required=True, strip=True)
    civilstatus = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    citizenship = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    gsis_id_no = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    pagibig_id_no = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])
    philhealth_no = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_money ])
    sss_no = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_money ])
    tin = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_money ])
    spouse_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ]) 
    mother_name =  forms.CharField(max_length=50, required=True, strip=True,validators=[validators.validate_alphanumeric ])
    father_name = forms.CharField(max_length=50, required=True, strip=True, validators=[validators.validate_alphanumeric ])

    class Meta:
        model = models.Personalinfo
        exclude=('applicant',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.label_class = 'col-3 text-right text-white'
        self.helper.field_class = 'col-8'
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary btn-applicant'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger-dark', css_id="cancel-experience-form"))
        

    