# Generated by Django 3.1.7 on 2021-03-26 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_applicant_portfolio', '0008_auto_20210326_1919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiencelevel',
            name='duration_year',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
    ]
