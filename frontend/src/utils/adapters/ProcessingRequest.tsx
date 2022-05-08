import { message } from "antd";
import config from "../../config.json";
type form_values = {
  fileId: string;
  rscbPdbId: string;
  settings: {
    complete2d: boolean;
    noReorder: boolean;
    stackingMatch: number;
    strict: boolean;
  };
};
export function processingRequest(data: form_values,setLoading:any) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  requestOptions.headers["Access-Control-Allow-Origin"]="*"
  fetch(config.SERVER_URL + "/api/process/request/", requestOptions)
    .then((response)=> {
      if(response.status==404){
        message.error("Requested structure is not present in the Protein Data Bank")
        return ""
      }else{
        return response.json()
      }
    })
    .then((response) => {
      if(response!=""){
        window.open(config.FRONTEND_URL + "/result/" + response.orderId, "_self");
        setLoading(false)

      }
    })
    .catch((error) => message.error("Processing error: "+error.message));
}
