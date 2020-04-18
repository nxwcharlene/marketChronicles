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
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)

        companyname = body['security'].split(":")[1]
        body['security'] = body['security'].split(":")[0]

        user_security=body['security']
        user_direction=body['direction'] #positive
        user_magnitude=body['magnitude'] #For the magnitude
        user_startdate = body['startdate']
        user_enddate = body['enddate']
        #user_startdate=datetime.datetime.strptime(body['startdate'], '%Y-%m-%d').date()
        #user_enddate=datetime.datetime.strptime(body['enddate'], '%Y-%m-%d').date()

        print(user_magnitude)
        print(user_direction)
        print(user_startdate)

        stock_id_table = StockId.objects.all()
        for item in stock_id_table.values():
            if item['ticker'] == body['security']:
                stock_id = item['stock_id']

        print(stock_id)

        stockprice_table = Stockprice.objects.filter(stock_id=stock_id)
        earnings_table = Earnings.objects.filter(stock_id=stock_id, date__range=[user_startdate, user_enddate])
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


        # target_dates = []
        # for item in shortlist_earnings:
        #     target_dates.append(item['date'])
        # print(target_dates)


        #get prices of the next x days and calculate drift
        for item in shortlist_earnings:
            stockprice_table = Stockprice.objects.filter(stock_id=stock_id)
            df = pd.DataFrame(list(stockprice_table.values()))
            searchdate = item['date']
            try:
                index_t0 = df.loc[df['date'] == searchdate].index[0]
                item['index'] = index_t0
            except (KeyError, IndexError):
                item['index'] = 'No data'
            if item['index'] != 'No data':
                item['price_tbef']=get_stockprice(stock_id,item['date'], -1)
                item['price_t0']=get_stockprice(stock_id,item['date'], 0)
                item['price_t1']=get_stockprice(stock_id,item['date'],1)
                item['price_t7']=get_stockprice(stock_id,item['date'], 7) 
                item['price_t30']=get_stockprice(stock_id,item['date'], 30)
                item['price_t90']=get_stockprice(stock_id,item['date'], 90)
                item['price_t180']=get_stockprice(stock_id,item['date'], 180)
                item['price_t360']=get_stockprice(stock_id,item['date'], 360)
                item['t0_return']=get_drift(item['price_tbef'],item['price_t0'])
                item['day_return']=get_drift(item['price_t0'],item['price_t1'])
                item['wk_return']=get_drift(item['price_t0'],item['price_t7'])
                item['mth_return']=get_drift(item['price_t0'],item['price_t30'])
                item['threemth_return']=get_drift(item['price_t0'],item['price_t90'])
                item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
                item['year_return']=get_drift(item['price_t0'],item['price_t360'])
            if item['index'] == 'No data':
                item['price_tbef']='No data'
                item['price_t0']= 'No data'
                item['price_t1']= 'No data'
                item['price_t7']= 'No data'
                item['price_t30']= 'No data'
                item['price_t90']= 'No data'
                item['price_t180']= 'No data'
                item['t0_return']='No data'
                item['day_return']= 'No data'
                item['wk_return']= 'No data'
                item['mth_return']= 'No data'
                item['threemth_return']= 'No data'
                item['sixmth_return']= 'No data'
                item['year_return']= 'No data'
                # if item['price_t1'] != "No Data":
                #     item['1day_return']= float(100*((item['price_t1'] - item['price_t0'])/item['price_t0']), 2)
                # else:
                #     item['1day_return']= 'No Data'
                # if item['price_t7'] != "No Data":
                #     item['1day_return']= float(100*((item['price_t7'] - item['price_t0'])/item['price_t0']),2)
                # else:
                #     item['1wk_return']= 'No Data'
                # if item['price_t30'] != 'No Data':
                #     item['1mth_return']= float(100*((item['price_t30'] - item['price_t0'])/item['price_t0']),2)
                # else:
                #     item['1mth_return']= 'No Data'
                # if item['price_t90'] != 'No Data':
                #     item['3mth_return']= float(100*((item['price_t90'] - item['price_t0'])/item['price_t0']),2)
                # else:
                #     item['1mth_return']= 'No Data'
            item['date'] = item['date'].strftime('%Y-%m-%d')

        for item in shortlist_earnings:
            item["chartprices"] = get_chartprices(stock_id, item['date'])

        print(shortlist_earnings)
        shortlist_earnings.reverse()
        print(shortlist_earnings)
        return Response(data=shortlist_earnings)

        # TESTING
        # base_date = "2020-02-03"
        # base_date = datetime.strptime(base_date, '%Y-%m-%d').date()
        # df = pd.DataFrame(list(stockprice_table.values()))
        # base_date_row = df.loc[df['date']== base_date]
        # print(base_date_row) 
        # index_test = df.loc[df['date']== base_date].index[0]
        # print('This is the Index')
        # print(index_test)
        # next_index = index_test + 1 
        # print(test)
        # get_price = df.loc[1504, 'price']
        # print(get_price)
        # get_next_price = df.loc[next_index, 'price']
        # print(get_next_price)
        # indextest = df.index.get_loc(df.loc[df['date']== base_date])
        # indextest2 = df.index.get_loc(base_date)
        # print(indextest)
        # print(indextest2)

        # print(df.loc[df['date'].isin(target_dates)])
        #END OF TESTING

        # content = []
        # contentStockPrice = []
        # prices=[]
        # for test in shortlist_earnings:

        #     contentStockPrice.append(test)
        # for price in stockprice_table.values() :
        #     prices.append(price)
        # pricedict={}
        # for i in prices:
        #     pricedict[i["date"]]=i["price"]
        # responselist=[]
        # # print(content)
        # # print(contentStockPrice)
        # # print(prices)
        # for i in contentStockPrice:
        #     fillerlist=[]
        #     try:
        #         fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 100 day price stock price change was ",pricedict[i["date"]+timedelta(days=100)]-pricedict[i["date"]]))
        #         responselist.append(fillerlist)
        #     except KeyError:
        #         try:
        #             fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 103 day price stock price change was ",pricedict[i["date"]+timedelta(days=103)]-pricedict[i["date"]]))
        #             responselist.append(fillerlist)
        #         except KeyError:
        #             try:
        #                 fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]]))
        #                 responselist.append(fillerlist)
        #             except KeyError:
        #                     try:
        #                         fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],"The 23 day stock price change was",pricedict[i["date"]+timedelta(days=23)]-pricedict[i["date"]]))
        #                         responselist.append(fillerlist)
        #                     except KeyError:
        #                         try:
        #                             fillerlist.append(("The one day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=1)]-pricedict[i["date"]],))
        #                             responselist.append(fillerlist)
        #                         except KeyError: #start 3 day here
        #                             try:
        #                                 fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 100 day price stock price change was ",pricedict[i["date"]+timedelta(days=100)]-pricedict[i["date"]]))
        #                                 responselist.append(fillerlist)
        #                             except KeyError:
        #                                 try:
        #                                     fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]],"and the 103 day price stock price change was ",pricedict[i["date"]+timedelta(days=103)]-pricedict[i["date"]]))
        #                                     responselist.append(fillerlist)
        #                                 except KeyError:
        #                                     try:
        #                                         fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 20 day stock price change was",pricedict[i["date"]+timedelta(days=20)]-pricedict[i["date"]]))
        #                                         responselist.append(fillerlist)
        #                                     except KeyError:
        #                                             try:
        #                                                 fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],"The 23 day stock price change was",pricedict[i["date"]+timedelta(days=23)]-pricedict[i["date"]]))
        #                                                 responselist.append(fillerlist)
        #                                             except KeyError:
        #                                                     fillerlist.append(("The 3 day stock price change on ",i["date"], "was ",pricedict[i["date"]+timedelta(days=3)]-pricedict[i["date"]],))
        #                                                     responselist.append(fillerlist)
        #                                             else:
        #                                                 fillerlist.append("No data for ", i['date'])
        #                                                 responselist.append(fillerlist) 


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
            
