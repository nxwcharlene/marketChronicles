from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pricemovement.models import StockId, Stockprice
from .serializer import StockIdSerializer, StockPriceSerializer
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django_pandas.io import read_frame

#python dependencies
import re
import json
import quandl
import pandas as pd
import requests
from datetime import datetime, timedelta, date
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'


# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'stock_price_for_plotting': '/get_price/',
        'date_and_records': '/get_date',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_price(request):
    if request.method == 'GET':
        
        user_input = {
            'Name of Security': 'AAPL',
            '% Change in stock price':'5%',
            'Time period':'1 Week',
            'Start Date' :'1/1/2016',
            'End Date':'1/1/2019'
        }

        user_input = json.dumps(user_input)
        loaded_input = json.loads(user_input)

        sec_tic =  loaded_input['Name of Security']
        criteria = float(loaded_input['% Change in stock price'].strip('%'))/100
        time_period = loaded_input['Time period']
        start_date = loaded_input['Start Date']
        end_date = loaded_input['End Date']
        
        stockid = StockId.objects.all()        
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        stock_number = stock_id[stock_id.loc[:,'ticker']==sec_tic].iloc[0].loc['stock_id']

        stockprice=Stockprice.objects.filter(stock_id=stock_number)
        price_table = pd.DataFrame(list(stockprice.values()))    
        price_table.loc[:,'daily_returns']= price_table['price'].pct_change()
        price_table['date'] = pd.to_datetime(price_table['date'])
        price_table=price_table.set_index('date')
        huge_daily_move = price_table[price_table.loc[:,'daily_returns']>criteria]
        huge_daily_move= huge_daily_move.loc[start_date:end_date]
        
        week_open= price_table.price.resample('W-SUN').last().shift(1, freq='D')
        week_open.rename("open_price",inplace=True)
        week_close =price_table.price.resample('W-FRI').last().shift(-4, freq='D')
        week_close.rename("close_price",inplace=True)
        weekly_data = pd.concat([week_open, week_close], axis=1)
        weekly_data['weekly_returns']=(weekly_data['close_price']-weekly_data['open_price'])/weekly_data['open_price']
        huge_weekly_move= weekly_data[weekly_data.loc[:,'weekly_returns']>criteria]
        huge_weekly_move=huge_weekly_move.loc[start_date:end_date]
        
        context=[]
        
        if time_period == '1 Day':
            date_list = huge_daily_move.index.tolist()
            for i in range(0,len(date_list)):
                price_range = price_table.loc[date_list[i]:].iloc[:65]
                price_range = price_range.drop(columns=['daily_returns','stock_id'])
                price_index=price_range.index.strftime("%Y-%m-%d")
                price_range=price_range.set_index(price_index)
                price_range['date'] = price_range.index
                price_data= price_range.to_json(orient='records')
                loaded_price = json.loads(price_data)
                context.append(loaded_price)
            return Response(data=context)
        elif time_period == '1 Week':
            date_list = huge_weekly_move.index.tolist()
            for i in range(0,len(date_list)):
                price_range = price_table.loc[date_list[i]:].iloc[:260]
                price_range = price_range.drop(columns=['daily_returns','stock_id'])
                price_index=price_range.index.strftime("%Y-%m-%d")
                price_range=price_range.set_index(price_index)
                price_range['date'] = price_range.index
                price_data= price_range.to_json(orient='records')
                loaded_price = json.loads(price_data)
                context.append(loaded_price)
            return Response(data=context)

    elif request.method == 'POST':
        return Response("Hello")


