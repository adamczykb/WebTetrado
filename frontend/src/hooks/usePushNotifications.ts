import { useState, useEffect } from "react";
import {
  askUserPermission,
  createNotificationSubscription,
  getUserSubscription,
  isPushNotificationSupported,
} from "../utils/pushNotifications";

import config from "../config.json";
import { getCookie } from "../components/csrf";

//import all the function created to manage the push notifications

const pushNotificationSupported = isPushNotificationSupported();
//first thing to do: check if the push notifications are supported by the browser

export default function usePushNotifications() {
  const [userConsent, setSuserConsent] = useState(Notification.permission);
  //to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
  //We initialize the userConsent with that value
  const [userSubscription, setUserSubscription] = useState<any>();
  //to manage the use push notification subscription
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState("");
  //to manage the push server subscription
  const [error, setError] = useState(false);
  //to manage errors
  const [loadingPush, setLoadingPush] = useState(true);
  //to manage async actions

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoadingPush(true);
      setError(false);
    }
  }, []);
  //if the push notifications are supported, registers the service worker
  //this effect runs only the first render

  useEffect(() => {
    setLoadingPush(true);
    setError(false);
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoadingPush(false);
    };
    getExixtingSubscription();
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
    await askUserPermission().then((consent) => {
      setSuserConsent(consent);
      if (consent !== "granted") {
      }
      setLoadingPush(false);
    });
  }
  //

  /**
   * define a click handler that creates a push notification subscription.
   * Once the subscription is created, it uses the setUserSubscription hook
   */
  const onClickSusbribeToPushNotification = async () => {
    setLoadingPush(true);
    setError(false);
    return await createNotificationSubscription();
  };

  /**
   * define a click handler that sends the push susbcribtion to the push server.
   * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
   */
  const onClickSendSubscriptionToPushServer = async () => {
    setLoadingPush(true);
    setError(false);
    let temp = navigator.userAgent.match(
      /(firefox|msie|chrome|safari|trident)/gi
    );
    let browser = "none";
    if (temp && temp.length > 0) {
      browser = temp[0].toLowerCase();
    }
    let tempUserSubscription = userSubscription;
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
    return fetch(
      `${config.SERVER_URL}/api/save_subscribe/`,
      requestOptions
    )
    
   
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
    error,
    loadingPush,
  };
}
