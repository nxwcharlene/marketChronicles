from django.shortcuts import render
from pricemovement.models import StockId,Stockprice
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pandas as pd
# from macro.serializer import MacroSerializer
from rest_framework import generics
from django_pandas.io import read_frame
import quandl
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'news': '/news-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_news(request):
    stockid = StockId.objects.all()
    stockprice=Stockprice.objects.all()
    df_stockid = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
    df_stockprice = pd.DataFrame(list(stockprice.values()))
