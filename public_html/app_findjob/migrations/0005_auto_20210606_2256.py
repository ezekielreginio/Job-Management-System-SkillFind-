# Generated by Django 3.1.7 on 2021-06-06 14:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app_employer_dashboard', '0008_auto_20210517_1518'),
        ('app_findjob', '0004_auto_20210606_2255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='applicant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='jobapplication',
            name='joblisting',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_employer_dashboard.joblisting'),
        ),
        migrations.AlterUniqueTogether(
            name='jobapplication',
            unique_together={('joblisting', 'applicant')},
        ),
    ]