@api_view(['GET', 'POST'])
def get_date(request):
    if request.method == 'GET': # GET uses dummy inputs, POST uses real user inputs
        user_input = {
            'Name of Security': 'AAPL',
            '% Change in stock price': '6%',
            'Time period': '1 Week',
            'Start Date': '1/1/2016',
            'End Date': '1/1/2019'
        }

        user_input = json.dumps(user_input)
        loaded_input = json.loads(user_input)

        sec_tic = loaded_input['Name of Security']
        criteria = float(loaded_input['% Change in stock price'].strip('%'))
        time_period = loaded_input['Time period']
        start_date = loaded_input['Start Date']
        end_date = loaded_input['End Date']

        stockid = StockId.objects.all()
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        stock_number = stock_id[stock_id.loc[:, 'ticker'] == sec_tic].iloc[0].loc['stock_id']

        stockprice = Stockprice.objects.filter(stock_id=stock_number)
        price_table = pd.DataFrame(list(stockprice.values()))
        # price_table = stock_price[stock_price.loc[:,'stock_id']==stock_number]

        # security =stock_id[stock_id.loc[:,'stock_id']==stock_number].iloc[0].loc['security'].split(" ")[0]

        price_table['ticker'] = sec_tic
        price_table['period'] = time_period
        price_table.loc[:, 'returns'] = round(price_table['price'].pct_change() * 100, 2)
        price_table['date'] = pd.to_datetime(price_table['date'])
        price_table = price_table.set_index('date')
        huge_daily_move = price_table[price_table.loc[:, 'returns'] > criteria]
        huge_daily_move = huge_daily_move.loc[start_date:end_date]
        date_index = huge_daily_move.index.strftime("%Y-%m-%d")
        huge_daily_move = huge_daily_move.set_index(date_index)
        huge_daily_move['date'] = huge_daily_move.index
        huge_daily_move = huge_daily_move.to_json(orient='records')

        week_open = price_table.price.resample('W-SUN').last().shift(1, freq='D')
        week_open.rename("open_price", inplace=True)
        week_close = price_table.price.resample('W-FRI').last().shift(-4, freq='D')
        week_close.rename("close_price", inplace=True)
        weekly_data = pd.concat([week_open, week_close], axis=1)
        weekly_data['ticker'] = sec_tic
        weekly_data['period'] = time_period
        weekly_data['returns'] = round(
            ((weekly_data['close_price'] - weekly_data['open_price']) / weekly_data['open_price']) * 100, 2)
        huge_weekly_move = weekly_data[weekly_data.loc[:, 'returns'] > criteria]
        huge_weekly_move = huge_weekly_move.loc[start_date:end_date]
        date_index = huge_weekly_move.index.strftime("%Y-%m-%d")
        huge_weekly_move = huge_weekly_move.set_index(date_index)
        huge_weekly_move['date'] = huge_weekly_move.index
        huge_weekly_move = huge_weekly_move.to_json(orient='records')

        context = []
        # return Response(data=context)

        if time_period == '1 Day':
            # output=huge_daily_move.to_dict()
            # context.append(output)
            loaded_data = json.loads(huge_daily_move)
            context.append(loaded_data)
            context = context[0]
            return Response(data=context)
        elif time_period == '1 Week':
            # output=huge_weekly_move.to_dict()
            # context.append(output)
            loaded_data = json.loads(huge_weekly_move)
            context.append(loaded_data)
            context = context[0]
            return Response(data=context)


    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body) # returns security, pricechange, period, startdate, and enddate
        # body = {"security": "AMZN: Amazon", "pricechange": "1-3", "period": "1D", "startdate": "2020-01-02", "enddate": "2020-04-06"}

        companyname = body['security'].split(":")[1]
        body['security'] = body['security'].split(":")[0]
        user_startdate = body['startdate']
        user_enddate = body['enddate']

        # HARDCODED NEWS W FAKE DATES
        # fakestartdate = "2020-03-18"
        # fakeenddate = "2020-04-18"
        # newsapikey = "cb96aea22e024b5090f23187cec75f76"
        apiurl = "https://api.cityfalcon.com/v0.2/stories?identifier_type=full_tickers&identifiers={}_US&categories=mp%2Cop&min_cityfalcon_score=50&order_by=top&time_filter=mth1&languages=en&access_token=3ffa373c7c1524ac4935b333b1b6a4132a6555755aafa15203e1b5a68b7bf65d".format(
            body['security'])
        newsresponse = requests.request("GET", apiurl)
        loaded_news = json.loads(newsresponse.text)["stories"]

        stockid = StockId.objects.all()
        for item in stockid.values():
            if item['ticker'] == body['security']:
                stock_id_number = item['stock_id']
                print(stock_id_number)
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        stock_number = stock_id[stock_id.loc[:, 'ticker'] == body['security']].iloc[0].loc['stock_id']
        stockprice = Stockprice.objects.filter(stock_id=stock_number)
        price_table = pd.DataFrame(list(stockprice.values()))

        price_table['ticker'] = body['security']
        price_table['period'] = body['period']
        price_table.loc[:, 'returns'] = round(price_table['price'].pct_change() * 100, 2) # creates a column for daily returns
        price_table['date'] = pd.to_datetime(price_table['date'])
        price_table = price_table.set_index('date')

        # If period = 1D
        price_table.loc[:, 'returns'] = round(price_table['price'].pct_change() * 100, 2)
        huge_daily_move = price_table[(abs(price_table.loc[:, 'returns']) > float(body['pricechange'].split('-')[0])) & (abs(price_table.loc[:, 'returns']) < float(body['pricechange'].split('-')[-1]))]
        huge_daily_move = huge_daily_move.loc[body['startdate']:body['enddate']]
        huge_daily_move.returns = huge_daily_move.returns.astype(str) + '%'
        date_index = huge_daily_move.index.strftime("%Y-%m-%d")
        huge_daily_move = huge_daily_move.set_index(date_index)
        huge_daily_move['chartprices'] = None
        for i in range(len(huge_daily_move.index)):
            huge_daily_move['chartprices'][i] = get_1D1Wchartprices(stock_number,huge_daily_move.index[i])
        huge_daily_move['date'] = huge_daily_move.index
        huge_daily_move = huge_daily_move.iloc[::-1]
        huge_daily_move = huge_daily_move.to_json(orient='records')


        # If period = 1W
        week_open = price_table.price.resample('W-SUN').last().shift(1, freq='D')
        week_open.rename("open_price", inplace=True)
        week_close = price_table.price.resample('W-FRI').last().shift(-4, freq='D')
        week_close.rename("close_price", inplace=True)
        weekly_data = pd.concat([week_open, week_close], axis=1)
        weekly_data['ticker'] = body['security']
        weekly_data['period'] = body['period']
        weekly_data['returns'] = round(
            ((weekly_data['close_price'] - weekly_data['open_price']) / weekly_data['open_price']) * 100, 2)
        huge_weekly_move = weekly_data[(abs(weekly_data.loc[:, 'returns']) > float(body['pricechange'].split('-')[0])) & abs((weekly_data.loc[:, 'returns']) < float(body['pricechange'].split('-')[1]))]
        huge_weekly_move = huge_weekly_move.loc[body['startdate']:body['enddate']]
        huge_weekly_move.returns = huge_weekly_move.returns.astype(str) + '%'
        date_index = huge_weekly_move.index.strftime("%Y-%m-%d")
        huge_weekly_move = huge_weekly_move.set_index(date_index)
        huge_weekly_move['chartprices'] = None
        for i in range(len(huge_weekly_move.index)):
            huge_weekly_move['chartprices'][i] = get_1D1Wchartprices(stock_number, huge_weekly_move.index[i])
        huge_weekly_move['date'] = huge_weekly_move.index
        huge_weekly_move = huge_weekly_move.iloc[::-1]
        huge_weekly_move = huge_weekly_move.to_json(orient='records')

        # If period = 1M
        monthly_price = price_table.price.resample('M').last()
        monthly_price.rename("price", inplace=True)
        monthly_returns = monthly_price.pct_change()
        monthly_returns.rename("returns", inplace=True)
        monthly_data = pd.concat([monthly_price, monthly_returns], axis=1)
        monthly_data['ticker'] = body['security']
        monthly_data['period'] = body['period']
        monthly_data['returns'] = round(monthly_data['returns']*100, 2)
        huge_monthly_move = monthly_data[(abs(monthly_data.loc[:, 'returns']) > float(body['pricechange'].split('-')[0])) & (abs(monthly_data.loc[:, 'returns']) < float(body['pricechange'].split('-')[1]))]
        huge_monthly_move = huge_monthly_move.loc[body['startdate']:body['enddate']]
        huge_monthly_move.returns = huge_monthly_move.returns.astype(str) + '%'
        date_index = huge_monthly_move.index.strftime("%Y-%m-%d")  # mmm-yyyy format instead of %Y-%m-%d
        huge_monthly_move = huge_monthly_move.set_index(date_index)
        huge_monthly_move['chartprices'] = None
        for i in range(len(huge_monthly_move.index)):
            huge_monthly_move['chartprices'][i] = get_1Mchartprices(stock_number, huge_monthly_move.index[i])
        # date_index = huge_monthly_move.index.strftime("%Y-%m-%d") # mmm-yyyy format instead of %Y-%m-%d
        # huge_monthly_move = huge_monthly_move.set_index(date_index)
        huge_monthly_move['date'] = huge_monthly_move.index
        huge_monthly_move = huge_monthly_move.iloc[::-1]
        huge_monthly_move = huge_monthly_move.to_json(orient='records')

        # If period = 1Y
        yearly_price = price_table.price.resample('A').last()
        yearly_price.rename("price", inplace=True)
        yearly_returns = yearly_price.pct_change()
        yearly_returns.rename("returns", inplace=True)
        yearly_data = pd.concat([yearly_price, yearly_returns], axis=1)
        yearly_data['ticker'] = body['security']
        yearly_data['period'] = body['period']
        yearly_data['returns'] = round(yearly_data['returns']*100, 2)
        huge_yearly_move = yearly_data[(abs(yearly_data.loc[:, 'returns']) > float(body['pricechange'].split('-')[0])) & (abs(yearly_data.loc[:, 'returns']) < float(body['pricechange'].split('-')[1]))]
        huge_yearly_move = huge_yearly_move.loc[body['startdate']:body['enddate']]
        huge_yearly_move.returns = huge_yearly_move.returns.astype(str) + '%'
        date_index = huge_yearly_move.index.strftime("%Y-%m-%d") # Showing the year only, instead of %Y-%m-%d
        huge_yearly_move = huge_yearly_move.set_index(date_index)
        huge_yearly_move['chartprices'] = None
        for i in range(len(huge_yearly_move.index)):
            huge_yearly_move['chartprices'][i] = get_1Ychartprices(stock_number, huge_yearly_move.index[i])
        huge_yearly_move['date'] = huge_yearly_move.index
        huge_yearly_move = huge_yearly_move.iloc[::-1]
        huge_yearly_move = huge_yearly_move.to_json(orient='records')

        context = []

        if body['period'] == '1D':
            loaded_data = json.loads(huge_daily_move)
            for item in loaded_data:
                stockprice_table = Stockprice.objects.filter(stock_id=stock_number)
                df = pd.DataFrame(list(stockprice_table.values()))
                searchdate = datetime.strptime(item['date'], '%Y-%m-%d') #.date()
                try:
                    index_t0 = df.loc[df['date'] == searchdate].index[0]
                    item['index']=index_t0
                except (KeyError, IndexError):
                    item['index'] = 'No data'
                if item['index'] != 'No data':
                    item['price_t0']=get_stockprice(stock_number,searchdate, 0)
                    item['price_t1']=get_stockprice(stock_number,searchdate,1)
                    item['price_t7']=get_stockprice(stock_number,searchdate, 7) 
                    item['price_t30']=get_stockprice(stock_number,searchdate, 30)
                    item['price_t90']=get_stockprice(stock_number,searchdate, 90)
                    item['price_t180']=get_stockprice(stock_number,searchdate, 180)
                    item['price_t360']=get_stockprice(stock_number,searchdate, 360)
                    item['day_return']=get_drift(item['price_t0'],item['price_t1'])
                    item['wk_return']=get_drift(item['price_t0'],item['price_t7'])
                    item['mth_return']=get_drift(item['price_t0'],item['price_t30'])
                    item['threemth_return']=get_drift(item['price_t0'],item['price_t90'])
                    item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
                    item['year_return']=get_drift(item['price_t0'],item['price_t360'])
                if item['index'] == 'No data':
                    item['price_t0']= 'No data'
                    item['price_t1']= 'No data'
                    item['price_t7']= 'No data'
                    item['price_t30']= 'No data'
                    item['price_t90']= 'No data'
                    item['price_t180']= 'No data'
                    item['price_t360']= 'No data'
                    item['day_return']= 'No data'
                    item['wk_return']= 'No data'
                    item['mth_return']= 'No data'
                    item['threemth_return']= 'No data'
                    item['sixmth_return']= 'No data'
                    item['year_return']= 'No data'
            context.append(loaded_data)
            print(loaded_data)
            context.reverse()
            context.append(loaded_news)
            return Response(data=context)
        elif body['period'] == '1W':
            loaded_data = json.loads(huge_weekly_move)
            for item in loaded_data:
                stockprice_table = Stockprice.objects.filter(stock_id=stock_number)
                df = pd.DataFrame(list(stockprice_table.values()))
                searchdate = datetime.strptime(item['date'], '%Y-%m-%d').date()
                try:
                    index_t0 = df.loc[df['date'] == searchdate].index[0]
                    item['index']=index_t0
                except (KeyError, IndexError):
                    item['index'] = 'No data'
                if item['index'] != 'No data':
                    item['price_t0']=get_stockprice(stock_number,searchdate, 0)
                    item['price_t1']=get_stockprice(stock_number,searchdate,1)
                    item['price_t7']=get_stockprice(stock_number,searchdate, 7) 
                    item['price_t30']=get_stockprice(stock_number,searchdate, 30)
                    item['price_t90']=get_stockprice(stock_number,searchdate, 90)
                    item['price_t180']=get_stockprice(stock_number,searchdate, 180)
                    item['price_t360']=get_stockprice(stock_number,searchdate, 360)
                    item['day_return']='-'
                    item['wk_return']=get_drift(item['price_t0'],item['price_t7'])
                    item['mth_return']=get_drift(item['price_t0'],item['price_t30'])
                    item['threemth_return']=get_drift(item['price_t0'],item['price_t90'])
                    item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
                    item['year_return']=get_drift(item['price_t0'],item['price_t360'])
                if item['index'] == 'No data':
                    item['price_t0']= 'No data'
                    item['price_t1']= 'No data'
                    item['price_t7']= 'No data'
                    item['price_t30']= 'No data'
                    item['price_t90']= 'No data'
                    item['price_t180']= 'No data'
                    item['price_t360']= 'No data'
                    item['day_return']= '-'
                    item['wk_return']= 'No data'
                    item['mth_return']= 'No data'
                    item['threemth_return']= 'No data'
                    item['sixmth_return']= 'No data'
                    item['year_return']='No data'
            context.append(loaded_data)
            # context = context[0]
            context.reverse()
            context.append(loaded_news)
            return Response(data=context)
        elif body['period'] == '1M':
            loaded_data = json.loads(huge_monthly_move)
            for item in loaded_data:
                stockprice_table = Stockprice.objects.filter(stock_id=stock_number)
                df = pd.DataFrame(list(stockprice_table.values()))
                searchdate = datetime.strptime(item['date'], '%Y-%m-%d').date()
                try:
                    index_t0 = df.loc[df['date'] == searchdate].index[0]
                    item['index']=index_t0
                except (KeyError, IndexError):
                    item['index'] = 'No data'
                if item['index'] != 'No data':
                    item['price_t0']=get_stockprice(stock_number,searchdate, 0)
                    item['price_t1']=get_stockprice(stock_number,searchdate,1)
                    item['price_t7']=get_stockprice(stock_number,searchdate, 7) 
                    item['price_t30']=get_stockprice(stock_number,searchdate, 30)
                    item['price_t90']=get_stockprice(stock_number,searchdate, 90)
                    item['price_t180']=get_stockprice(stock_number,searchdate, 180)
                    item['price_t360']=get_stockprice(stock_number,searchdate, 360)
                    item['day_return']='-'
                    item['wk_return']='-'
                    item['mth_return']=get_drift(item['price_t0'],item['price_t30'])
                    item['threemth_return']=get_drift(item['price_t0'],item['price_t90'])
                    item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
                    item['year_return']=get_drift(item['price_t0'],item['price_t360'])
                if item['index'] == 'No data':
                    item['price_t0']= 'No data'
                    item['price_t1']= 'No data'
                    item['price_t7']= 'No data'
                    item['price_t30']= 'No data'
                    item['price_t90']= 'No data'
                    item['price_t180']= 'No data'
                    item['price_t360']= 'No data'
                    item['day_return']= '-'
                    item['wk_return']= '-'
                    item['mth_return']= 'No data'
                    item['threemth_return']= 'No data'
                    item['sixmth_return']= 'No data'
                    item['year_return']='No data'
            context.append(loaded_data)
            # context = context[0]
            context.reverse()
            context.append(loaded_news)
            return Response(data=context)
        elif body['period'] == '1Y':
            loaded_data = json.loads(huge_yearly_move)
            for item in loaded_data:
                stockprice_table = Stockprice.objects.filter(stock_id=stock_number)
                df = pd.DataFrame(list(stockprice_table.values()))
                searchdate = datetime.strptime(item['date'], '%Y-%m-%d').date()

                try:
                    index_t0 = df.loc[df['date'] == searchdate].index[0]
                    item['index']=index_t0
                except (KeyError, IndexError):
                    item['index'] = 'No data'
                if item['index'] != 'No data':
                    item['price_t0']=get_stockprice(stock_number,searchdate, 0)
                    item['price_t1']=get_stockprice(stock_number,searchdate,1)
                    item['price_t7']=get_stockprice(stock_number,searchdate, 7) 
                    item['price_t30']=get_stockprice(stock_number,searchdate, 30)
                    item['price_t90']=get_stockprice(stock_number,searchdate, 90)
                    item['price_t180']=get_stockprice(stock_number,searchdate, 180)
                    item['price_t360']=get_stockprice(stock_number,searchdate, 360)
                    item['day_return']='-'
                    item['wk_return']='-'
                    item['mth_return']='-'
                    item['threemth_return']='-'
                    item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
                    item['year_return']=get_drift(item['price_t0'],item['price_t360'])
                if item['index'] == 'No data':
                    item['price_t0']= 'No data'
                    item['price_t1']= 'No data'
                    item['price_t7']= 'No data'
                    item['price_t30']= 'No data'
                    item['price_t90']= 'No data'
                    item['price_t180']= 'No data'
                    item['price_t360']='No data'
                    item['day_return']= '-'
                    item['wk_return']= '-'
                    item['mth_return']= '-'
                    item['threemth_return']= '-'
                    item['sixmth_return']= 'No data'
                    item['year_return']='No data'
            context.append(loaded_data)
            # context = context[0]
            context.reverse()
            context.append(loaded_news)
            return Response(data=context)
        else:
            context.reverse()
            return Response(data=context)


