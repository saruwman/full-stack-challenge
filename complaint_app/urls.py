from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet,\
    ComplaintFromDistrictViewSet

router = routers.SimpleRouter()
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
router.register(r'fromDistrict', ComplaintFromDistrictViewSet, base_name='complaintFromDistrict')

router.register(r'', ComplaintViewSet, base_name='complaint')

urlpatterns = [
]
urlpatterns += router.urls