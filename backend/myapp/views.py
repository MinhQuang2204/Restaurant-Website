from django.shortcuts import render

# # Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class DiningtableViewSet(ModelViewSet):
    queryset = Diningtable.objects.all()
    serializer_class = DiningtableSerializer

class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class DishViewSet (ModelViewSet) :
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

class DishdetailViewSet (ModelViewSet) :
    queryset = Dishdetail.objects.all()
    serializer_class = DishdetailSerializer

class ReservationViewSet (ModelViewSet) :
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta

@api_view(['POST'])
def find_table(request):
    try:
        # Lấy dữ liệu từ request
        seats = request.data.get('seats')
        date = request.data.get('date')
        timeslot = request.data.get('timeslot')

        if not seats or not date or not timeslot:
            return Response({"error": "Thiếu thông tin số ghế, ngày hoặc khung giờ!"}, status=400)
        
        # Lọc các bàn có số ghế phù hợp
        tables = Diningtable.objects.filter(seats__gte=seats, status='Available')


        search_time = datetime.strptime(timeslot, '%H:%M').time()
    

        # Tính khoảng thời gian ±2 tiếng
        lower_bound = (datetime.combine(datetime.today(), search_time) - timedelta(hours=2)).time()
        upper_bound = (datetime.combine(datetime.today(), search_time) + timedelta(hours=2)).time()

        # Lấy danh sách bàn đã được đặt trong khoảng thời gian đó
        booked_tables = Reservation.objects.filter(
            date=date,
            timeslot__range=(lower_bound, upper_bound)
        ).values_list('tableid', flat=True)

        # Loại trừ các bàn đã được đặt
        available_tables = tables.exclude(tableid__in=booked_tables)

        # Chuyển dữ liệu bàn còn trống thành danh sách JSON
        data = [{"tableid": table.tableid, "seats": table.seats, "status": table.status} for table in available_tables]

        return Response({"available_tables": data}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def create_reservation(request):
    if request.method == 'POST':
        # Nhận dữ liệu từ frontend
        customer_data = request.data.get('customer')
        reservation_data = request.data.get('reservation')
        dish_data = request.data.get('dishes')

        # Lưu thông tin khách hàng
        customer, created = Customer.objects.get_or_create(
            email=customer_data['email'],
            defaults={
                'fullname': customer_data['fullname'],
                'phone': customer_data['phone']
            }
        )
        table = Diningtable.objects.get(tableid=reservation_data['tableid'])  # Sửa đây để lấy bản ghi Diningtable

        # Lưu thông tin đặt bàn
        reservation = Reservation.objects.create(
            email=customer,
            tableid=table,  # Gán instance Diningtable vào đây
            date=reservation_data['date'],
            timeslot=reservation_data['timeslot'],
            status='Pending Confirmation'  # Gán giá trị cho trường status

        )

        # Lưu thông tin món ăn đã chọn
        for dish in dish_data:
        # Truy vấn đối tượng Dish từ cơ sở dữ liệu dựa trên dishid
            dish_instance = Dish.objects.get(dishid=dish['dishid'])
        
        # Lưu vào bảng Dishdetail, gán instance của Dish vào dishid
            Dishdetail.objects.create(
                reservationid=reservation,
                dishid=dish_instance,  # Gán instance của Dish vào đây
                quantity=dish['quantity'],
            )

    return Response({
                'message': 'Reservation created successfully!',
                'reservationid': reservation.reservationid  # Trả về reservationid thay vì id
            }, status=status.HTTP_201_CREATED)