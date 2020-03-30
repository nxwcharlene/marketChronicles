from django.urls import path
from . import views
from . views import get_price, get_news

urlpatterns = [
    path('get_news/', views.get_news, name='get_news'),
    path('', views.get_price, name='get_price'),
]