from rest_framework import serializers
from .models import *

class DiningtableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diningtable
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class DishdetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dishdetail
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

