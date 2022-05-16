import { getCookie } from "../../components/csrf";
import config from "../../config.json";

export async function nofificationRequest(
  orderId: string,
  subscriptionid: string
) {
  let data = {
    orderId: orderId,
    subscriptionId: subscriptionid,
  };
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": getCookie(),
    },
  };
  const response = await fetch(
    config.SERVER_URL + "/api/notification/",
    requestOptions
  );
  return response.status === 200;
}
