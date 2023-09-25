from .models import Reservation
from django.db import transaction 
from .serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import datetime, timedelta, timezone
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Reservation

from .serializers import ReservationSerializer
from reservation.models import ReservationHistory

class ReservationListCreateView(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if a username parameter is provided in the URL
        username_param = self.kwargs.get('username')

        if username_param:
            # If a username is provided, filter reservations by that username
            return Reservation.objects.filter(user__username=username_param)
        else:
            # If no username is provided, return all reservations
            return Reservation.objects.all()
        

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]



class CreateReservationView(generics.CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            user = self.request.user
            parking_space = serializer.validated_data.get('parking_space')

            # Check if a reservation already exists for the same user and parking space
            existing_reservation = Reservation.objects.filter(user=user, parking_space=parking_space).first()
            if existing_reservation  : 
                pass
                # return Response({'detail': 'This space is already reserved'}, status=status.HTTP_400_BAD_REQUEST)
            end_time = datetime.now() + timedelta(hours=8)
            # Create Reservation and Add to Schedule Reservation
            reservation = serializer.save(user=user, end_time=end_time)
            print("Reservation:", reservation)
            # schedule_reservation_end_task(resevation.id)                    
            ReservationHistory.objects.create(user=user, parking_space=parking_space, reservation=reservation, status='Booked')
            
            # Check for expired reservations and free up parking spaces
            expired_reservations = Reservation.objects.filter(end_time__lte=datetime.now())
            for expired_reservation in expired_reservations:
                reservation_history = ReservationHistory.objects.get(reservation=expired_reservation)
                reservation_history.status="Completed"
                reservation_history.save()
                expired_reservation.save()
                expired_parking_space = expired_reservation.parking_space
                expired_parking_space.is_reserved = False
                expired_parking_space.is_available = True
                expired_parking_space.save()

            # Update the corresponding ParkingSpace object's is_reserved field to True
            parking_space.is_reserved = True
            parking_space.is_available= False
            parking_space.save()

            
            return Response({'detail': 'Reservation created successfully.', "space":parking_space }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail': "Model Error!, Please varify model's field and contraints"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR )


class ReservationCancelView(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        try:
            reservation = self.get_object()
            # Check if the user has the permission to cancel the reservation
            if reservation.user == request.user:
                parking_space = reservation.parking_space
                parking_space.is_available=True;
                parking_space.is_reserved = False;

                parking_space.save()
                ReservationHistory.objects.create(user=request.user, parking_space=parking_space, reservation=reservation, status='canceled')


                reservation.delete()
                return Response({'detail': 'Reservation canceled successfully.'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'detail': 'You do not have permission to cancel this reservation.'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e :
            return Response({'detail': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)


