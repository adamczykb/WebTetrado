from django.contrib import admin
from django.urls import path,include
from backend.views import file_handler,show

urlpatterns = [
    path('show/',show),
    path('img/',file_handler)

]
