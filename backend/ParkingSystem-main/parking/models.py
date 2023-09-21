from django.db import models

class ParkingSpace(models.Model):
    space_number = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)
    is_reserved = models.BooleanField(default=False)  # New attribute

    def __str__(self):
        return self.space_number
