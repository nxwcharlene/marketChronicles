from django.shortcuts import render
from securitybox.models import StockId
from django.http import HttpResponse, JsonResponse
import json
import pandas as pd
from rest_framework import generics
# from django_pandas.io import read_frame
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.

@api_view(['GET'])
def get_ticker(request):
    if request.method == 'GET':

        stockid = StockId.objects.all()
        stock_id = pd.DataFrame(list(stockid.values()))  # convert model data to dataframe
        ticker_and_name = stock_id.loc[:, ['stock_id', 'ticker', 'security']]
        ticker_and_name.set_index("stock_id")
        ticker_and_name['tick_and_name'] = ticker_and_name['ticker'] + ": " + ticker_and_name['security']
        ticker_and_name = ticker_and_name.to_json(orient='records')
        context = []

        loaded_data = json.loads(ticker_and_name)
        # loaded_data = loaded_data['security']
        context.append(loaded_data)
        return Response(data=context)

    else:
        return Response("Invalid request")