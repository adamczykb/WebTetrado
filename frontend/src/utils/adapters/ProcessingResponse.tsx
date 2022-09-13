import { message } from "antd";
import { getCookie } from "../../components/csrf";
import config from "../../config.json";

export function processingResponse(
  orderId: any,
  setResultSet: any,
  result: any,
  setLoading: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-CSRFToken": getCookie(),
    },
  };
  let socket = new WebSocket(config.SERVER_WEB_SOCKET_URL);
  let timer: any = null;

  socket.onopen = () => {
    socket.send(orderId);
    timer = setInterval(() => {
      socket.send(orderId);
    }, 5000);
  };
  socket.onmessage = (event) => {
    if (event.data === "5" || event.data === "4") {
      clearInterval(timer);
      fetch(
        config.SERVER_URL + "/api/process/result/" + orderId,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          setResultSet(response);
          setLoading(false);
          socket.close();
        })
        .catch((error) => {
          message.error("Processing error");
          clearInterval(timer);
          socket.close();
        });
    } else {
      setResultSet({
        ...result,
        status: parseInt(event.data),
      });
      if (event.data == "0") {
        setLoading(false);
      }
    }
  };
  socket.onclose = socket.onerror = () => {
    clearInterval(timer);
  };
}
