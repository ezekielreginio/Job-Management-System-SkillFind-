# Generated by Django 3.1.7 on 2021-03-25 04:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_applicant_portfolio', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experience',
            old_name='applicant_id',
            new_name='applicant',
        ),
    ]
