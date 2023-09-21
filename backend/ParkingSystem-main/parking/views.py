from rest_framework import generics , status
from .serializers import ParkingSpaceSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import ParkingSpaceSerializer
from rest_framework.permissions import IsAuthenticated

from parking.models import ParkingSpace


# List all parking spaces
class ParkingSpaceListView(generics.ListAPIView):
    queryset = ParkingSpace.objects.all()
    serializer_class = ParkingSpaceSerializer
    permission_classes = [IsAuthenticated]

# This View give additional information of particular parking space
class ParkingSpaceViewSet(viewsets.ModelViewSet):
    queryset = ParkingSpace.objects.all()
    serializer_class = ParkingSpaceSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['GET'])
    def detail_view(self, request, pk=None):
        parking_space = self.get_object()
        serializer = self.get_serializer(parking_space)
        return Response(serializer.data)


# This veiwset create parking space
class ParkingSpaceCreateView(generics.CreateAPIView):
    serializer_class = ParkingSpaceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            space_number = serializer.validated_data.get('space_number')
            is_available =  serializer.validated_data.get('is_available')
            is_reserved = serializer.validated_data.get('is_reserved')

            exist_parking = ParkingSpace.objects.filter(space_number=space_number).first()
            if exist_parking:
                return Response({'detail':'Space is already created'}, status=status.HTTP_400_BAD_REQUEST )

            serializer.save( space_number=space_number, is_available=is_available, is_reserved=is_reserved)
            return Response({'detial':'Parking Space created Successfully'})
        except e:
            return Response({'detail': 'Model Error!, Please varify model field and contraints'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR )



class ParkingSpaceDeleteView(generics.DestroyAPIView):
    queryset = ParkingSpace.objects.all()
    serializer_class = ParkingSpaceSerializer
    permission_classes = [IsAuthenticated]

    def destroy (self, request, *args, **kwargs):
        try:
            parking_space = self.get_object()
            parking_space.delete()
            return Response({'detail': 'Space removed successfully' } , status=status.HTTP_204_NO_CONTENT )
        except Exception as e:
            return Response({'detail': 'Space not found.'}, status=status.HTTP_404_NOT_FOUND)