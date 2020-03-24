#django dependencies
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django_pandas.io import read_frame

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
from macro.models import Macro, Stockprice, StockId, MacroInput
from .serializer import MacroSerializer

#constants
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'

# CREATE YOUR VIEWS HERE:

@api_view(['GET'])
def apiOverview(request):
    api_urls={
        'Macro':'/macro-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_macro(request):
    if request.method=='GET':
        macro = Macro.objects.all().order_by('-id')[:10] #I just get random 10 set from the database, you can modify based on your needs

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
                stddev = 1 # standard deviation cannot divide by 0.
            else:
                stddev = float(stddev)

            item['surprise_sign'] = calculate_surprise_sign(actual, survm)
            item['surprise_magnitude'] = calculate_surprise_magnitude(actual, survm, stddev)
            context.append(item)

        return Response(data=context)
    else:
        # form=MacroInput(request.POST)
        Security=request.POST.get('Security')
        Indicator = request.POST.get('Indicator')
        Direction = request.POST.get('Direction')
        Magnitude = request.POST.get('Magnitude')

        MacroInput.objects.create(
            Security=Security,
            Indicator=Indicator,
            Direction=Direction,
            Magnitude=Magnitude
        )
    
def calculate_surprise_sign(actual, survm):
    
    if actual - survm > 0:
        return('Exceed')
    elif actual - survm < 0:
        return('Below')
    else:
        return('Meet')

def calculate_surprise_magnitude(actual, survm, stddev):
      if abs(((actual - survm) / stddev)) > 2:
          return('Large')
      elif abs(((actual - survm) / stddev)) < 1:
          return('Small')
      else:
          return('Medium')



    # macro=Macro.objects.filter(ticker='NAPMPMI Index') #replace with indicatorname
    # df=pd.DataFrame(list(macro.values())) #convert model data to dataframe
    # df['date'] = pd.to_datetime(df['date'], format='%Y/%m/%d')

    # class user_input: #pending user input from frontend
    #     def __init__(self, instrument, indicator, surprise_sign_input, surprise_magnitude):
    #         self.instrument = instrument  # to link to drop down
    #         self.indicator = indicator  # to link to autofill
    #         self.surprise_sign_input = surprise_sign_input  # to link to drop down (exceed, meet, below expections)
    #         self.surprise_magnitude = surprise_magnitude  # to link to drop down (large, medium, small), if user chooses 'meet', cannot choose magnitude
    # john=user_input("Apple","ISM Manufacturing","Exceed","Small")

    # def surprise_sign_calc(row):
    #   if float(row['actual'])-float(row['survm'])>0:
    #       return('Exceed')
    #   elif float(row['actual'])-float(row['survm'])<0:
    #       return('Below')
    #   else:
    #       return('Meet')

    # df['surprise_sign'] = df.apply(surprise_sign_calc, axis=1)  # create new column for surprise sign

    # def surprise_magnitude_calc(row):
    #   if abs((float(row['actual'])-float(row['survm']))/float(row['stddev']))>2:
    #       return('Large')
    #   elif abs((float(row['actual'])-float(row['survm']))/float(row['stddev']))<1:
    #       return('Small')
    #   else:
    #       return('Medium')

    # df['surprise_magnitude'] = df.apply(surprise_magnitude_calc, axis=1)  # creates new column for surprise magnitude

    # if john.surprise_sign_input != "Meet": #replace with input
    #     df_results=df[df['surprise_sign'].str.contains(john.surprise_sign_input)&
    #               df['surprise_magnitude'].str.contains(john.surprise_magnitude)]
    # else:
    #     df_results=df[df['surprise_sign'].str.contains(john.surprise_sign_input)]

    # list_of_results = df_results['date']
    # df['data'] = list_of_results
    # jsonized_df=df.to_json(date_format='iso',orient="index")

    #### Jeffrey test ####
    # data = serializers.serialize(format='json', queryset=macro)

    # return HttpResponse(content=data, content_type='application/json')
    # data = {
    #     "date" : serialized_class.data.date
    # }
    # serialized_class.is_valid()
    #### Jeffrey Test ####
    #ticker = request.GET.get('ticker', 1)

    # macro = Macro.objects.filter(id=ticker, date__range=["2011-01-01", "2011-01-31"])