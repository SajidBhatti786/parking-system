from rest_framework import serializers
from .models import Reservation, ReservationHistory
from entryexit.models import EntryExitRecord

class ReservationSerializer(serializers.ModelSerializer):
    
    
    # start_time = serializers.SerializerMethodField()
    # end_time = serializers.SerializerMethodField()
    
    # def get_reservation_time_fromat(self, obj):
    #     # Customize the format of reservation time here
    #     return obj.reservation_time.strftime("%Y-%m-%d %H:%M:%S")

    # def get_start_time(self, obj):
    #     # Customize the format of start time here
    #     return obj.start_time.strftime("%Y-%m-%d %H:%M:%S") if obj.start_time else None

    # def get_end_time(self, obj):
    #     # Customize the format of end time here
    #     return obj.end_time.strftime("%Y-%m-%d %H:%M:%S")
    
    class Meta:
        model = Reservation
        fields = "__all__"

class ReservationHistorySerializer(serializers.ModelSerializer):
    reservation_user = serializers.CharField(source='reservation.user.username')
    reservation_parking_space = serializers.CharField(source='reservation.parking_space.space_number')
    reservation_start_time = serializers.SerializerMethodField()
    reservation_end_time = serializers.SerializerMethodField()
    entry_time = serializers.SerializerMethodField()
    exit_time = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    class Meta:
        model = ReservationHistory
        fields = '__all__'
