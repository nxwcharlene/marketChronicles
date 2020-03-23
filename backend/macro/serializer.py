from rest_framework import serializers
from macro.models import Instrument

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ('date' , 'open' , 'high', 'low', 'close')
        #read_only_fields = ( ‘ owner ‘ ,)