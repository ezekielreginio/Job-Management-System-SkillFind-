from django.shortcuts import render

# Create your views here.
def handicapped_index(request):
    context ={}
    return render(request, "app_handicapped/index.html", context)