from . import models
from django import forms
from allauth.account.forms import SignupForm
from django.contrib.auth.models import User, Group
from Include import validators
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field, Button

class ApplicantPortfolioExperience(forms.ModelForm):
    position_title = forms.CharField(max_length=50, required=True, strip=True)
    company_name = forms.CharField(max_length=50, required=True, strip=True)
    start_date = forms.DateField(required=True)
    end_date = forms.DateField(required=True)
    specialization = forms.CharField(max_length=50, required=True, strip=True)
    role = forms.CharField(max_length=50, required=True, strip=True)
    country = forms.CharField(max_length=50, required=True, strip=True)
    industry = forms.CharField(max_length=50, required=True, strip=True)
    position_level = forms.CharField(max_length=50, required=True, strip=True)
    salary_currency = forms.CharField(max_length=50, required=True, strip=True)
    salary = forms.CharField(max_length=50, required=True, strip=True)
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
        self.helper.form_action = '/applicant/experience'
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger', css_id="cancel-experience-form"))
        