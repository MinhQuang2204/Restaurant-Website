# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Customer(models.Model):
    email = models.CharField(primary_key=True, max_length=100)
    fullname = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'customer'


class Diningtable(models.Model):
    tableid = models.AutoField(primary_key=True)
    seats = models.IntegerField()
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diningtable'


class Dish(models.Model):
    dishid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'dish'


class Dishdetail(models.Model):
    detailid = models.AutoField(primary_key=True)
    reservationid = models.ForeignKey('Reservation', models.DO_NOTHING, db_column='reservationid')
    dishid = models.ForeignKey(Dish, models.DO_NOTHING, db_column='dishid')
    quantity = models.IntegerField()
    totalprice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dishdetail'


class Reservation(models.Model):
    reservationid = models.AutoField(primary_key=True)
    email = models.ForeignKey(Customer, models.DO_NOTHING, db_column='email')
    tableid = models.ForeignKey(Diningtable, models.DO_NOTHING, db_column='tableid')
    date = models.DateField()
    timeslot = models.TimeField()
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation'
        unique_together = (('tableid', 'date', 'timeslot'),)
