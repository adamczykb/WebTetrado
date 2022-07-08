import { message } from "antd";
import { getCookie } from "../../components/csrf";
import config from "../../config.json";
import lang from "../../lang.json";
type form_values = {
  fileId: string;
  rcsbPdbId: string;
  settings: {
    complete2d: boolean;
    noReorder: boolean;
    stackingMatch: number;
    strict: boolean;
    model: number;
  };
};
export function processingRequest(data: form_values, setLoading: any) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-CSRFToken": getCookie(),
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"] = "*";
  fetch(config.SERVER_URL + "/api/process/request/", requestOptions)
    .then((response) => {
      if (response.status == 404) {
        message.error(lang.rcsb_error);
        setLoading(false);
        return "";
      } else {
        return response.json();
      }
    })
    .then((response) => {
      if (response != "") {
        window.open(
          config.FRONTEND_URL + "/result/" + response.orderId,
          "_self"
        );
        setLoading(false);
      }
    })
    .catch((error) => message.error("Processing error: " + error.message));
}
