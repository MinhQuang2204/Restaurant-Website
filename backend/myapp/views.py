from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class BanViewSet(ModelViewSet):
    queryset = Ban.objects.all()
    serializer_class = BanSerializer

class KhachHangViewSet(ModelViewSet):
    queryset = Khachhang.objects.all()
    serializer_class = KhachHangSerializer

class MonAnViewSet (ModelViewSet) :
    queryset = Monan.objects.all()
    serializer_class = MonAnSerializer

class ChiTietMonAnViewSet (ModelViewSet) :
    queryset = Chitietmonan.objects.all()
    serializer_class = ChiTietMonAnSerializer

class DatBanViewSet (ModelViewSet) :
    queryset = Datban.objects.all()
    serializer_class = DatBanSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime

@api_view(['POST'])
def find_table(request):
    try:
        # Lấy dữ liệu từ request
        soghe = request.data.get('soghe')
        ngay = request.data.get('ngay')
        khunggio = request.data.get('khunggio')

        if not soghe or not ngay or not khunggio:
            return Response({"error": "Thiếu thông tin số ghế, ngày hoặc khung giờ!"}, status=400)
        
        # Lọc các bàn có số ghế phù hợp
        tables = Ban.objects.filter(soghe__gte=soghe)

        # Lấy danh sách bàn đã được đặt ở ngày và giờ cụ thể
        booked_tables = Datban.objects.filter(
            ngay=ngay,
            khunggio=khunggio
        ).values_list('maban', flat=True)

        # Loại trừ các bàn đã được đặt
        available_tables = tables.exclude(maban__in=booked_tables)

        # Chuyển dữ liệu bàn còn trống thành danh sách JSON
        data = [{"maban": table.maban, "soghe": table.soghe, "tinhtrang": table.tinhtrang} for table in available_tables]

        return Response({"available_tables": data}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)
