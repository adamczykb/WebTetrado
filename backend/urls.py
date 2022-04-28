from django.contrib import admin
from django.urls import path,re_path
from backend import views

urlpatterns = [
    path('process/result/<slug:orderId>',views.user_request_result_endpoint),
    path('upload/structure/',views.file_handler_endpoint),
    path('process/request/', views.user_request_setup_endpoint),
    path('process/client/list/<slug:userId>', views.user_request_list_endpoint)
]

