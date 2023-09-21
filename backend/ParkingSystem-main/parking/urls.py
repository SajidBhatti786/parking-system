from django.urls import path
from .views import ParkingSpaceListView, ParkingSpaceViewSet, ParkingSpaceCreateView, ParkingSpaceDeleteView

urlpatterns = [
    path('api/parking-spaces/', ParkingSpaceListView.as_view(), name='parking-space-list'),
    path('api/parking-spaces/<int:pk>/', ParkingSpaceViewSet.as_view({'get':'detail_view'} ), name='parking-space-detail'),
    path('api/parking-spaces/create/', ParkingSpaceCreateView.as_view(), name= 'create-space'),
    path('api/parking-spaces/delete/<int:pk>/', ParkingSpaceDeleteView.as_view(), name= 'delete-space'),
]
