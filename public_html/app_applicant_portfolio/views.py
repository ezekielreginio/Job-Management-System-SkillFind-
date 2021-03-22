from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
# from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin 
from django.views.generic.edit import FormView

# Create your views here.
@login_required
@user_passes_test(lambda u: u.groups.filter(name='applicant').exists())
def applicant_portfolio(request):
    context = {}
    return render(request, 'app_applicant_portfolio/home.html', context)

# class ApplicantPortfolio(LoginRequiredMixin, UserPassesTestMixin, FormView):
#     template_name = 'app_applicant_portfolio/home.html'
#     view_name = 'applicant_portfolio'
#     form_class = None

#     def test_func(self):
#         return self.request.user.groups.filter(name='applicant').exists()

# applicant_portfolio = ApplicantPortfolio.as_view()