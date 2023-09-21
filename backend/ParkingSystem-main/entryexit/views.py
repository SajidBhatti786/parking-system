# views.py
from rest_framework import generics
from .models import EntryExitRecord
from .serializers import EntryExitRecordSerializer
from rest_framework.permissions import IsAuthenticated

class EntryExitRecordListCreateView(generics.ListCreateAPIView):
    queryset = EntryExitRecord.objects.all()
    serializer_class = EntryExitRecordSerializer
    permission_classes =[IsAuthenticated]

class EntryExitRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EntryExitRecord.objects.all()
    serializer_class = EntryExitRecordSerializer
    permission_classes = [IsAuthenticated]
