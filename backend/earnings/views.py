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
from datetime import timedelta, datetime

# CREATE YOUR VIEWS HERE:

quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'

@api_view(['GET, POST'])
def apiOverview(request):
    api_urls={
        'get_earnings':'/earnings-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_earnings(request):
    # Get Earnings
    # Get Surprise Direction and Magnitude
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)

        user_security=body['security']
        user_direction=body['direction'] #positive
        user_magnitude=body['magnitude'] #For the magnitude

        print(user_magnitude)
        print(user_direction)

        stock_id_table = StockId.objects.all()
        for item in stock_id_table.values():
            if item['ticker'] == body['security']:
                stock_id = item['stock_id']

        print(stock_id)

        stockprice_table = Stockprice.objects.filter(stock_id=stock_id)
        earnings_table = Earnings.objects.filter(stock_id=stock_id)
        shortlist_earnings = []

        for item in earnings_table.values():
            item['Ticker'] = user_security
            actual = item['actual']
            median = item['median']
            z_score = float(item['z_score'])
            item['direction']=calculate_surprise_sign(actual, median) #function defined below
            item['magnitude']= z_score_calc(z_score) #function defined below 
            if item['direction']== user_direction:
                if item['magnitude']== user_magnitude:
                    shortlist_earnings.append(item)
        
        print(shortlist_earnings)

        # target_dates = []
        # for item in shortlist_earnings:
        #     target_dates.append(item['date'])
        # print(target_dates)

#modified the filtering algo below to lines 58 to 70
        # if expr == 'Large' and magn=="Pve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__gt = 2)#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)
        # elif expr=="Medium" and magn=="Pve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [1,1.9999])#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)
        # elif expr=="Small" and magn=="Pve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [0.01,0.9999])#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)
        # elif expr=="Large" and magn=="Nve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__lt = -2)#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)
        # elif expr=="Medium" and magn=="Nve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [-1.999,-1])#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)
        # elif expr=="Small" and magn=="Nve":
        #     earning = Earnings.objects.filter(stock_id=stock_id).filter(z_score__range = [-0.9999,-0.01])#greater than
        #     stockPrice = Stockprice.objects.filter(stock_id=stock_id)

        #get driftdates and prices
        for item in shortlist_earnings:
            item['price_t0']=get_stockprice(stock_id, item['date'])

            item['date_t1']= get_driftdate(item['date'], 1)
            item['price_t1']=get_stockprice(stock_id,(item['date_t1']+ timedelta(days=1)))
            #item['1day_return']= 100*((item['price_t1'] - item['price_t0'])/item['price_t0'])

            item['date_t7']= get_driftdate(item['date'], 7)
            #item['price_t7']=get_stockprice(stock_id,item['date_t7'])
            #item['1week_return']= 100*((item['price_t7'] - item['price_t0'])/item['price_t0'])

            item['date_t30']=get_driftdate(item['date'],30)
            #item['price_t30']=get_stockprice(stock_id,item['date_t30'])
            #item['1mth_return']= 100*((item['price_t30'] - item['price_t0'])/item['price_t0'])

            item['date_t90']=get_driftdate(item['date'],90)
            #item['price_t90']=get_stockprice(stock_id,item['date_t90'])
            #item['3mth_return']= 100*((item['price_t90'] - item['price_t0'])/item['price_t0'])

            item['date'] = item['date'].strftime('%Y-%m-%d')
            item['date_t1'] = item['date_t1'].strftime('%Y-%m-%d')
            item['date_t7'] = item['date_t7'].strftime('%Y-%m-%d')
            item['date_t30'] = item['date_t30'].strftime('%Y-%m-%d')
            item['date_t90'] = item['date_t90'].strftime('%Y-%m-%d')
        
        print(shortlist_earnings)
        return Response(data=shortlist_earnings)


        content = []
        contentStockPrice = []
        prices=[]
        for test in shortlist_earnings:

            contentStockPrice.append(test)
        for price in stockprice_table.values() :
            prices.append(price)
        pricedict={}
        for i in prices:
            pricedict[i["date"]]=i["price"]
        responselist=[]
        # print(content)
        # print(contentStockPrice)
        # print(prices)
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
                                                    else:
                                                        fillerlist.append("No data for ", i['date'])
                                                        responselist.append(fillerlist) 


        #print(responselist)
        


def z_score_calc(z_score):
    if abs(z_score) > 2:
        return('Large')
    elif abs(z_score) < 1:
        return('Small')
    else:
        return('Medium')

def calculate_surprise_sign(actual, median):
    if actual - median > 0:
        return('Exceed')
    elif actual - median < 0:
        return('Below')
    else:
        return('Meet')

def get_stockprice(stockid, searchdate):
    stockprice_table = Stockprice.objects.filter(stock_id=stockid)
    # stockprice_dataframe = pd.DataFrame(list(stockprice_table.values()))
    for each in stockprice_table.values():
        if each['date'] == searchdate:
            price = each['price']
            return price
        else:
            return None
            
def get_driftdate(date_t0, driftdays):
    driftdate = date_t0 + timedelta(days=driftdays)
    return driftdate 


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
