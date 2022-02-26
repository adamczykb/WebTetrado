from django.contrib import admin
from django.urls import path,re_path
from backend import views

urlpatterns = [
    path('api/process/result/<int:orderId>',views.request_result),
    path('api/upload/structure/',views.file_handler),
    path('api/process/request/', views.adding_request)
]
urlpatterns.append(path('', views.index))
urlpatterns.append(re_path('^result/', views.index))