from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, QueryDict, HttpResponseRedirect, Http404, JsonResponse
import requests
import pandas as pd
from datetime import datetime

from .models import StockPrice

from bokeh.plotting import figure
from bokeh.models import ColumnDataSource, NumeralTickFormatter
from bokeh.models.widgets import DataTable, DateFormatter, TableColumn
from bokeh.layouts import widgetbox
from bokeh.embed import components


# Create your views here.

# Sample function taught by jeffrey:
def trading_volume(request):
    ticker = request.Get.get('ticker', '') # AAPL # ticker must be the same name as the name of the input from frontend form
