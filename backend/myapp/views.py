from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta

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
        tables = Ban.objects.filter(soghe__gte=soghe, tinhtrang='Available')


        search_time = datetime.strptime(khunggio, '%H:%M').time()
    

        # Tính khoảng thời gian ±2 tiếng
        lower_bound = (datetime.combine(datetime.today(), search_time) - timedelta(hours=2)).time()
        upper_bound = (datetime.combine(datetime.today(), search_time) + timedelta(hours=2)).time()

        # Lấy danh sách bàn đã được đặt trong khoảng thời gian đó
        booked_tables = Datban.objects.filter(
            ngay=ngay,
            khunggio__range=(lower_bound, upper_bound)
        ).values_list('maban', flat=True)

        # Loại trừ các bàn đã được đặt
        available_tables = tables.exclude(maban__in=booked_tables)

        # Chuyển dữ liệu bàn còn trống thành danh sách JSON
        data = [{"maban": table.maban, "soghe": table.soghe, "tinhtrang": table.tinhtrang} for table in available_tables]

        return Response({"available_tables": data}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)
