from django.urls import path
from backend import views

urlpatterns = [
    path("process/result/<slug:orderId>", views.user_request_result_endpoint),
    path("upload/structure/", views.file_handler_endpoint),
    path("process/request/", views.set_user_request_endpoint),
    path("save_subscribe/", views.save_notification_subscription_endpoint),
    path("notification/", views.link_notification_to_task_endpoint),
]
