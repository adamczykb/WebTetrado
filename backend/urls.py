from django.contrib import admin
from django.urls import path,include
from backend.views import file_handler,show,adding_request

urlpatterns = [
    path('process/result/',show),
    path('upload/structure/',file_handler),
    path('process/request/', adding_request)
]
