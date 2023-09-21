from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import Token
from .models import User
from django.conf import settings
from reservation.models import ReservationHistory
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import AllowAny permission
from .serializers import  CustomTokenObtainPairSerializer, UserRegistrationSerializer
from reservation.serializers import ReservationHistorySerializer
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# Create your views

# User Registration to api
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]  # By default, only authenticated users can perform actions

    # Example API endpoint to create a new user
    def create(self, request, *args, **kwargs):
        # Allow unauthenticated users to create (sign up) a new user
        self.permission_classes = [AllowAny]

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Example API endpoint to update an existing user
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# User Login View to api
from rest_framework.response import Response
from rest_framework import status

class UserLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        username = request.data.get('username')
        user = User.objects.get(username= username)
        
        if response.status_code == status.HTTP_200_OK:
            data = response.data
            custom_data = {
                'token': data['access'],
                'refresh_token': data['refresh'],
                'username':user.username,
                'email':user.email,
                'user_id':user.id
            }
            return Response(custom_data, status=status.HTTP_200_OK)
        
        # Handle other response codes here if needed
        return response



# Logout View
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
class UserLogoutView(APIView):
    def post(self, request):

            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] =None
            return Response({'detail': 'User logged out successfully.'}, status=status.HTTP_200_OK)

    

class ReservationHistoryListView(generics.ListCreateAPIView):
    queryset = ReservationHistory.objects.all()
    serializer_class = ReservationHistorySerializer
    permission_classes = [IsAuthenticated]
    


def index_view(request):
    return render(request, 'build/index.html')