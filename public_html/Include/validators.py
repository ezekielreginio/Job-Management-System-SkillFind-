from django.core.exceptions import ValidationError 
import re
def validate_alphanumeric(value):
    reg = re.compile("^[a-zA-Z0-9 .,-_]*$")
    if not reg.match(value):
        raise ValidationError("Invalid Input, Please Try Again")

def validate_phone(value):
    reg = re.compile("^[0-9-]*$")
    if not reg.match(value):
        raise ValidationError("This field should only contain numbers (e.g. 09166554451)")

def check_empty(value):
    if value in [None, '']:
        return True
    else:
        return False
