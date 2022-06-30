import { message } from "antd";

export function checkRcsbMaxModel(
  setMaxModel: any,
  setPDBError: any,
  pdbId: string
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  fetch("https://data.rcsb.org/rest/v1/core/entry/" + pdbId, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      if (response.rcsb_entry_container_identifiers) {
        setMaxModel(response.rcsb_entry_container_identifiers.model_ids.length);
      } else {
        setPDBError(true);
        message.error("Protein Data Bank does not contain '" + pdbId + "'");
      }
    });
}
