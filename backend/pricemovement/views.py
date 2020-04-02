from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pricemovement.models import StockId, Stockprice
# from macro.serializer import MacroSerializer
# from django_pandas.io import read_frame
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import json
import quandl
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
    if request.method == 'GET':
        
        user_input = {
            'Name of Security': 'AAPL',
            '% Change in stock price':'6%',
            'Time period':'1 Week',
            'Start Date' :'1/1/2016',
            'End Date':'1/1/2019'
        }

        user_input = json.dumps(user_input)
        loaded_input = json.loads(user_input)

        sec_tic =  loaded_input['Name of Security']
        criteria = float(loaded_input['% Change in stock price'].strip('%'))
        time_period = loaded_input['Time period']
        start_date = loaded_input['Start Date']
        end_date = loaded_input['End Date']
        
        
        stockid = StockId.objects.all()        
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        stock_number = stock_id[stock_id.loc[:,'ticker']==sec_tic].iloc[0].loc['stock_id']


        stockprice=Stockprice.objects.filter(stock_id=stock_number)
        price_table = pd.DataFrame(list(stockprice.values()))
        # price_table = stock_price[stock_price.loc[:,'stock_id']==stock_number]         
        
        #security =stock_id[stock_id.loc[:,'stock_id']==stock_number].iloc[0].loc['security'].split(" ")[0]
        
        price_table['ticker']=sec_tic
        price_table['period']=time_period
        price_table.loc[:,'returns']=round (price_table['price'].pct_change()*100,2)
        price_table['date'] = pd.to_datetime(price_table['date'])
        price_table=price_table.set_index('date')
        huge_daily_move = price_table[price_table.loc[:,'returns']>criteria]
        huge_daily_move= huge_daily_move.loc[start_date:end_date]
        date_index=huge_daily_move.index.strftime("%Y-%m-%d")
        huge_daily_move=huge_daily_move.set_index(date_index)
        huge_daily_move['date'] = huge_daily_move.index
        huge_daily_move= huge_daily_move.to_json(orient='records')


        week_open= price_table.price.resample('W-SUN').last().shift(1, freq='D')
        week_open.rename("open_price",inplace=True)
        week_close =price_table.price.resample('W-FRI').last().shift(-4, freq='D')
        week_close.rename("close_price",inplace=True)
        weekly_data = pd.concat([week_open, week_close], axis=1)
        weekly_data['ticker']=sec_tic
        weekly_data['period']=time_period
        weekly_data['returns']=round(((weekly_data['close_price']-weekly_data['open_price'])/weekly_data['open_price'])*100,2)
        huge_weekly_move= weekly_data[weekly_data.loc[:,'returns']>criteria]
        huge_weekly_move=huge_weekly_move.loc[start_date:end_date]
        date_index=huge_weekly_move.index.strftime("%Y-%m-%d")
        huge_weekly_move=huge_weekly_move.set_index(date_index)
        huge_weekly_move['date'] = huge_weekly_move.index
        huge_weekly_move= huge_weekly_move.to_json(orient='records')

        context=[]
        # return Response(data=context)

        if time_period == '1 Day':
            # output=huge_daily_move.to_dict()
            # context.append(output)
            loaded_data=json.loads(huge_daily_move)
            context.append(loaded_data)
            context=context[0]
            return Response(data=context)
        elif time_period == '1 Week':
            # output=huge_weekly_move.to_dict()
            # context.append(output)
            loaded_data=json.loads(huge_weekly_move)
            context.append(loaded_data)
            context=context[0]
            return Response(data=context)

    elif request.method == 'POST':
        return Response("Hello")



@api_view(['GET', 'POST'])
def get_bokehchart(request):
    if request.method == 'GET':
        return Response("Hello, this is the GET request")
    elif request.method == 'POST':
        return Response("Hello, this is the POST request")