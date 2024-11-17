from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class BanViewSet(ModelViewSet):
    queryset = Ban.objects.all()
    serializer_class = BanSerializer

# Tương tự cho các bảng khác

