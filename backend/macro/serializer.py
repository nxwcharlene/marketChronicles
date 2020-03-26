from rest_framework import serializers
from macro.models import MacroInput

class MacroSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['Security','Indicator','Direction','Magnitude']
        model = MacroInput
        #read_only_fields = ( ‘ owner ‘ ,)

class StockPriceSerializer(serializers.ModelSerializer):
    stockname = StringSerializer(many=False)
    class Meta:
        model = Stockprice
        fields = ['stock_id','date','price']

        