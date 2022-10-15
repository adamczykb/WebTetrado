import { useState, useEffect } from "react";

import config from "../config.json";
import { getCookie } from "../components/CSRF";

const pushServerPublicKey =
  "BHhtArJe7JRbUaHmVqGQnWNfOAwVnxgjeyJ9cT6WZLWmJLR4tV-T2yC53olPn_16xD9uQZRnA_xfBZ7PU6Senbs";

/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
async function askUserPermission() {
  return await Notification.requestPermission();
}

/**
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
}

/**
 * returns the subscription if present or nothing
 */
export const getUserSubscription = () => {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    })
    .catch((error) => {});
};

//import all the function created to manage the push notifications

const pushNotificationSupported = isPushNotificationSupported();
//first thing to do: check if the push notifications are supported by the browser

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  //to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
  //We initialize the userConsent with that value
  const [userSubscription, setUserSubscription] = useState<any>();
  //to manage the use push notification subscription
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState("");

  const [loadingPush, setLoadingPush] = useState(true);
  //to manage async actions

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoadingPush(true);
    }
  }, []);

  //if the push notifications are supported, registers the service worker
  //this effect runs only the first render

  const getExixtingSubscription = async () => {
    const existingSubscription = await getUserSubscription();
    if (existingSubscription) {
      setUserSubscription(existingSubscription);
    }
    return existingSubscription;
  };
  useEffect(() => {
    setLoadingPush(true);
    getExixtingSubscription();
    setLoadingPush(false);
  }, []);
  //Retrieve if there is any push notification subscription for the registered service worker
  // this use effect runs only in the first render

  /**
   * define a click handler that asks the user permission,
   * it uses the setSuserConsent state, to set the consent of the user
   * If the user denies the consent, an error is created with the setError hook
   */
  async function onClickAskUserPermission() {
    setLoadingPush(true);
    return await askUserPermission().then((consent) => {
      setUserConsent(consent);

      setLoadingPush(false);
      return consent;
    });
  }
  //

  /**
   * define a click handler that creates a push notification subscription.
   * Once the subscription is created, it uses the setUserSubscription hook
   */
  const onClickSusbribeToPushNotification = async () => {
    setLoadingPush(true);
    return await createNotificationSubscription();
  };

  /**
   * define a click handler that sends the push susbcribtion to the push server.
   * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
   */
  const onClickSendSubscriptionToPushServer = async () => {
    setLoadingPush(true);

    let temp = navigator.userAgent.match(
      /(firefox|msie|chrome|safari|trident)/gi
    );
    let browser = "none";
    if (temp && temp.length > 0) {
      browser = temp[0].toLowerCase();
    }
    let exixtingSubscription: any = await getExixtingSubscription();

    if (exixtingSubscription) {
      let tempUserSubscription = exixtingSubscription;
      tempUserSubscription = tempUserSubscription.toJSON();
      tempUserSubscription["expirationTime"] = 3600;
      const data = {
        status_type: "subscribe",
        subscription: tempUserSubscription,
        browser: browser,
      };
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": getCookie(),
        },
      };
      setLoadingPush(false);
      return fetch(`${config.SERVER_URL}/api/save_subscribe/`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.id;
        });
    } else {
      setLoadingPush(false);
      return false;
    }
  };

  /**
   * returns all the stuff needed by a Component
   */
  return {
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    loadingPush,
  };
}
