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
class EmployerAddJobListing(forms.ModelForm):
    DEMO_CHOICES =(
        ("1", "Naveen"),
        ("2", "Pranav"),
        ("3", "Isha"),
        ("4", "Saloni"),
    )
    contract_type = forms.MultipleChoiceField(choices=DEMO_CHOICES, widget=forms.CheckboxSelectMultiple)
    supplemental_pay = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    benefits = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_experience_type = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_minimum_education_level = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_licenses = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_languages = forms.MultipleChoiceField(choices=DEMO_CHOICES)

    class Meta:
        model = models.JobListing
        exclude=('applicant',)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        # self.helper.form_class = 'form-horizontal'
        # self.helper.label_class = 'col-3 text-right text-white'
        # self.helper.field_class = 'col-8'
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger', css_id="cancel-experience-form"))
    