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

    NO_YES = (
        ("false", "NO"),
        ("true", "YES"),
        
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

    COMPENSATION_RANGE = (
        ("Range", "Range"),
        ("Starting at", "Starting at"),
        ("Up to", "Up to"),
        ("Exact Rate", "Exact Rate"),
    )

    DEMO_CHOICES = (
        ("Sample", "Sample"),
    )

    HANDICAPPED_TYPES = (
        ("Blind", "Blind"),
        ("Legally Blind", "Legally Blind"),
        ("Locomotor Disability (Hands)", "Locomotor Disability (Hands)"),
        ("Locomotor Disability (Feet/Legs)", "Locomotor Disability (Feet/Legs)"),
        ("Hearing Impairment", "Hearing Impairment"),
        ("Speech and Language Disability", "Speech and Language Disability"),
        ("Intellectual Disability", "Intellectual Disability"),
    )

    SUPPLEMENTAL_PAY = (
        ("13th month salary", "13th month salary"),
        ("Overtime pay", "Overtime pay"),
        ("Commission pay", "Commission pay"),
        ("Yearly bonus", "Yearly bonus"),
        ("Bonus pay", "Bonus pay"),
        ("Performance bonus", "Performance bonus"),
        ("Tips", "Tips"),
        ("Quarterly bonus", "Quarterly bonus"),
        ("Anniversary bonus", "Anniversary bonus"),
        ("Other", "Other"),
        ("None", "None"),
    )

    BENEFITS = (
        ("Paid training", "Paid training"),
        ("Work from home", "Work from home"),
        ("On-site parking", "On-site parking"),
        ("Flexible schedule", "Flexible schedule"),
        ("Discounted lunch", "Discounted lunch"),
        ("Employee discount", "Employee discount"),
        ("Paid toll fees", "Paid toll fees"),
        ("Company events", "Company events"),
        ("Gym membership", "Gym membership"),
        ("Health insurance", "Health insurance"),
        ("Additional leave", "Additional leave"),
        ("Free parking", "Free parking"),
        ("Company car", "Company car"),
        ("Company Christmas gift", "Company Christmas gift"),
        ("Life insurance", "Life insurance"),
        ("Fuel discount", "Fuel discount"),
        ("Employee stock ownership plan", "Employee stock ownership plan"),
        ("Others", "Others"),
        ("None", "None"),
    )

    APPLICATION_TYPE = (
        ("Email" ,"Email"),
        ("In-Person" ,"In-Person"),
    )

    REQUIRED_QUALIFICATION = (
        ("Required", "Required"),
        ("Preferred", "Preferred"),
    )

    EMPLOYMENT_TYPE = (
        ("Full-time Job", "Full-time Job"),
        ("Part-time Job", "Part-time Job"),    
    )

    CHOICES = [('2', 'Temporarily due to COVID-19'), ('3', 'Yes'), ('1', 'No')]
    accept_handicapped = forms.ChoiceField(choices=NO_YES)
    accepted_handicapped_types = forms.MultipleChoiceField(choices=HANDICAPPED_TYPES,required=False, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'False'}))
    contract_type = forms.MultipleChoiceField(choices=CONTRACT_TYPE, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    job_schedules = forms.MultipleChoiceField(choices=SCHEDULES, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    date_prompt = forms.ChoiceField(choices=NO_YES)
    
    initial_salary = forms.DecimalField(widget=forms.NumberInput(attrs={'placeholder': 'From: (E.g. 10000.00)'}))
    max_salary = forms.DecimalField(required=False,widget=forms.NumberInput(attrs={'placeholder': '(E.g. 50000.00)'}))
    supplemental_pay = forms.MultipleChoiceField(choices=SUPPLEMENTAL_PAY, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    benefits = forms.MultipleChoiceField(choices=BENEFITS, widget=forms.CheckboxSelectMultiple(attrs={'data-required': 'True'}))
    remote = forms.ChoiceField(choices=CHOICES)
    application_type = forms.ChoiceField(choices=APPLICATION_TYPE)
    application_resume = forms.ChoiceField(choices=YES_NO)

    employment_type = forms.ChoiceField(choices=EMPLOYMENT_TYPE)

    application_deadline = forms.DateField(widget=DateInput)
    


    # qualification_experience_type = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    # qualification_minimum_education_level = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    # qualification_licenses = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    # qualification_languages = forms.MultipleChoiceField(choices=DEMO_CHOICES)
    
    compensation_range = forms.ChoiceField(choices=COMPENSATION_RANGE)

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
        self.fields['initial_salary'].label = ""
        self.fields['max_salary'].label = ""
        self.fields['application_type'].label = "How do you want to receive applications?"
        self.fields['application_resume'].label = "Is there an application deadline?"
        self.fields['application_email_recepient'].label = "Daily updates about this job and candidates will be sent to:"
        self.helper.form_id = "form-add-job"
        self.helper.add_input(Submit('submit', 'Save', css_class='btn-primary d-none'))
        self.helper.add_input(Button('cancel', 'Cancel', css_class='btn-primary btn-danger d-none', css_id="cancel-experience-form"))
        self.helper.layout = Layout(
            Fieldset(
                '',
                Div( #Page 1
                    'job_title',
                    'location',
                    'remote',
                    'accept_handicapped',
                    'accepted_handicapped_types',
                    'hires_needed',
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-next-job pull-right" data-next-page="p2-add-job">Next Page</button> """),
                    css_class='pages-add-job',
                    css_id='p1-add-job',
                ),
                Div( #Page 2
                    'employment_type',
                    'contract_type',
                    'job_schedules',
                    'date_prompt',
                    'start_date',
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-prev-job pull-left" data-prev-page="p1-add-job">Previous Page</button> """),
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-next-job pull-right" data-next-page="p3-add-job">Next Page</button> """),
                    css_class='pages-add-job d-none',
                    css_id='p2-add-job',
                ),
                Div( #Page 3
                    'compensation_range',
                    Div(
                        'initial_salary',
                        HTML(''' <span class="align-middle p-2">TO</span> '''),
                        'max_salary',
                        css_class="d-flex flex-row d-none"
                    ),
                    'supplemental_pay',
                    'benefits',
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-prev-job pull-left" data-prev-page="p2-add-job">Previous Page</button> """),
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-next-job pull-right" data-next-page="p4-add-job">Next Page</button> """),
                    css_class='pages-add-job d-none',
                    css_id='p3-add-job',
                ),
                Div( #Page 4
                    'application_type',
                    'application_resume',
                    'application_deadline',
                    'application_email_recepient',
                    'job_description',
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-prev-job pull-left" data-prev-page="p3-add-job">Previous Page</button> """),
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-next-job pull-right" data-next-page="p5-add-job">Next Page</button> """),
                    css_class='pages-add-job d-none',
                    css_id='p4-add-job',
                ),
                Div( #Page 5
                    HTML("""
                        <div class="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Qualification
                            </button>
                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" id="dropdown-add-qualification">
                                <a class="dropdown-item" href="#">Experience</a>
                                <a class="dropdown-item" href="#">Education</a>
                                <a class="dropdown-item" href="#">Location</a>
                                <a class="dropdown-item" href="#">License</a>
                                <a class="dropdown-item" href="#">Language</a>
                            </div>
                        </div>
                        
                        <div class="container" id="p5-container">
                            <div class="qualification-template d-none my-3">
                                <div>
                                    <h5><span id="qualification-header">Experience</span> <i class="fas fa-times float-right pr-3 pt-2 pointer" name="card-close"></i></h5>
                                </div>
                                <hr style="background-color: white">
                                <div id="qualification-body"> 
                                    <h6>Minimum of <input type="text" class="custom-form-input m-2 p-2" name="year"> of <input type="text" class="p-2 custom-form-input m-2" name="experience">  Experience</h6>
                                </div>
                                <div id="qualification-footer">
                                    <h5>Is this qualification required?</h5>
                                    <select name="required-preferred" class="select form-control custom-select w-50" id="id_application_resume"> 
                                        <option value="true">Required</option> 
                                        <option value="false">Preferred</option>
                                    </select>
                                </div>
                            </div>
                            <div class="qualification-template card-primary-theme-p5 my-3" name="qualification-experience"> <div> <h5><span id="qualification-header">Experience</span> <i class="fas fa-times float-right pr-3 pt-2 pointer" name="card-close" aria-hidden="true"></i></h5> </div> <hr style="background-color: white"> <div id="qualification-body"> <h6>Minimum of <input type="text" class="custom-form-input m-2 p-2" name="year"> of <input type="text" class="p-2 custom-form-input m-2" name="experience">  Experience</h6> </div> <div id="qualification-footer"> <h5>Is this qualification required?</h5> <select name="required-preferred" class="select form-control custom-select w-50" id="id_application_resume"> <option value="true">Required</option> <option value="false">Preferred</option> </select> </div> </div>
                        </div>
                        
                        
                    """),
                    HTML(""" <button type="button" name="" id="" class="btn btn-applicant btn-prev-job pull-left" data-prev-page="p4-add-job">Previous Page</button> """),
                    HTML(""" <button type="button" name="" id="btn-post-job" class="btn btn-secondary pull-right">Post Job</button> """),
                    css_class='pages-add-job d-none',
                    css_id='p5-add-job',
                ),
            ),
        )