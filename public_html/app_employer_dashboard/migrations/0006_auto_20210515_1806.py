# Generated by Django 3.1.7 on 2021-05-15 10:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_accounts', '0001_initial'),
        ('app_employer_dashboard', '0005_auto_20210507_1350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joblisting',
            name='employer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_accounts.employer'),
        ),
    ]
