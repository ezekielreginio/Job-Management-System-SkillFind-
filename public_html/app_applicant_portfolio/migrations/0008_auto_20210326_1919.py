# Generated by Django 3.1.7 on 2021-03-26 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_applicant_portfolio', '0007_auto_20210326_1718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiencelevel',
            name='duration_year',
            field=models.IntegerField(blank=True, max_length=4, null=True),
        ),
    ]
