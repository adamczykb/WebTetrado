import { Descriptions, Button, Image, message } from "antd";
import config from "../../config.json";
import { DownloadOutlined } from "@ant-design/icons";
import { quadruplex } from "../../types/RestultSet";

function downloadFile(type: any, url: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  fetch(url, requestOptions)
    .then((res)=>res.blob())
    .then((blob)=>{
      let url=  URL.createObjectURL(blob);
      let pom = document.createElement('a');
      pom.setAttribute('href',url)
      pom.setAttribute('download', type+'.svg');
      pom.click(); 
    })
    .catch((error) => console.log(error));
}
export const StructureVisualisation = (data: quadruplex) => {
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
          <Image className="two-d-image" src={config.SERVER_URL + data.varna} />
          <br />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            style={{ marginTop: "15px" }}
            size={"large"}
            onClick={() =>
              downloadFile("varna", config.SERVER_URL + data.varna)
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
            src={config.SERVER_URL + data.r_chie}
          />
          <br />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            style={{ marginTop: "15px" }}
            size={"large"}
            onClick={() =>
              downloadFile("r_chie", config.SERVER_URL + data.r_chie)
            }
          >
            Download
          </Button>
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Layers" className="two-d-description-item">
        <div>
          <Image
            className="two-d-image"
            src={config.SERVER_URL + data.layers}
          />
          <br />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            style={{ marginTop: "15px" }}
            size={"large"}
            onClick={() =>
              downloadFile("layers", config.SERVER_URL + data.layers)
            }
          >
            Download
          </Button>
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="LiteMol" className="two-d-description-item">
        <div className="blure">
          <Image
            className="two-d-image"
            src={"https://onquadro.cs.put.poznan.pl/static/pymol/Q111.png"}
          />
          <br />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            style={{ marginTop: "15px" }}
            size={"large"}
          >
            Download
          </Button>
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};
