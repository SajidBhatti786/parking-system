# Generated by Django 4.2.5 on 2023-09-19 07:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parkingspace',
            old_name='Availability',
            new_name='is_available',
        ),
        migrations.RenameField(
            model_name='parkingspace',
            old_name='SpaceNumber',
            new_name='space_number',
        ),
    ]
