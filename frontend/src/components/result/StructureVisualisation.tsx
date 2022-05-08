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
    <Descriptions
      bordered
      layout="vertical"
      labelStyle={{ fontWeight: "bold" }}
      style={{ marginTop: "40px" }}
      contentStyle={{ textAlign: "center" }}
    >
      <Descriptions.Item label="VARNA" className="two-d-description-item">
        <div>
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
      </Descriptions.Item>
      <Descriptions.Item label="R-chie" className="two-d-description-item">
        <div>
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
      </Descriptions.Item>
      <Descriptions.Item
        label="DrawTetrado (2.5D structure)"
        className="two-d-description-item"
      >
        <div>
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
      </Descriptions.Item>
      {resultSet.structure_file != "" ? (
        <Descriptions.Item span={3} label="Mol*" className="two-d-description-item">
          <div>
            <MolStarWrapper
              structure_file={config.SERVER_URL + resultSet.structure_file}
              tetrads={data.tetrad}
            />
            <br/>
            <VisualisationLegend/>
            <br />
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              style={{ marginTop: "15px" }}
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
        </Descriptions.Item>
      ) : (
        <></>
      )}
    </Descriptions>
  );
};
