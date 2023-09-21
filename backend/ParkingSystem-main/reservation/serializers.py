from rest_framework import serializers
from .models import Reservation, ReservationHistory
from entryexit.models import EntryExitRecord

class ReservationSerializer(serializers.ModelSerializer):
    
    reservation_time = serializers.SerializerMethodField()
    start_time = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()
    
    def get_reservation_time(self, obj):
        # Customize the format of reservation time here
        return obj.reservation_time.strftime("%Y-%m-%d %H:%M:%S")

    def get_start_time(self, obj):
        # Customize the format of start time here
        return obj.start_time.strftime("%Y-%m-%d %H:%M:%S") if obj.start_time else None

    def get_end_time(self, obj):
        # Customize the format of end time here
        return obj.end_time.strftime("%Y-%m-%d %H:%M:%S")
    
    class Meta:
        model = Reservation
        # fields = ['id','user','parking_space', 'reservation_time', 'start_time', 'end_time']
        fields = '__all__'
class ReservationHistorySerializer(serializers.ModelSerializer):
    reservation_user = serializers.CharField(source='reservation.user.username')
    reservation_parking_space = serializers.CharField(source='reservation.parking_space.space_number')
    reservation_start_time = serializers.SerializerMethodField()
    reservation_end_time = serializers.SerializerMethodField()
    entry_time = serializers.SerializerMethodField()
    exit_time = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    
    def get_reservation_start_time(self, obj):
        # Customize the format of reservation start time here
        return obj.reservation.start_time.strftime("%Y-%m-%d %H:%M:%S")
    
    def get_reservation_end_time(self, obj):
        # Customize the format of reservation end time here
        return obj.reservation.end_time.strftime("%Y-%m-%d %H:%M:%S")
    
    def get_entry_time(self, obj):
        # Customize the format of entry time here
        entry_exit_record = obj.reservation.user.entryexitrecord_set.first()
        return entry_exit_record.entry_time.strftime("%Y-%m-%d %H:%M:%S") if entry_exit_record else None
    
    def get_exit_time(self, obj):
        # Customize the format of exit time here
        entry_exit_record = obj.reservation.user.entryexitrecord_set.first()
        return entry_exit_record.exit_time.strftime("%Y-%m-%d %H:%M:%S") if entry_exit_record else None

    def get_timestamp(self, obj):
        # Customize the format of timestamp here
        return obj.timestamp.strftime("%Y-%m-%d %H:%M:%S")
    
    class Meta:
        model = ReservationHistory
        fields = '__all__'
