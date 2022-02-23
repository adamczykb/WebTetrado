import { Descriptions, Steps, Table, Image, Button, Tabs, message } from "antd";
import { useParams } from "react-router-dom";
const { Step } = Steps;
const { TabPane } = Tabs;
import { DownloadOutlined } from "@ant-design/icons";
import { Divider } from "../layout/common/Divider";
import config from "../../config.json";
import { useEffect, useState } from "react";
import { type } from "os";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns_tetrad = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Indifier",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sequence",
    dataIndex: "sequence",
    key: "sequence",
  },
  {
    title: "ONZ Class",
    dataIndex: "onz_class",
    key: "onz_class",
  },
  {
    title: "Planarity [Å]",
    dataIndex: "planarity",
    key: "planarity",
  },
];
const columns_nucleotides = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Full name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Chi angle (value) [°]",
    dataIndex: "chi_angle",
    key: "chi_angle",
  },
  {
    title: "Chi angle (type)",
    dataIndex: "glycosidicBond",
    key: "glycosidicBond",
  },
];
const columns_tetrad_pairs = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Tetrad pairs",
    dataIndex: "pair",
    key: "pair",
  },
  {
    title: "Twist [°]",
    dataIndex: "twist",
    key: "twist",
  },
  {
    title: "Rise [Å]",
    dataIndex: "rise",
    key: "rise",
  },
  {
    title: "Strand direction",
    dataIndex: "strand_direction",
    key: "strand_direction",
  },
];

const columns_loops = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Short sequence",
    dataIndex: "short_sequence",
    key: "short_sequence",
  },
  {
    title: "Full sequence",
    dataIndex: "full_sequence",
    key: "full_sequence",
  },
  {
    title: "Loop length",
    dataIndex: "length",
    key: "length",
  },
  {
    title: "Loop type",
    dataIndex: "type",
    key: "type",
  },
];

const columns_chi = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Nucleotide 1",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Nucleotide 2",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Nucleotide 3",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Nucleotide 4",
    dataIndex: "address",
    key: "address",
  },
];
const columns_base_pairs = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Edge 3",
    dataIndex: "edge3",
    key: "edge3",
  },
  {
    title: "Edge 5",
    dataIndex: "edge5",
    key: "edge5",
  },
  {
    title: "Nucleotide 1",
    dataIndex: "nt1",
    key: "nt1",
  },
  {
    title: "Nucleotide 2",
    dataIndex: "nt2",
    key: "nt2",
  },
  {
    title: "Stericity",
    dataIndex: "stericity",
    key: "stericity",
  },
];
type base_pair = {
  number: number;
  edge3: string;
  edge5: string;
  nt1: string;
  nt2: string;
  stericity: string;
};
type tetrad = {
  number: number;
  name: string;
  sequence: string;
  onz_class: string;
  planarity: number;
};
type loop = {
  number: number;
  short_sequence: string;
  full_sequence: string;
  type: string;
  length: number;
};
type quadruplex = {
  number: number;
  molecule: string;
  method: string;
  onz_class: string;
  tetrad_combination: string;
  loopClassification: string;
  structure_dot_bracked: string;
  varna: string;
  r_chie: string;
  layers: string;
  tetrads_no: number;
  tetrad: tetrad[];
  loop: loop[];
};
type tetrad_pair = {
  number: number;
  tetrad1: string;
  tetrad2: string;
  rise: number;
  twist: number;
  strand_direction: string;
};
type nucleotide = {
  number: number;
  symbol: string;
  name: string;
  glycosidicBond: string;
  chi_angle: number;
};
type helice = {
  quadruplex: quadruplex[];
  tetrad_pair: tetrad_pair[];
};
type result_values = {
  name: string;
  status: number;
  structure_method: string;
  idcode: string;
  base_pair: base_pair[];
  helice: helice[];
  nucleotide: nucleotide[];
};

export function processingRequest(
  orderId: any,
  setResultSet: any,
  setLoading: any
) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  fetch(config.SERVER_URL + "/api/process/result/" + orderId, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      setResultSet(response);
      setLoading(false);
    })
    .catch((error) => message.error("Error"));
}

