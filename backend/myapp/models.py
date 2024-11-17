from django.db import models

class Ban(models.Model):
    maban = models.AutoField(primary_key=True)
    soghe = models.IntegerField()
    tinhtrang = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ban'

class Khachhang(models.Model):
    makh = models.AutoField(primary_key=True)
    hoten = models.CharField(max_length=100)
    sdt = models.CharField(max_length=15)
    email = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'khachhang'

class Monan(models.Model):
    mamon = models.AutoField(primary_key=True)
    tenmon = models.CharField(max_length=100)
    gia = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'monan'


class Chitietmonan(models.Model):
    machitiet = models.AutoField(primary_key=True)
    madatban = models.ForeignKey('Datban', models.DO_NOTHING, db_column='madatban')
    mamon = models.ForeignKey('Monan', models.DO_NOTHING, db_column='mamon')
    soluong = models.IntegerField()
    thanhtien = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'chitietmonan'


class Datban(models.Model):
    madatban = models.AutoField(primary_key=True)
    makh = models.ForeignKey('Khachhang', models.DO_NOTHING, db_column='makh')
    maban = models.ForeignKey(Ban, models.DO_NOTHING, db_column='maban')
    ngay = models.DateField()
    khunggio = models.TimeField()
    trangthai = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'datban'
        unique_together = (('maban', 'ngay', 'khunggio'),)
