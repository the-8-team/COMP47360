# Generated by Django 2.2.2 on 2019-06-20 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stop',
            fields=[
                ('stop_id', models.IntegerField(primary_key=True, serialize=False)),
                ('stop_lat', models.FloatField()),
                ('stop_lon', models.FloatField()),
                ('stop_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'stops',
            },
        ),
    ]