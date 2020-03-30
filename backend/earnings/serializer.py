from rest_framework import serializers
from earnings.models import Stockprice, Earnings

class EarningsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('___ALL___')
        model = Earnings