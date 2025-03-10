from typing import Dict
from django.conf import settings
from django.forms.models import model_to_dict

from pywebpush import WebPushException, webpush


def send_notification_to_subscriber(subscription, payload, ttl=0):
    subscription_data = process_subscription_data(subscription)
    vapid_data = {}

    webpush_settings = getattr(settings, "WEBPUSH_SETTINGS", {})
    vapid_private_key = webpush_settings.get("VAPID_PRIVATE_KEY")
    vapid_admin_email = webpush_settings.get("VAPID_ADMIN_EMAIL")

    # Vapid keys are optional, and mandatory only for Chrome.
    # If Vapid key is provided, include vapid key and claims
    if vapid_private_key:
        vapid_data = {
            "vapid_private_key": vapid_private_key,
            "vapid_claims": {"sub": "mailto:{}".format(vapid_admin_email)},
        }

    try:
        req = webpush(
            subscription_info=subscription_data, data=payload, ttl=ttl, **vapid_data
        )
        return req
    except WebPushException as e:
        # If the subscription is expired, delete it.
        if e.response.status_code == 410:
            subscription.delete()
        else:
            # Its other type of exception!
            raise e


def process_subscription_data(subscription) -> Dict:
    subscription_data = model_to_dict(
        subscription, exclude=["browser", "id", "hash_id"]
    )
    endpoint = subscription_data.pop("endpoint")
    p256dh = subscription_data.pop("p256dh")
    auth = subscription_data.pop("auth")

    return {"endpoint": endpoint, "keys": {"p256dh": p256dh, "auth": auth}}
