# Generated by Django 3.0.2 on 2020-02-01 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Letter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255)),
                ('content', models.TextField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('recipient', models.CharField(max_length=255)),
                ('title', models.CharField(default='test', max_length=255)),
            ],
        ),
    ]