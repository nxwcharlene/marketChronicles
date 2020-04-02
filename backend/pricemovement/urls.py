from django.urls import path
from . import views
from . views import get_date, get_price, get_ticker

urlpatterns = [
    path('get_price/', views.get_price, name='get_price'),
    path('get_date/', views.get_date, name='get_date'),
    path('get_ticker/', views.get_ticker, name='get_ticker')
]
