import { Descriptions, Button, Image, message } from "antd";
import config from "../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import { quadruplex, result_values } from "../../types/RestultSet";
import { MolStarWrapper } from "../molstar/MolStarWrapper";
import { VisualisationLegend } from "./Legend";


function downloadFile(type: any, url: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  fetch(url, requestOptions)
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let pom = document.createElement("a");
      pom.setAttribute("href", url);
      pom.setAttribute("download", type);
      pom.click();
    })
    .catch((error) => console.log(error));
}
export const StructureVisualisation = (
  data: quadruplex,
  resultSet: result_values
) => {
  const extension = resultSet.structure_file.split(".").splice(-1)[0];
  return (
    <div id={"result-visualization"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="result-visualization">
          <h2>VARNA</h2>
          <div style={{ padding: "20px", flexDirection:'column' }} className={'vertical-center'} >
            <Image
              className="two-d-image"
              src={config.SERVER_URL + resultSet.varna}
            />
            <br />
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              style={{ marginTop: "15px" }}
              size={"large"}
              onClick={() =>
                downloadFile("varna.svg", config.SERVER_URL + resultSet.varna)
              }
            >
              Download
            </Button>
          </div>
        </div>
        <div className="result-visualization">
          <h2>R-chie</h2>
          <div style={{ padding: "20px", flexDirection:'column' }} className={'vertical-center'} >
            <Image
              className="two-d-image"
              src={config.SERVER_URL + resultSet.r_chie}
            />
            <br />
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              style={{ marginTop: "15px" }}
              size={"large"}
              onClick={() =>
                downloadFile("r_chie.svg", config.SERVER_URL + resultSet.r_chie)
              }
            >
              Download
            </Button>
          </div>
        </div>
        <div className="result-visualization">
          <h2>DrawTetrado (2.5D structure)</h2>
          <div style={{ padding: "20px", flexDirection:'column' }} className={'vertical-center'}>
            <Image
              className="two-d-image"
              src={config.SERVER_URL + resultSet.draw_tetrado}
            />
            <br />

            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              style={{ marginTop: "15px" }}
              size={"large"}
              onClick={() =>
                downloadFile(
                  "drawTetrado.svg",
                  config.SERVER_URL + resultSet.draw_tetrado
                )
              }
            >
              Download
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: "block", marginTop: "30px" }}>
        {resultSet.structure_file != "" ? (
          <div>
            <h2>Mol*</h2>
            <MolStarWrapper
              structure_file={config.SERVER_URL + resultSet.structure_file}
              tetrads={data.tetrad}
            />
            <br />
            <VisualisationLegend />
            <br />
            <div className="horizontal-center" style={{ width: "100%" }}>
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                style={{ marginTop: "15px"}}
                size={"large"}
                onClick={() =>
                  downloadFile(
                    "structure." + extension,
                    config.SERVER_URL + resultSet.structure_file
                  )
                }
              >
                Download
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
