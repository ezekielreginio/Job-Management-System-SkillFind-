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
    CONTRACT_TYPE = (
        ("1", "Temporary"),
        ("2", "Contract"),
        ("3", "Internship"),
        ("4", "Commission"),
        ("5", "New Grad"),
        ("6", "Permanent"),
    )

    YES_NO = (
        ("true", "YES"),
        ("false", "NO"),
    )

    SCHEDULES = (
        ("8 hour shift", "8 hour shift"),
        ("10 hour shift", "10 hour shift"),
        ("12 hour shift", "12 hour shift"),
        ("Shift system", "Shift system"),
        ("Early shift", "Early shift"),
        ("Day shift", "Day shift"),
        ("Afternoon shift", "Afternoon shift"),
        ("Evening shift", "Evening shift"),
        ("Late shift", "Late shift"),
        ("Night shift", "Night shift"),
        ("Flexible shift", "Flexible shift"),
        ("Rotational shift", "Rotational shift"),
        ("Monday to Friday", "Monday to Friday"),
        ("Holidays", "Holidays"),
        ("Weekends", "Weekends"),
        ("Overtime", "Overtime"),
        ("On call", "On call"),
        ("Others", "Others"),
    )

    DEMO_CHOICES =(
        ("1", "Naveen"),
        ("2", "Pranav"),
        ("3", "Isha"),
        ("4", "Saloni"),
    )
    contract_type = forms.MultipleChoiceField(choices=CONTRACT_TYPE, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    job_schedules = forms.MultipleChoiceField(choices=SCHEDULES, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    date_prompt = forms.ChoiceField(choices=YES_NO, widget=forms.RadioSelect)
    supplemental_pay = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    benefits = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_experience_type = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_minimum_education_level = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_licenses = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    qualification_languages = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    
    class Meta:
        model = models.JobListing
        exclude=('employer',)
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        # self.helper.form_class = 'form-horizontal'
        # self.helper.label_class = 'col-3 text-right text-white'
        # self.helper.field_class = 'col-8'

        #labels
        self.fields['date_prompt'].label = "Is there a planned start date for this job?"
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary d-none'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger d-none', css_id="cancel-experience-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div(
                    'job_title',
                    'location',
                    'remote',
                    'hires_needed',
                    HTML(""" <button type="button" name="" id="" class="btn btn-primary btn-next-job pull-right" data-next-page="p2-add-job">Next Page</button> """),
                    css_class='pages-add-job',
                    css_id='p1-add-job',
                ),
                Div(
                    'employment_type',
                    'contract_type',
                    'job_schedules',
                    'date_prompt',
                    'start_date',
                    HTML(""" <button type="button" name="" id="" class="btn btn-primary btn-prev-job pull-left" data-prev-page="p1-add-job">Previous Page</button> """),
                    HTML(""" <button type="button" name="" id="" class="btn btn-primary btn-next-job pull-right" data-next-page="p3-add-job">Next Page</button> """),
                    css_class='pages-add-job d-none',
                    css_id='p2-add-job',
                ),
            ),
        )