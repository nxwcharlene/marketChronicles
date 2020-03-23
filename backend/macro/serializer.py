from rest_framework import serializers
from macro.models import Macro

class MacroSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Macro
        #read_only_fields = ( ‘ owner ‘ ,)

        