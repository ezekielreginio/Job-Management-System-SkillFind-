# Generated by Django 3.1.7 on 2021-04-01 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_employer_dashboard', '0002_auto_20210331_1458'),
    ]

    operations = [
        migrations.AddField(
            model_name='joblisting',
            name='job_schedules',
            field=models.JSONField(default=-1.0),
            preserve_default=False,
        ),
    ]
