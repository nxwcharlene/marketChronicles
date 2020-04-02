# Generated by Django 3.0.4 on 2020-04-02 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('macro', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MacroInput',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Security', models.CharField(max_length=100)),
                ('Indicator', models.CharField(max_length=100)),
                ('Direction', models.CharField(max_length=100)),
                ('Magnitude', models.CharField(max_length=100)),
            ],
        ),
    ]
