from rest_framework import serializers
from pricemovement.models import StockId, Stockprice

class StockIdSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['stock_id','ticker','security']
        model = StockId
        #read_only_fields = ( ‘ owner ‘ ,)

class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stockprice
        fields = ['id, ''stock_id','date','price']