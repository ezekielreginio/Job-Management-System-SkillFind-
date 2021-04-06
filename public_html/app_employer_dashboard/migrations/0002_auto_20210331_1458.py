# Generated by Django 3.1.7 on 2021-03-31 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_employer_dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='qualification_education_required',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_experience_required',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_experience_type',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_languages',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_languages_required',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_license_required',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_licenses',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_location_required',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='qualification_minimum_education_level',
            field=models.JSONField(blank=True, null=True),
        ),
    ]