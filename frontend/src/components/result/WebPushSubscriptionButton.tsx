import { message } from "antd";
import usePushNotifications from "../../hooks/usePushNotifications";
import lang from "../../lang.json";
import { nofificationRequest } from "../../utils/adapters/notificationRequest";
import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
interface WebPushSubscriptionButtonArguments {
  requestNumber: string | undefined;
  status: number;
}
const WebPushSubscriptionButton = (
  props: WebPushSubscriptionButtonArguments
) => {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    loadingPush,
  } = usePushNotifications();

  let [subscribed, setSubscribe] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("pushMessages") &&
      props.requestNumber &&
      props.requestNumber.length > 0
    ) {
      if (
        localStorage
          .getItem("pushMessages")
          ?.split(",")
          .includes(props.requestNumber)
      )
        setSubscribe(true);
      if (
        localStorage
          .getItem("pushMessages")
          ?.split(",")
          .includes(props.requestNumber) &&
        props.status > 3
      ) {
        let temp = localStorage.getItem("pushMessages")?.split(",");
        temp = temp?.splice(temp.indexOf(props.requestNumber), 1);
        localStorage.setItem("pushMessages", temp!.join(","));
      }
    }
  }, []);

  const sendRequestNotification = () => {
    if (!userConsent) {
      return;
    }
    if (!props.requestNumber || props.requestNumber.length === 0) {
      return;
    }
    onClickSusbribeToPushNotification().then((val) => {
      onClickSendSubscriptionToPushServer().then(async function (
        subscriptionId
      ) {
        if (subscriptionId) {
          setSubscribe(true);
          nofificationRequest(props.requestNumber!, subscriptionId).then(
            function (value) {
              if (value) {
                let pushMessages = localStorage.getItem("pushMessages");
                if (pushMessages === null) {
                  localStorage.setItem("pushMessages", props.requestNumber!);
                } else {
                  let temp = pushMessages.split(",");
                  if (!temp.includes(props.requestNumber!)) {
                    temp.push(props.requestNumber!);
                    localStorage.setItem("pushMessages", temp.join(","));
                  }
                }
                message.success(lang.notification_turned_on);
              }
            }
          );
        }
      });
    });
  };

  const requestNotification = async () => {
    onClickAskUserPermission().then((result) => {
      if (result === "granted") {
        sendRequestNotification();
      }
    });
  };
  if (
    pushNotificationSupported &&
    props.requestNumber &&
    props.status > 0 &&
    props.status < 4
  ) {
    return (
      <Button
        icon={<BellOutlined />}
        type={"default"}
        disabled={subscribed}
        loading={loadingPush}
        onClick={requestNotification}
        style={{ marginBottom: "20px" }}
      >
        {subscribed ? lang.notification_turned_on : lang.turn_on_notification}
      </Button>
    );
  } else {
    return <></>;
  }
};
export default WebPushSubscriptionButton;
