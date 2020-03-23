from django.urls import path
from . import views
from . views import get_macro

urlpatterns = [
    path('macro-get/', views.get_macro, name='get_macros'),
]
