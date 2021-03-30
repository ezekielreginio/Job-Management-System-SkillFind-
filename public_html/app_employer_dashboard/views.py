from django.shortcuts import render

# Create your views here.
def employer_dashboard(request):
    context ={}
    return render(request, "app_employer_dashboard/index.html", context)