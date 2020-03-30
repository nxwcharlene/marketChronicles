from django.urls import path
from . views import get_earnings # dot means in the same directory

# urlpatterns is used to indicate how to access the webpage

from django.urls import path
from . import views # dot means in the same directory
from . views import get_earnings

urlpatterns = [
    path('earnings-get/', views.get_earnings, name='get_earnings'),
    path('', views.get_earnings, name='earnings'),
]
