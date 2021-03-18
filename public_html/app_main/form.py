from allauth.account.forms import forms

class MyCustomSignupForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super(MyCustomSignupForm, self).__init__(*args, **kwargs)
        self.fields['organization'] = forms.CharField(required=True)
    def save(self, request):
        organization = self.cleaned_data.pop('organization')
        ...
        user = super(MyCustomSignupForm, self).save(request)