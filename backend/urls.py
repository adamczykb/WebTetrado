from django.contrib import admin
from django.urls import path
from backend.views import file_handler,request_result,adding_request

urlpatterns = [
    path('process/result/<int:orderId>',request_result),
    path('upload/structure/',file_handler),
    path('process/request/', adding_request)
]
