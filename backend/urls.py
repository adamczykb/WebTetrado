from django.contrib import admin
from django.urls import path,re_path
from backend import views

urlpatterns = [
    path('api/process/result/<int:orderId>',views.user_request_result_entity),
    path('api/upload/structure/',views.file_handler_entity),
    path('api/process/request/', views.user_request_setup_action),
    path('api/process/client/list/<slug:userId>', views.user_request_list_entity)
]
urlpatterns.append(path('', views.index))
urlpatterns.append(re_path('^result/', views.index))