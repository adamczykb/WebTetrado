from django.contrib import admin
from django.urls import path,re_path
from backend import views

urlpatterns = [
    re_path('^api/process/result/<slug:orderId>/$',views.user_request_result_endpoint),
    re_path('^api/upload/structure/$',views.file_handler_endpoint),
    re_path('^api/process/request/$', views.user_request_setup_endpoint),
    re_path('^api/process/client/list/<slug:userId>/$', views.user_request_list_endpoint)
]
urlpatterns.append(re_path('^', views.index))
