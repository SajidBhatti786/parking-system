from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserLoginView, UserLogoutView, ReservationHistoryListView

router = DefaultRouter()
router.register(r'api/register', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', UserLoginView.as_view(), name="user-login"),
    path('api/logout/', UserLogoutView.as_view(), name='user-logout'),
    path("api/user/history/", ReservationHistoryListView.as_view(), name="reservations-history"),
    path('api/user/history/<str:username>/', ReservationHistoryListView.as_view(), name="user-reservation-history" ),
]