# @api_view(['GET', 'POST'])
# def get_news(request): # dummy get_news request
#     if request.method == 'GET':
#         securityname = "fed"
#         startdate = "2020-03-19"
#         enddate = "2020-04-18"
#         newsapikey = "cb96aea22e024b5090f23187cec75f76"
#         apiurl = "https://api.cityfalcon.com/v0.2/stories?identifier_type=full_tickers&identifiers=AAPL_US,AMZN_US&categories=mp%2Cop&min_cityfalcon_score=20&order_by=top&time_filter=d1&all_languages=true&access_token=3ffa373c7c1524ac4935b333b1b6a4132a6555755aafa15203e1b5a68b7bf65d"
#         response = requests.request("GET", apiurl)
#         loaded_news = json.loads(response.text)["stories"]
#         return Response(data=loaded_news)

#     elif request.method == 'POST':
#         body_unicode = request.body.decode('utf-8')
#         body = json.loads(body_unicode)
#         print(body)  # returns security, pricechange, period, startdate, and enddate

#         securityname = body["security"].split(":")[1]
#         startdate = "2020-03-18"
#         enddate = "2020-04-18"
#         newsapikey = "cb96aea22e024b5090f23187cec75f76"

#         apiurl = "http://newsapi.org/v2/everything?q={}&from={}&to={}&domains=wsj.com,nytimes.com&sortBy=popularity&apiKey={}".format(
#             securityname, startdate, enddate, newsapikey)