def get_driftdate(date_t0, driftdays):
    driftdate = date_t0 + timedelta(days=driftdays)
    return driftdate

def get_stockprice(stockid, searchdate, daysafter):
    stockprice_table = Stockprice.objects.filter(stock_id=stockid)
    df = pd.DataFrame(list(stockprice_table.values()))
    #get index for date_t0
    index_t0 = df.loc[df['date'] == searchdate].index[0]
    #get index for x days after release date
    index = index_t0 + daysafter
    try:
        price = df.loc[index, 'price']
        return float(price)
    except KeyError:
        return ('No Data')


def get_drift(price_t0, price_driftdate):
    if price_driftdate != 'No Data':
        drift_return = 100*((price_driftdate - price_t0)/price_t0)
        drift_return = round(drift_return, 2)
        return (drift_return)
    else:
        return('No Data')

def get_chartprices(stockid, instancedate):
        # baseurl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
        # fullurl = baseurl + ticker + "&outputsize=full&apikey=PO0Z11M2KLE6SZ6F"

        stockprice_table = Stockprice.objects.filter(stock_id=stockid)
        df = pd.DataFrame(list(stockprice_table.values()))
        df = df.loc[:, ['date', 'price']]
        df['date'] = pd.to_datetime(df['date'])
        # df.set_index('date', inplace=True)

        instancedate = datetime.strptime(instancedate, "%Y-%m-%d")
        # year = int(instancedate.split("-")[0])
        # month = int(instancedate.split("-")[1])
        # day = int(instancedate.split("-")[2])
        # instancedate = date(year, month, day)
        startdate = instancedate - timedelta(days=7)
        enddate = instancedate + timedelta(days=180)
        df = df.loc[(df['date'] >= startdate) & (df['date'] <= enddate)]
        df['date'] = df['date'].astype(str)
        loaded_prices = df.to_json(orient="values")

        return(loaded_prices)

    
    # '''df=pd.DataFrame(list(idframe.values())) #convert model data to dataframe

    # stockidval=df.at[1,"stock_id"]
    # earnings=Earnings.objects.filter(stock_id=stockidval) #replace with stock_id
    # df=pd.DataFrame(list(earnings.values())) #convert model data to dataframe
    # df['date'] = pd.to_datetime(df['date'], format='%Y/%m/%d')
    # value=Stockprice.objects.filter(stock_id=stockidval)
    # values=pd.Dataframe(list(value.values()))
    # values["date"]= pd.to_datetime(values['date'], format='%Y/%m/%d')
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
    # def drift_calc(df):
    #     for i in df.index:
    #         if df.loc[i]["surprise_sign"]==john.surprise_sign_input and df.loc[i]["surprise_magnitude"]==john.surprise_magnitude:
    #             try:
    #                 print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n The 20 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=20)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n And the 100 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=100)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n")
    #             except KeyError:
    #                 try:
    #                     print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n And the 20 day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=50)), "Price"]-values.at[df.loc[i]["Date"], "Price"],"\n")
    #                 except KeyError:
    #                     try:
    #                         print("On",df.loc[i]["Date"],"\n The one day price change was",values.at[(df.loc[i]["Date"]+timedelta(days=1)),"Price"]-values.at[df.loc[i]["Date"],"Price"],"\n")
    #                     except KeyError:
    #                         continue

    # list_of_results = df_results['date']
    # df['data'] = list_of_results
    # jsonized_df=df.to_json(date_format='iso',orient="index")'''

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
