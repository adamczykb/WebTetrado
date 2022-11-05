import json
from typing import Dict
from backend.forms import SubscriptionForm
from backend.models import PushInformation, TetradoRequest

def link_notification_to_task_action(
    post_data: Dict[str, str]
    ) -> bool:
    if "orderId" and "subscriptionId" in post_data:
        request = TetradoRequest.objects.get(hash_id=post_data["orderId"])
        subscption = PushInformation.objects.get(hash_id=post_data["subscriptionId"])
        request.push_notification.add(subscption)
        return True
    return False


def save_notification_subscription_action(
    post_data: Dict, user_agent: str
) -> tuple[int, str]:
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
            return 201, json.dumps({"id": str(subscription.hash_id)})
            # Unsubscribe is made, means object is deleted. So return 202
        elif status_type == "unsubscribe":
            subscription.delete()
            return 202, ""

    return 400, ""


def process_subscription_data(post_data:Dict) -> Dict:
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
