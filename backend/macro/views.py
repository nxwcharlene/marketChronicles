from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from macro.models import Macro, Stockprice, StockId
import pandas as pd
# from macro.serializer import MacroSerializer
from rest_framework import generics
from django_pandas.io import read_frame
import quandl
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from .serializer import MacroSerializer
# CREATE YOUR VIEWS HERE:

@api_view(['GET'])
def apiOverview(request):
    api_urls={
        'Macro':'/macro-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_macro(request):
    macro=Macro.objects.filter(ticker='NAPMPMI Index') #replace with indicatorname
    df=pd.DataFrame(list(macro.values())) #convert model data to dataframe
    df['date'] = pd.to_datetime(df['date'], format='%Y/%m/%d')

    class user_input: #pending user input from frontend
        def __init__(self, instrument, indicator, surprise_sign_input, surprise_magnitude):
            self.instrument = instrument  # to link to drop down
            self.indicator = indicator  # to link to autofill
            self.surprise_sign_input = surprise_sign_input  # to link to drop down (exceed, meet, below expections)
            self.surprise_magnitude = surprise_magnitude  # to link to drop down (large, medium, small), if user chooses 'meet', cannot choose magnitude
    john=user_input("Apple","ISM Manufacturing","Exceed","Small")

    def surprise_sign_calc(row):
      if float(row['actual'])-float(row['survm'])>0:
          return('Exceed')
      elif float(row['actual'])-float(row['survm'])<0:
          return('Below')
      else:
          return('Meet')

    df['surprise_sign'] = df.apply(surprise_sign_calc, axis=1)  # create new column for surprise sign

    def surprise_magnitude_calc(row):
      if abs((float(row['actual'])-float(row['survm']))/float(row['stddev']))>2:
          return('Large')
      elif abs((float(row['actual'])-float(row['survm']))/float(row['stddev']))<1:
          return('Small')
      else:
          return('Medium')

    df['surprise_magnitude'] = df.apply(surprise_magnitude_calc, axis=1)  # creates new column for surprise magnitude

    if john.surprise_sign_input != "Meet": #replace with input
        df_results=df[df['surprise_sign'].str.contains(john.surprise_sign_input)&
                  df['surprise_magnitude'].str.contains(john.surprise_magnitude)]
    else:
        df_results=df[df['surprise_sign'].str.contains(john.surprise_sign_input)]

    list_of_results = df_results['date']
    df['data'] = list_of_results
    jsonized_df=df.to_json(date_format='iso',orient="index")

    # ticker = request.GET.get('ticker', 1)

    # macro = Macro.objects.filter(id=1)
    
    # serialized_class = MacroSerializer

    # return HttpResponse(content=macro[0].date, content_type="application/json")
    # context = {
    #     "data" : [{
    #         'date': '2019-01-01',
    #         'ticker' : 'AAPL',
    #         'price_change' : '+3%',
    #         'actual' : 65.0,
    #         'estimate' : 57.0
    #     },
    #     {
    #         'date': '2019-01-01',
    #         'ticker' : 'AAPL',
    #         'price_change' : '+3%',
    #         'actual' : 65.0,
    #         'estimate' : 57.0
    #     },
    #     {
    #         'date': '2019-01-01',
    #         'ticker' : 'AAPL',
    #         'price_change' : '+3%',
    #         'actual' : 65.0,
    #         'estimate' : 57.0
    #     },
    #     {
    #         'data' : serialized_class
    #     }
    #     ]
    # }
    return JsonResponse(data=context)
