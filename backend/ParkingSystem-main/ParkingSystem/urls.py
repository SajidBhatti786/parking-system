from django.contrib import admin
from django.urls import path,include
from user.views import index_view
# Use to handle media files
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index_view, name="index"),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('user/', include('user.urls')),                # Handle all api calls made to user
    path('reservation/', include('reservation.urls')),  # Handle all api calls made to reservations
    path('entryexit/', include('entryexit.urls')),      # Handle all api calls made to entryexit
    path('parking/', include('parking.urls')),          # Handle all api calls made to parking
] + static(settings.MEDIA_URL,  document_root= settings.MEDIA_ROOT)
