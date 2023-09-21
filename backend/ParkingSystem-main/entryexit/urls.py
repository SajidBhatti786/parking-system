# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/entry-exit-records/', views.EntryExitRecordListCreateView.as_view(), name='entry-exit-record-list'),
    path('api/entry-exit-records/<int:pk>/', views.EntryExitRecordDetailView.as_view(), name='entry-exit-record-detail'),
]
