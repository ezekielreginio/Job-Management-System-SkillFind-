# Generated by Django 3.1.7 on 2021-03-25 09:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app_applicant_portfolio', '0003_auto_20210325_1244'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='applicant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