export const Result = () => {
  let result: result_values = {
    name: "",
    status: 0,
    structure_method: "",
    idcode: "",
    base_pair: [],
    helice: [],
    nucleotide: [],
  };
  const { requestNumber } = useParams();
  let [loading, setLoading] = useState(true);
  let [resultSet, setResultSet] = useState(result);
  useEffect(() => {
    processingRequest(requestNumber, setResultSet, setLoading);
  }, []);
  return (
    <>
      <h1 style={{ marginTop: "20px" }}>Request number #{requestNumber}</h1>

      <Steps current={resultSet.status} status="wait">
        <Step title="Make request" description="" />
        <Step title="Waiting in queue" description="" />
        <Step title="Processing" description="" />
        <Step title="Done" description="" />
      </Steps>

      <Divider />
      {loading ? (
        <></>
      ) : (
        <>
          <h2
            id="result"
            style={{
              marginTop: "40px",
              whiteSpace: "pre-wrap",
              fontSize: "20px",
              marginLeft: "10px",
              fontFamily: "'PT Mono', monospace",
            }}
          >
            {resultSet.name}
          </h2>
          <Tabs defaultActiveKey="0" type="card" tabPosition={"top"}>
            {[...Array.from(resultSet.helice, (z, i) => z)].map((z, i) => (
              <TabPane tab={`Helice ${i + 1}`} key={i}>
                <Tabs defaultActiveKey="0" type="card" tabPosition={"top"}>
                  {[
                    ...Array.from(resultSet.helice[i].quadruplex, (v, j) => v),
                  ].map((v, j) => (
                    <TabPane tab={`Quadruplex ${j + 1}`} key={j}>
                      <Descriptions
                        title="Analytics result"
                        bordered
                        layout="vertical"
                        labelStyle={{ fontWeight: "bold" }}
                      >
                        <Descriptions.Item label="PDB ID">
                          {resultSet.idcode}
                        </Descriptions.Item>
                        <Descriptions.Item label="Molecule">
                          {v.molecule}
                        </Descriptions.Item>
                        <Descriptions.Item label="Experimental method">
                          {resultSet.structure_method}
                        </Descriptions.Item>
                        <Descriptions.Item label="Type (by no. of strands)">
                          ???
                        </Descriptions.Item>
                        <Descriptions.Item label="No. of tetrads">
                          {v.tetrads_no}
                        </Descriptions.Item>
                        <Descriptions.Item label="ONZM class">
                          {v.onz_class}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loop topology">
                          {v.loopClassification}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tetrad combination">
                          {v.tetrad_combination}
                        </Descriptions.Item>
                      </Descriptions>
                      <Divider />
                      <h2 id="two-d-structure" style={{ marginTop: "40px" }}>
                        2D structure (dot-bracket):
                      </h2>
                      <p
                        style={{
                          whiteSpace: "pre-wrap",
                          fontSize: "20px",
                          marginLeft: "10px",
                          fontFamily: "'PT Mono', monospace",
                        }}
                      >
                        GCGGTTGGAT-GCGGTTGGAT-GCGGTTGGAT-GCGGTTGGAT szukam
                        <br />
                        ..([..)]..-..........-..([..)]..-..........
                        <br />
                        ..([..([..-..........-..)]..)]..-..........
                        <br />
                      </p>

                      <Descriptions
                        bordered
                        layout="vertical"
                        labelStyle={{ fontWeight: "bold" }}
                        style={{ marginTop: "40px" }}
                        contentStyle={{ textAlign: "center" }}
                      >
                        <Descriptions.Item
                          label="VARNA, czy my bedziemy to rozdzielac?"
                          className="two-d-description-item"
                        >
                          <div>
                            <Image
                              className="two-d-image"
                              src={config.SERVER_URL + v.varna}
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
                        <Descriptions.Item
                          label="R-chie"
                          className="two-d-description-item"
                        >
                          <div>
                            <Image
                              className="two-d-image"
                              src={config.SERVER_URL + v.r_chie}
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
                        <Descriptions.Item
                          label="Layers"
                          className="two-d-description-item"
                        >
                          <div>
                            <Image
                              className="two-d-image"
                              src={config.SERVER_URL + v.layers}
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
                        <Descriptions.Item
                          label="LiteMol"
                          className="two-d-description-item"
                        >
                          <div>
                            <Image
                              className="two-d-image"
                              src={
                                "https://onquadro.cs.put.poznan.pl/static/pymol/Q111.png"
                              }
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

                      <Divider />

                      <h2 id="tetrads" style={{ marginTop: "40px" }}>
                        Tetrads
                      </h2>
                      <Table
                        style={{ textAlign: "center" }}
                        dataSource={v.tetrad}
                        columns={columns_tetrad}
                      />

                      <Divider />

                      <h2 id="loops" style={{ marginTop: "40px" }}>
                        Loops
                      </h2>
                      <Table
                        style={{ textAlign: "center" }}
                        dataSource={v.loop}
                        columns={columns_loops}
                      />

                      <Divider />

                      <h2 id="chi-angle" style={{ marginTop: "40px" }}>
                        Chi angle value and type in each nucleotide
                      </h2>
                      <Table
                        style={{ textAlign: "center" }}
                        dataSource={dataSource}
                        columns={columns_chi}
                      />
                    </TabPane>
                  ))}
                </Tabs>
                <Divider />

                <h2 id="tetrad-pairs" style={{ marginTop: "40px" }}>
                  Tetrad pairs
                </h2>
                <Table
                  style={{ textAlign: "center" }}
                  dataSource={z.tetrad_pair}
                  columns={columns_tetrad_pairs}
                />

                <Divider />
              </TabPane>
            ))}
          </Tabs>
          <h2 id="base-pairs" style={{ marginTop: "40px" }}>
            Base pairs
          </h2>
          <Table
            style={{ textAlign: "center" }}
            dataSource={resultSet.base_pair}
            columns={columns_base_pairs}
          />
          <h2 id="nucleotides" style={{ marginTop: "40px" }}>
            Nucleotides
          </h2>
          <Table
            style={{ textAlign: "center" }}
            dataSource={resultSet.nucleotide}
            columns={columns_nucleotides}
          />
        </>
      )}
    </>
  );
};
