from django.db.models import Count
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response

from .models import UserProfile, Complaint


# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = ''
    def list(self, request):
        # Get all complaints from the user's district
        district="NYCC0" +UserProfile.objects.get(user=request.user).district
        complaints=Complaint.objects.values().filter(account=district)
        return Response(complaints)


class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = ''
    def list(self, request):
        # Get only the open complaints from the user's district
        district = "NYCC0" +UserProfile.objects.get(user=request.user).district
        complaints = Complaint.objects.values().filter(closedate=None,account=district)
        return Response(complaints)


class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = ''

    def list(self, request):
        # Get only the closed complaints from the user's district
        district ="NYCC0" + UserProfile.objects.get(user=request.user).district
        complaints = Complaint.objects.values().filter(~Q(closedate=None), account=district)
        return Response(complaints)


class TopComplaintTypeViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']

    def list(self, request):
        # Get the top 3 complaint types from the user's district
        district = "NYCC0" +UserProfile.objects.get(user=request.user).district
        complaints = Complaint.objects.values('complaint_type').filter(~Q(closedate=None), account= district).annotate(count=Count('complaint_type')).order_by("-count")[0:3]
        return Response(complaints)

class ComplaintFromDistrictViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = ''
    def list(self, request):
        # Get all complaints from the user's district
        district="NYCC0" +UserProfile.objects.get(user=request.user).district
        complaints=Complaint.objects.values().filter(council_dist=district)
        return Response(complaints)