from time import sleep
from tokenize import group
from unicodedata import name
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from backend.forms import SubscriptionForm
from backend.scripts.userRequestList import user_request_list
from webTetrado import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from backend.scripts.resultRequest import get_result_action
from backend.scripts.Processor.requestSetter import set_request_action
from backend.scripts.FileManagment.fileManagment import handle_uploaded_file
from backend.models import PushInformation, TetradoRequest
from asgiref.sync import sync_to_async
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import render
import os
import logging
import json


@csrf_exempt
def user_request_setup_endpoint(request):
    return set_request_action(request)


@csrf_exempt
def file_handler_endpoint(request):
    if request.FILES["structure"]:
        return HttpResponse(
            status=200,
            content='{"id": "%s", "models": %d,"error":"%s"}'
            % (handle_uploaded_file(request.FILES["structure"])),
            content_type="application/json",
        )
    else:
        return HttpResponse(status=500)


def user_request_result_endpoint(request, orderId):
    return HttpResponse(
        status=200, content=get_result_action(orderId), content_type="application/json"
    )


def user_request_list_endpoint(request, userId):
    return HttpResponse(
        status=200,
        content=json.dumps(user_request_list(userId)),
        content_type="application/json",
    )


@sync_to_async
def get_request_status(hash_id):
    return TetradoRequest.objects.get(hash_id=hash_id)


async def websocket_view(socket):
    await socket.accept()
    try:
        while True:
            hash_id = await socket.receive_text()
            try:
                status = str((await get_request_status(hash_id)).status)
            except Exception:
                await socket.send_text("0")
                await socket.close()
                break
            await socket.send_text(status)
            if status == "5" or status == "4":
                await socket.close()
                break
            sleep(2)
    except AssertionError:
        pass


def link_notification(request):
    try:
        post_data = json.loads(request.body.decode("utf-8"))
    except ValueError:
        return HttpResponse(status=400)
    if "orderId" in post_data and "subscriptionId" in post_data:
        tr = TetradoRequest.objects.get(hash_id=post_data["orderId"])
        subscption = PushInformation.objects.get(hash_id=post_data["subscriptionId"])
        tr.push_notification.add(subscption)
        tr.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@require_POST
def save_subscription(request):

    try:
        post_data = json.loads(request.body.decode("utf-8"))
        user_agent = request.headers["user-agent"]

    except ValueError:
        return HttpResponse(status=400)
    # Process the subscription data to mach with the model
    subscription_data = process_subscription_data(post_data)
    subscription_data["user_agent"] = user_agent
    subscription_form = SubscriptionForm(subscription_data)

    # pass the data through WebPushForm for validation purpose

    # Check if subscriptioninfo and the web push info bot are valid
    # Get the cleaned data in order to get status_type and group_name
    if subscription_form.is_valid():
        status_type = post_data["status_type"]
        subscription = subscription_form.get_or_save()
        if status_type == "subscribe":
            return HttpResponse(
                status=201, content=json.dumps({"id": str(subscription.hash_id)})
            )
            # Unsubscribe is made, means object is deleted. So return 202
        elif status_type == "unsubscribe":
            subscription.delete()
            return HttpResponse(status=202)

    return HttpResponse(status=400)


def process_subscription_data(post_data):
    """Process the subscription data according to out model"""
    subscription_data = post_data.pop("subscription", {})
    # As our database saves the auth and p256dh key in separate field,
    # we need to refactor it and insert the auth and p256dh keys in the same dictionary
    keys = subscription_data.pop("keys", {})
    subscription_data.update(keys)
    # Insert the browser name and user agent
    subscription_data["browser"] = post_data.pop("browser")
    # subscription_data["user_agent"] = post_data.pop("user_agent")
    return subscription_data


@ensure_csrf_cookie
def index(request):
    try:
        with open(os.path.join(settings.STATIC_ROOT, "index.html")) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return render(request, "server_starting.html")
        # return HttpResponse(status=501, content="The frontend is currently under deploy")
