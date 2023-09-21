
# serializers.py
from rest_framework import serializers
from .models import EntryExitRecord

class EntryExitRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntryExitRecord
        fields = '__all__'
