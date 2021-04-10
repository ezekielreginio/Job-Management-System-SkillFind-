# Generated by Django 3.1.7 on 2021-04-10 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='JobListing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('remote', models.CharField(max_length=50)),
                ('hires_needed', models.IntegerField()),
                ('employment_type', models.CharField(max_length=15)),
                ('contract_type', models.JSONField()),
                ('job_schedules', models.JSONField()),
                ('start_date', models.DateField(blank=True, null=True)),
                ('compensation_range', models.CharField(max_length=20)),
                ('initial_salary', models.DecimalField(decimal_places=2, max_digits=13)),
                ('max_salary', models.DecimalField(blank=True, decimal_places=2, max_digits=13, null=True)),
                ('supplemental_pay', models.JSONField(blank=True, null=True)),
                ('benefits', models.JSONField(blank=True, null=True)),
                ('application_type', models.CharField(max_length=20)),
                ('application_resume', models.BooleanField()),
                ('application_deadline', models.DateField(blank=True, null=True)),
                ('application_email_recepient', models.EmailField(max_length=254)),
                ('job_description', models.TextField(max_length=3500)),
                ('qualification_experience_type', models.JSONField(blank=True, null=True)),
                ('qualification_experience_required', models.BooleanField(blank=True, null=True)),
                ('qualification_minimum_education_level', models.JSONField(blank=True, null=True)),
                ('qualification_education_required', models.BooleanField(blank=True, null=True)),
                ('qualification_location_required', models.BooleanField(blank=True, null=True)),
                ('qualification_licenses', models.JSONField(blank=True, null=True)),
                ('qualification_license_required', models.BooleanField(blank=True, null=True)),
                ('qualification_languages', models.JSONField(blank=True, null=True)),
                ('qualification_languages_required', models.BooleanField(blank=True, null=True)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
