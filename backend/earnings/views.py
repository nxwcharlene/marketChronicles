#django dependencies
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, QueryDict, HttpResponseRedirect, Http404, JsonResponse
from django_pandas.io import read_frame
import requests
from datetime import datetime

#rest framework dependencies
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
# from django.core import serializers

#python dependencies
import json
import quandl
import pandas as pd

#models & serializers
from macro.models import Macro, Stockprice, StockId

#constants
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'

# CREATE YOUR VIEWS HERE:

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Macro': '/macro-get/',
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def get_earnings(request):
    ticker = request.GET.get('ticker', 1)

    # macro = Macro.objects.filter(id=ticker, date__range=["2011-01-01", "2011-01-31"])
    macro = Macro.objects.all().order_by('-id')[
            :10]  # I just get random 10 set from the database, you can modify based on your needs

    context = []
    for item in macro.values():

        actual = float(item['actual'].replace('%', ''))
        survm = item['survm'].replace('%', '')
        stddev = item['stddev'].replace('%', '')
        if survm == "":
            survm = 0.0
        else:
            survm = float(survm)

        if stddev == "":
            stddev = 1  # standard deviation cannot divide by 0.
        else:
            stddev = float(stddev)

        item['surprise_sign'] = calculate_surprise_sign(actual, survm)
        item['surprise_magnitude'] = calculate_surprise_magnitude(actual, survm, stddev)
        context.append(item)

    return Response(data=context)


def calculate_surprise_sign(actual, survm):
    if actual - survm > 0:
        return ('Exceed')
    elif actual - survm < 0:
        return ('Below')
    else:
        return ('Meet')


def calculate_surprise_magnitude(actual, survm, stddev):
    if abs(((actual - survm) / stddev)) > 2:
        return ('Large')
    elif abs(((actual - survm) / stddev)) < 1:
        return ('Small')
    else:
        return ('Medium')



# Create your views here.

# Sample function taught by jeffrey:
# def get_earnings(request):
#     ticker = request.Get.get('ticker', '') # AAPL # ticker must be the same name as the name of the input from frontend form
#     time_range = request.Get.get('time_range', '')
#     time_range_options = ['Daily', 'Weekly', 'Monthly']
#
#     # use context to define the key to link this variable from front end to back end
#     context = {
#         'ticker': ticker,
#         'time_range': time_range,
#         'time_range_options': time_range_options
#     }
#
#     if ticker is None or time_range is None:
#         return render (request=request, context=context) # template_name='trading_volume.html' if you have templates