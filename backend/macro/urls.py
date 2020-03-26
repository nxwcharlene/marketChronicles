from django.urls import path
from . import views
from . views import get_macro, ReactFilterView

urlpatterns = [
    path('', views.get_macro, name='macros'),
    path('macro-get/', views.get_macro, name='macros'),
    path('result/', ReactFilterView.as_view(), name='result')
]
