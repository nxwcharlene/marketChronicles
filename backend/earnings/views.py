# Django Libraries
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# RestFramework
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Third party Libraries
import pandas as pd
import quandl

# Local Libraries
from earnings.models import Earnings, Macro, Stockprice, StockId

# Python Libraries
import json
from datetime import timedelta

# CREATE YOUR VIEWS HERE:

quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'

@api_view(['GET'])
def apiOverview(request):
    api_urls={
        'Macro':'/macro-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
#Call the earnings thingy. Like call the other DF and then play with it
def get_id(request):
    return()

@api_view(['GET', 'POST'])
def get_earnings(request):

    # Get Earnings
    # Get Surprise Direction and Magnitude

    stock_id = request.GET.get('stock_id', 1)
    magn=request.GET.get("magn","Pve") #positive
    expr = request.GET.get('expr', 'small') #For the magnitude

    if expr == 'large' and magn=="Pve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__gt = 2)#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)
    elif expr=="medium" and magn=="Pve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [1,1.9999])#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)
    elif expr=="small" and magn=="Pve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [0.01,0.9999])#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)
    elif expr=="large" and magn=="Nve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__lt = -2)#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)
    elif expr=="medium" and magn=="Nve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [-1.999,-1])#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)
    elif expr=="small" and magn=="Nve":
        earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [-0.9999,-0.01])#greater than
        stockPrice = Stockprice.objects.filter(stock_id=stock_id)

    content = []
    contentStockPrice = []
    prices=[]
    for test in earning.values():

        contentStockPrice.append(test)
    for price in stockPrice.values() :
        prices.append(price)
    pricedict={}
    for i in prices:
        pricedict[i["date"]]=i["price"]
    responselist=[]
    for i in contentStockPrice:
        fillerlist=[]
        try:
            fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 100 day price stock price change was ",pricedict[i["date"]+timedelta(days=100)]-pricedict[i["date"]]))
            responselist.append(fillerlist)
        except KeyError:
            try:
                fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 103 day price stock price change was ",pricedict[i["date"]+timedelta(days=103)]-pricedict[i["date"]]))
                responselist.append(fillerlist)
            except KeyError:
                try:
                    fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]]))
                    responselist.append(fillerlist)
                except KeyError:
                        try:
                            fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 23 day stock price change was",pricedict[i["date"]+timedelta(days=23)]-pricedict[i["date"]]))
                            responselist.append(fillerlist)
                        except KeyError:
                            try:
                                fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],))
                                responselist.append(fillerlist)
                            except KeyError: #start 3 day here
                                try:
                                    fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 100 day price stock price change was ",pricedict[i["date"]+timedelta(days=100)]-pricedict[i["date"]]))
                                    responselist.append(fillerlist)
                                except KeyError:
                                    try:
                                        fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 103 day price stock price change was ",pricedict[i["date"]+timedelta(days=103)]-pricedict[i["date"]]))
                                        responselist.append(fillerlist)
                                    except KeyError:
                                        try:
                                            fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]]))
                                            responselist.append(fillerlist)
                                        except KeyError:
                                                try:
                                                    fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 23 day stock price change was",pricedict[i["date"]+timedelta(days=23)]-pricedict[i["date"]]))
                                                    responselist.append(fillerlist)
                                                except KeyError:
                                                        fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],))
                                                        responselist.append(fillerlist)

    return Response(data=responselist)


    '''df=pd.DataFrame(list(idframe.values())) #convert model data to dataframe

    stockidval=df.at[1,"stock_id"]
    earnings=Earnings.objects.filter(stock_id=stockidval) #replace with stock_id
    df=pd.DataFrame(list(earnings.values())) #convert model data to dataframe
    df['date'] = pd.to_datetime(df['date'], format='%Y/%m/%d')
    value=Stockprice.objects.filter(stock_id=stockidval)
    values=pd.Dataframe(list(value.values()))
    values["date"]= pd.to_datetime(values['date'], format='%Y/%m/%d')
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
    def drift_calc(df):
        for i in df.index:
            if df.loc[i]["surprise_sign"]==john.surprise_sign_input and df.loc[i]["surprise_magnitude"]==john.surprise_magnitude:
                try:
                    print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n The 20 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=20)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n And the 100 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=100)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n")
                except KeyError:
                    try:
                        print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n And the 20 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=50)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n")
                    except KeyError:
                        try:
                            print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n")
                        except KeyError:
                            continue

    list_of_results = df_results['date']
    df['data'] = list_of_results
    jsonized_df=df.to_json(date_format='iso',orient="index")'''

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
