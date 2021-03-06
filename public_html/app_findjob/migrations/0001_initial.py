# Generated by Django 3.1.7 on 2021-06-05 14:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app_employer_dashboard', '0008_auto_20210517_1518'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='subject for review', max_length=255)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('joblisting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_employer_dashboard.joblisting')),
            ],
        ),
    ]
