from django.urls import path
from . import views

urlpatterns = [
    path('api/reservations/', views.ReservationListCreateView.as_view(), name='reservation-list'),
    path('api/reservations/<int:pk>/', views.ReservationDetailView.as_view(), name='reservation-detail'),
    path('api/reservations/<str:username>/', views.ReservationListCreateView.as_view(), name='user-reservation'),
    path('api/reservations/create/', views.CreateReservationView.as_view(), name="create-reservation"),
    path('api/reservations/cancel/<int:pk>/', views.ReservationCancelView.as_view(), name="cancel-reservation" ),
]
