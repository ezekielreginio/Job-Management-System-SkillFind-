from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from . import forms as employer_forms

# Create your views here.
@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def employer_dashboard(request):
    context ={}
    return render(request, "app_employer_dashboard/dashboard.html", context)

@login_required(login_url='/login/employer')
@user_passes_test(lambda u: u.groups.filter(name='employer').exists())
def employer_addjob(request):
    addjob_form = employer_forms.EmployerAddJobListing

    if request.method == 'POST':
        addjob_form = employer_forms.EmployerAddJobListing(request.POST)
        if addjob_form.is_valid():
            add_form = addjob_form.save(commit=False)
            add_form.applicant = request.user
            add_form.save()
            return redirect('employer_addjob')

    context ={'addjob_form' : addjob_form}
    return render(request, "app_employer_dashboard/addjob.html", context)