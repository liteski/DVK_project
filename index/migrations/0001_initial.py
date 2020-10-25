# Generated by Django 3.1.2 on 2020-10-25 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=100)),
                ('street', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CreditCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CVV', models.IntegerField()),
                ('number', models.IntegerField()),
                ('card_holder', models.CharField(max_length=100)),
                ('exp_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('payment_method', models.CharField(choices=[('Cash', 'Cash'), ('Card', 'Card')], max_length=50)),
                ('address_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='index.address')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='index.item')),
            ],
        ),
    ]
