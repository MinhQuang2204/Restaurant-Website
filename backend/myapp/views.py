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
        seats = request.data.get('seats')
        date = request.data.get('date')
        timeslot = request.data.get('timeslot')

        if not seats or not date or not timeslot:
            return Response({"error": "Mising Information On Seats, Date Or Time!"}, status=400)
        
        tables = Diningtable.objects.filter(seats__gte=seats, status='Available')


        search_time = datetime.strptime(timeslot, '%H:%M').time()
    

        lower_bound = (datetime.combine(datetime.today(), search_time) - timedelta(hours=2)).time()
        upper_bound = (datetime.combine(datetime.today(), search_time) + timedelta(hours=2)).time()

        booked_tables = Reservation.objects.filter(
            date=date,
            timeslot__range=(lower_bound, upper_bound)
        ).values_list('tableid', flat=True)

        available_tables = tables.exclude(tableid__in=booked_tables)

        data = [{"tableid": table.tableid, "seats": table.seats, "status": table.status} for table in available_tables]

        return Response({"available_tables": data}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def create_reservation(request):
    if request.method == 'POST':
        customer_data = request.data.get('customer')
        reservation_data = request.data.get('reservation')
        dish_data = request.data.get('dishes')

        customer, created = Customer.objects.get_or_create(
            email=customer_data['email'],
            defaults={
                'fullname': customer_data['fullname'],
                'phone': customer_data['phone']
            }
        )
        table = Diningtable.objects.get(tableid=reservation_data['tableid']) 

        reservation = Reservation.objects.create(
            email=customer,
            tableid=table,  
            date=reservation_data['date'],
            timeslot=reservation_data['timeslot'],
            status='Pending Confirmation'  

        )

        for dish in dish_data:
            dish_instance = Dish.objects.get(dishid=dish['dishid'])
        
            Dishdetail.objects.create(
                reservationid=reservation,
                dishid=dish_instance,  
                quantity=dish['quantity'],
            )

    return Response({
                'message': 'Reservation created successfully!',
                'reservationid': reservation.reservationid 
            }, status=status.HTTP_201_CREATED)

# Tìm kiếm các đặt bàn của khách hàng
@api_view(['POST'])
def search_reservation(request):
    # Lấy thông tin tìm kiếm từ request
    email = request.data.get('email', '')
    phone = request.data.get('phone', '')
    fullname = request.data.get('fullname', '')

    # Tìm kiếm khách hàng dựa trên email, phone và fullname
    customers = Customer.objects.filter(email=email, phone=phone, fullname=fullname)

    if customers.exists():
        # Lấy tất cả các đơn đặt bàn của khách hàng tìm thấy
        customer = customers.first()
        reservations = Reservation.objects.filter(email=customer)

        # Serialize dữ liệu đặt bàn
        reservation_data = ReservationSerializer(reservations, many=True)

        return Response({
            'reservations': reservation_data.data
        }, status=status.HTTP_200_OK)
    
    return Response({
        'message': 'No reservations found for this customer!'
    }, status=status.HTTP_404_NOT_FOUND)

# Lấy thông tin chi tiết một đặt bàn
@api_view(['GET'])
def reservation_details(request, reservationid):
    try:
        # Tìm đơn đặt bàn theo reservationid
        reservation = Reservation.objects.get(reservationid=reservationid)
        
        # Serialize thông tin đặt bàn
        reservation_data = ReservationSerializer(reservation).data

        # Lấy danh sách món ăn liên quan đến reservation
        dishes = Dishdetail.objects.filter(reservationid=reservation)

        # Chuẩn bị dữ liệu chi tiết món ăn
        dishes_data = []
        for dish_detail in dishes:
            dishes_data.append({
                'dishid': dish_detail.dishid.dishid,  # ID của món ăn
                'name': dish_detail.dishid.name,  # Tên món ăn
                'quantity': dish_detail.quantity,  # Số lượng
                'price_per_item': dish_detail.dishid.price,  # Giá từng món
                'total_price': dish_detail.quantity * dish_detail.dishid.price  # Tổng giá tiền
            })

        return Response({
            'reservation': reservation_data,
            'dishes': dishes_data  # Trả về thông tin chi tiết các món ăn
        }, status=status.HTTP_200_OK)

    except Reservation.DoesNotExist:
        return Response({
            'message': 'Reservation not found!'
        }, status=status.HTTP_404_NOT_FOUND)



