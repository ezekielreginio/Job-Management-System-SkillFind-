# Generated by Django 3.1.7 on 2021-04-25 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='autocomplete',
            name='data',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
