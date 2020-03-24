from django.urls import path
from . import views
from . views import get_macro

urlpatterns = [
    path('', views.get_macro, name='macros'),
    path('')
]
