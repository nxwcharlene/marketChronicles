from django.shortcuts import render
from pricemovement.models import StockId, Stockprice
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pandas as pd
# from macro.serializer import MacroSerializer
from rest_framework import generics
# from django_pandas.io import read_frame
import quandl
quandl.ApiConfig.api_key='dFvSTC2myD1ts7eJq8VD'
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'news': '/news-get/',
        }
    return Response(api_urls)

@api_view(['GET', 'POST'])
def get_price(request):
    stockid = StockId.objects.all()
    stockprice=Stockprice.objects.all()
    df_stockid = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
    df_stockprice = pd.DataFrame(list(stockprice.values()))


@api_view(['GET', 'POST'])
def get_news(request):
    if request.method == 'GET':
        stockid = StockId.objects.all()
        stockprice=Stockprice.objects.all()
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        stock_price = pd.DataFrame(list(stockprice.values()))

        user_input = {
            'Name of Security': 'AAPL',
            '% Change in stock price':'5%',
            'Time period':'1 Day',
            'Start Date' :'1/1/2018',
            'End Date':'1/1/2019'
        }

        user_input = json.dumps(user_input)
        loaded_input = json.loads(user_input)

        sec_tic =  loaded_input['Name of Security']
        criteria = float(loaded_input['% Change in stock price'].strip('%'))/100
        time_period = loaded_input['Time period']
        start_date = loaded_input['Start Date']
        end_date = loaded_input['End Date']

        stock_number = stock_id[stock_id.loc[:,'ticker']==sec_tic].iloc[0].loc['stock_id']
        security =stock_id[stock_id.loc[:,'stock_id']==stock_number].iloc[0].loc['security'].split(" ")[0]
        price_table = stock_price[stock_price.loc[:,'stock_id']==stock_number]
        price_table.loc[:,'daily_returns']= price_table['price'].pct_change()
        price_table['date'] = pd.to_datetime(price_table['date'])
        price_table=price_table.set_index('date')
        huge_daily_move = price_table[price_table.loc[:,'daily_returns']>criteria]
        huge_daily_move= huge_daily_move.loc[start_date:end_date]
        huge_daily_move= huge_daily_move.to_json(orient='split')

        week_open= price_table.price.resample('W-SUN').last().shift(1, freq='D')
        week_open.rename("open_price",inplace=True)
        week_close =price_table.price.resample('W-FRI').last().shift(-4, freq='D')
        week_close.rename("close_price",inplace=True)
        weekly_data = pd.concat([week_open, week_close], axis=1)
        weekly_data['weekly_returns']=(weekly_data['close_price']-weekly_data['open_price'])/weekly_data['open_price']
        huge_weekly_move= weekly_data[weekly_data.loc[:,'weekly_returns']>criteria]
        huge_weekly_move=huge_weekly_move.loc[start_date:end_date]
        huge_weekly_move= huge_weekly_move.to_json(orient='split')

        context=[]
        # return Response(data=context)

        if time_period == '1 Day':
            loaded_data=json.loads(huge_daily_move)
            context.append(loaded_data)
            return Response(data=context)
        elif time_period == '1 Week':
            loaded_data=json.loads(huge_weekly_move)
            context.append(loaded_data)
            return Response(data=context)

    elif request.method == 'POST':
        return Response("Hello")