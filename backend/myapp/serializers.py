from rest_framework import serializers
from .models import *

class BanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ban
        fields = '__all__'

class KhachHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Khachhang
        fields = '__all__'

class MonAnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monan
        fields = '__all__'

class ChiTietMonAnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chitietmonan
        fields = '__all__'

class DatBanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datban
        fields = '__all__'

# Tương tự cho các bảng khác
