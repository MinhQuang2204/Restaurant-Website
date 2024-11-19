# """
# URL configuration for backend project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.1/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
from django.contrib import admin
from django.urls import path, include
from datetime import datetime

urlpatterns = [
    path('admin/', admin.site.urls),
]

from rest_framework.routers import DefaultRouter
from myapp.views import *

router = DefaultRouter()
router.register(r'diningTable', DiningtableViewSet)
router.register(r'customer', CustomerViewSet)
router.register(r'dish',DishViewSet)
router.register(r'dishdetail',DishdetailViewSet)
router.register(r'reservation',ReservationViewSet)
# Tương tự cho các bảng khác

urlpatterns = [
    path('', include(router.urls)),
    path('find_table/', find_table, name='find_table'),
    path('create_reservation/', create_reservation, name='create_reservation'),
]
