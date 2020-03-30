from django.urls import path
from . import views
from . views import get_price, get_news

urlpatterns = [
    path('', views.get_news, name='get_news'),
    path('get_price/', views.get_price, name='get_price'),
]