# Generated by Django 3.1.7 on 2021-06-06 14:55

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_employer_dashboard', '0008_auto_20210517_1518'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app_findjob', '0002_auto_20210606_2246'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='jobapplication',
            unique_together={('joblisting', 'applicant')},
        ),
    ]