#         response = requests.request("GET", apiurl)
#         loaded_news = json.loads(response.text)["articles"]
#         return Response(data=loaded_news)

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

def get_1D1Wchartprices(stockid, instancedate):
    # baseurl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
    # fullurl = baseurl + ticker + "&outputsize=full&apikey=PO0Z11M2KLE6SZ6F"

    # instancedate is a string in %Y-%m-%d format
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
    enddate = instancedate + timedelta(days=365)
    df = df.loc[(df['date'] >= startdate) & (df['date'] <= enddate)]
    df['date'] = df['date'].astype(str)
    loaded_prices = df.to_json(orient="values")

    return (loaded_prices)


def get_1Mchartprices(stockid, instancedate):
    # instancedate is a string in %Y-%m-%d format
    stockprice_table = Stockprice.objects.filter(stock_id=stockid)
    df = pd.DataFrame(list(stockprice_table.values()))
    df = df.loc[:, ['date', 'price']]
    df['date'] = pd.to_datetime(df['date'])

    instancedate = datetime.strptime(instancedate, "%Y-%m-%d")
    startdate = instancedate - timedelta(days=35)
    enddate = instancedate + timedelta(days=365)
    df = df.loc[(df['date'] >= startdate) & (df['date'] <= enddate)]
    df['date'] = df['date'].astype(str)
    loaded_prices = df.to_json(orient="values")
    return (loaded_prices)


def get_1Ychartprices(stockid, instancedate):  ## INCOMPLETE
    # instancedate is a string in %Y-%m-%d format
    stockprice_table = Stockprice.objects.filter(stock_id=stockid)
    df = pd.DataFrame(list(stockprice_table.values()))
    df = df.loc[:, ['date', 'price']]
    df['date'] = pd.to_datetime(df['date'])
    # df.set_index('date', inplace=True)

    instancedate = datetime.strptime(instancedate, "%Y-%m-%d")
    startdate = instancedate - timedelta(days=370)
    enddate = instancedate + timedelta(days=730)
    df = df.loc[(df['date'] >= startdate) & (df['date'] <= enddate)]
    df['date'] = df['date'].astype(str)
    loaded_prices = df.to_json(orient="values")

    return (loaded_prices)