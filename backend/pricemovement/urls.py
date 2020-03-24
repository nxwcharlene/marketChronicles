from django.urls import path
from . import views
from . views import get_news
from . views import get_price


urlpatterns = [
    path('', views.get_news, name='get_news'),
    path('price-get/', views.get_price, name='get_price'),
    path('get-news/', views.get_news, name='get_news'),
]