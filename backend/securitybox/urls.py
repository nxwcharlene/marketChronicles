from django.urls import path
from . import views # dot means in the same directory

# urlpatterns is used to indicate how to access the webpage

urlpatterns = [
    path('', views.get_ticker, name='get_ticker'),
]
