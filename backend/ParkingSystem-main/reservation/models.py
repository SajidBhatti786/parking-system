from django.db import models
from parking.models import ParkingSpace
from user.models import User
from django.utils import timezone 
from entryexit.models import EntryExitRecord

class Reservation(models.Model):
    # Existing fields
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    reservation_time = models.DateTimeField(auto_now_add=True)
    # New fields for time limitation
    start_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    end_time = models.DateTimeField(default=timezone.now)

    
    

    def __str__(self):
        return f"Reservation {self.id} by {self.user.username}"



class ReservationHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="custom_user")
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    status = models.CharField(max_length=10,choices=[('booked','Booked'), ('canceled','Canceled')])
    timestamp = models.DateTimeField(auto_now_add=True)
