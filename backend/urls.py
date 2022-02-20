from django.contrib import admin
from django.urls import path,include
from backend.views import file_handler,show,processing_request

urlpatterns = [
    path('show/',show),
    path('upload/structure/',file_handler),
    path('processing/request/', processing_request)
]
