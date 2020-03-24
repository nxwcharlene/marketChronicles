from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, QueryDict, HttpResponseRedirect, Http404, JsonResponse
import requests
import pandas as pd
from datetime import datetime


#rest framework dependencies
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics



# from .models import stockprice, stock_id, macro

from bokeh.plotting import figure
from bokeh.models import ColumnDataSource, NumeralTickFormatter
from bokeh.models.widgets import DataTable, DateFormatter, TableColumn
from bokeh.layouts import widgetbox
from bokeh.embed import components


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

def get_earnings(request):
    response = requests.get('http://freegeoip.net/json/')
    geodata = response.json()
    return render(request, 'core/home.html', {
        'ip': geodata['ip'],
        'country': geodata['country_name']
    })