import { getCookie } from "../../components/csrf";
import config from "../../config.json";

export function clientRequestList(
  setResultSet: any,
  setLoading: any,
  userId: string
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-CSRFToken": getCookie(),
    },
  };

  fetch(
    config.SERVER_URL + "/api/process/client/list/" + userId,
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      setResultSet(response);
      setLoading(false);
    }); //.catch((error) => message.error('Processing error'));
}
