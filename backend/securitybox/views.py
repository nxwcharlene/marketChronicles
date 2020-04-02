from django.shortcuts import render
from securitybox.models import StockId, Stockprice
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
        ticker_name = stock_id.loc[:, ['ticker', 'security']]
        ticker_name.set_index("ticker", drop=True, inplace=True)
        ticker_name = ticker_name.to_json(orient='columns')
        context = []

        loaded_data = json.loads(ticker_name)
        loaded_data = loaded_data['security']
        context.append(loaded_data)

        return Response(data=context)

    else:
        return Response("Invalid request")