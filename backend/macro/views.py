# django dependencies
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django_pandas.io import read_frame

# rest framework dependencies
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
# from django.core import serializers

# python dependencies
import json
import quandl
import pandas as pd
import re

#models & serializers
from macro.models import Macro, Stockprice, StockId, MacroInput
from .serializer import MacroSerializer, StockPriceSerializer

from datetime import datetime, timedelta
import json

# constants
quandl.ApiConfig.api_key = 'dFvSTC2myD1ts7eJq8VD'

# CREATE YOUR VIEWS HERE:


@api_view(['GET', 'POST'])
def apiOverview(request):
    api_urls = {
        'Macro': '/macro-get/',
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def get_macro(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        # security = request.POST.get('security', '')
        # indicator = request.POST.get('indicator', '')
        # direction = request.POST.get('direction', '')
        # magnitude = request.POST.get('magnitude', '')

        # data = [{
        #     'security' : security,
        #     'indicator' : indicator,
        #     'direction' : direction,
        #     'magnitude' : magnitude,
        # }]

        # print(data)
        # return Response(data=data)

        stock_id_table = StockId.objects.all()
        for item in stock_id_table.values():
            if item['ticker'] == body['security']:
                stockid = item['stock_id']
                print(stockid)

        macro = Macro.objects.filter(
            event=body['indicator'])  # change to all later
        # print(pd.DataFrame(list(stock_id_table.values())))
        context = []
        for item in macro.values():
            # cleaning up database
            actual = item['actual'].replace('', '0')
            actual = item['actual'].replace("−", "-")
            actual = float(item['actual'].replace('%', '')) #valueerror: cannot convert string to float for some indicators
            survm = item['actual'].replace('', '0')
            survm = item['actual'].replace("−", "-")
            survm = item['survm'].replace('%', '')
            stddev = item['stddev'].replace('%', '')
            # item['date0'] = item['date'].strftime('%Y-%m-%d')
            # item['date7'] = item['date'] + timedelta(days=7)
            # item['date7'] = item['date7'].strftime('%Y-%m-%d')
            # item['date30'] = item['date'] + timedelta(days=30)
            # item['date30'] = item['date30'].strftime('%Y-%m-%d')
            # item['date'] = item['date'].strftime('%Y-%m-%d')
            item['time'] = item['time'].strftime('%H:%M:%S')
            if survm == "":
                survm = 0.0
            else:
                survm = float(survm)

            if stddev == "" or '0' or '0.00':
                stddev = 1  # standard deviation cannot divide by 0.
            else:
                stddev = float(stddev)
            event = item['event']
            if event == "Change in Nonfarm Payrolls":
                event = item['event'].replace(
                    'Change in Nonfarm Payrolls', 'Non-Farm Payroll')
            elif event == "Retail Sales Less Autos":
                event = item['event'].replace(
                    'Retail Sales Less Autos', 'Retail Sales MoM')
            # create 2 new field
            item['surprise_sign'] = calculate_surprise_sign(actual, survm)
            item['surprise_magnitude'] = calculate_surprise_magnitude(
                actual, survm, stddev)
            item['ticker'] = body['security']
            # filter with user input
            if item['event'] == body['indicator']:
                if item['surprise_sign'] == body['direction']:
                    if item['surprise_magnitude'] == body['magnitude']:
                        context.append(item)

        # json_context = json.dumps(context)
        # return Response(data=json_context)

        # for each in context:
        #     each['price_t0'] = get_stockprice(stockid, each['date0'])
        #     each['price_t7'] = get_stockprice(stockid, each['date7'])
        #     each['price_t30'] = get_stockprice(stockid, each['date30'])
        #     if each['price_t7'] != None:
        #         each['drift_t7'] = round((100*(
        #          float(each['price_t7'])-float(each['price_t0']))/float(each['price_t0'])),2)
        #     else:
        #          each['drift_t7'] = "No data"
        #     if each['price_t30'] != None:
        #         each['drift_t30'] = round((100*(
        #              float(each['price_t30']) - float(each['price_t0'])) / float(each['price_t0'])),2)
        #     else:
        #         each['drift_t30'] = "No data"

        for item in context:
            stockprice_table = Stockprice.objects.filter(stock_id=stockid)
            df = pd.DataFrame(list(stockprice_table.values()))
            searchdate = item['date']
            try:
                index_t0 = df.loc[df['date'] == searchdate].index[0]
                item['index'] = index_t0
            except (KeyError, IndexError):
                item['index'] = 'No data'
            if item['index'] != 'No data':
                item['price_t0']=get_stockprice(stockid,item['date'], 0)
                item['price_t1']=get_stockprice(stockid,item['date'],1) 
                item['price_t7']=get_stockprice(stockid,item['date'], 7) 
                item['price_t30']=get_stockprice(stockid,item['date'], 30)
                item['price_t90']=get_stockprice(stockid,item['date'], 90)
                item['price_t180']=get_stockprice(stockid,item['date'], 180)
                item['day_return']=get_drift(item['price_t0'],item['price_t1'])
                item['wk_return']=get_drift(item['price_t0'],item['price_t7'])
                item['mth_return']=get_drift(item['price_t0'],item['price_t30'])
                item['threemth_return']=get_drift(item['price_t0'],item['price_t90'])
                item['sixmth_return']=get_drift(item['price_t0'],item['price_t180'])
            if item['index'] == 'No data':
                item['price_t0']= 'No data'
                item['price_t1']= 'No data'
                item['price_t7']= 'No data'
                item['price_t30']= 'No data'
                item['price_t90']= 'No data'
                item['day_return']= 'No data'
                item['wk_return']= 'No data'
                item['mth_return']= 'No data'
                item['threemth_return']= 'No data'
                item['sixmth_return']= 'No data'
            item['date'] = item['date'].strftime('%Y-%m-%d')

        print(context)
        context.reverse()
        #json_context = json.dumps(context)
        return Response(data=context)

        # get list of dates from context to be used as filter
        # result_dates = [ item['date'] for item in context ]
        # stockprice_table = Stockprice.objects.filter(stock_id=stock_id,date=result_dates)

        # #convert dates to datetime format to add the number of days using timedelta
        # drift_dates = []
        # for base_date in result_dates.values(): #dk if need to refer as item['date']
        #     base_date = datetime.strptime(base_date, '%Y-%m-%d').date()
        #     for count in range(0,30): #include the base date
        #         drift_dates.append(base_date + datetime.timedelta(days=count))

        # get all the stock price of all possible dates we need
        # stockprice_table_incl_driftdates = Stockprice.objects.filter(stock_id=stock_id,date=drift_dates)

        #stockprice_t7 = Stockprice.objects.filter(stock_id=stock_id, date='2014-04-16')
        #stockprice_t30 = Stockprice.objects.filter(stock_id=stock_id, date='2014-04-16')
        # price_today=stockprice_table.values['price']

        # convert datetime format back to string
        # stockprice_list=list(stockprice_table.values())
        # #combined_stockprice_list=list(stockprice_table_incl_driftdates.values())
        # for item in stockprice_list: #or combined_stockprice_list
        #     item['date']=item['date'].strftime('%Y-%m-%d')
        # print(stockprice_list) #combined_stockprice_list

        # for item in stockprice_table.values():
        #     item['date'] = item['date'].strftime('%Y-%m-%d')
        # if item['date'] == '2014-04-16':
        #     price_today = item['price']
        #     id_today=float(item['id'])
        #     print(id_today)
        #
        #
        # if item['id'] == id_today+7:
        #     price_t7=item['price']


def get_stockprice(stockid, searchdate):
    stockprice_table = Stockprice.objects.filter(
        stock_id=stockid, date=searchdate)
    for each in stockprice_table.values():
        price = each['price']
        return price

        # json_context = json.dumps(context)
        # print(json_context)
        # return Response(data=json_context)

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

def filter_date():
    return date == '2014-04-16'


class ReactFilterView(generics.ListAPIView):
    serializer_class = MacroSerializer

    def get_queryset(self):
        return (get_macro(self.request))

        # for item in stock_id_table.values():
        #     if item['ticker'] == body['security']:
        #         stock_id = item['stock_id']
        #         print(stock_id)
        #
        # # get list of dates from context to be used as filter
        # result_dates = [item['date'] for item in context]
        # stockprice_table = Stockprice.objects.filter(stock_id=stock_id, date=result_dates)
        #
        # # convert dates to datetime format to add the number of days using timedelta
        # drift_dates = []
        # for base_date in result_dates.values():  # dk if need to refer as item['date']
        #     base_date = datetime.strptime(base_date, '%Y-%m-%d').date()
        #     for count in range(0, 30):  # include the base date
        #         drift_dates.append(base_date + datetime.timedelta(days=count))
        #
        # # get all the stock price of all possible dates we need
        # stockprice_table_incl_driftdates = Stockprice.objects.filter(stock_id=stock_id, date=drift_dates)
        #
        # # stockprice_t7 = Stockprice.objects.filter(stock_id=stock_id, date='2014-04-16')
        # # stockprice_t30 = Stockprice.objects.filter(stock_id=stock_id, date='2014-04-16')
        # # price_today=stockprice_table.values['price']
        #
        # # convert datetime format back to string
        # stockprice_list = list(stockprice_table.values())
        # # combined_stockprice_list=list(stockprice_table_incl_driftdates.values())
        # for item in stockprice_list:  # or combined_stockprice_list
        #     item['date'] = item['date'].strftime('%Y-%m-%d')
        # print(stockprice_list)  # combined_stockprice_list
        #
        # for item in stockprice_table.values():
        #     item['date'] = item['date'].strftime('%Y-%m-%d')

        # serializer=MacroSerializer(data=body)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data,status=status.HTTP_201_CREATED)
        # return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        # form=MacroInput(request.POST)
        # Security=request.POST.get('Security')
        # Indicator = request.POST.get('Indicator')
        # Direction = request.POST.get('Direction')
        # Magnitude = request.POST.get('Magnitude')
        #
        # MacroInput.objects.create(
        #     Security=Security,
        #     Indicator=Indicator,
        #     Direction=Direction,
        #     Magnitude=Magnitude
        # )


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
