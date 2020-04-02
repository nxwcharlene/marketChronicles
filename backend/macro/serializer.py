from rest_framework import serializers
from macro.models import MacroInput, Stockprice

class MacroSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['Security','Indicator','Direction','Magnitude']
        model = MacroInput
        #read_only_fields = ( ‘ owner ‘ ,)

class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stockprice
        fields = ['id, ''stock_id','date','price']

        