import { Descriptions, Steps, Tabs, Alert, Spin } from "antd";
import { useParams } from "react-router-dom";
const { Step } = Steps;
const { TabPane } = Tabs;
import { Divider } from "../layout/common/Divider";
import { useEffect, useState } from "react";
import { result_values, dot_bracket_values } from "../../types/RestultSet";
import { StructureVisualisation } from "./StructureVisualisation";
import { TetradTable } from "./TetradTable";
import { LoopTable } from "./LoopTable";
import { ChiAngleTable } from "./ChiAngleTable";
import { TetradPairTable } from "./TetradPairTable";
import { BasePairTable } from "./BasePairTable";
import { NucleotideTable } from "./NucleotideTable";
import { processingResponse } from "../../utils/adapters/ProcessingResponse";

export const Result = () => {
  let result: result_values = {
    name: "",
    dot_bracket: {line1:'',line2:'',sequence:''},
    status: 0,
    structure_method: "",
    structure_file: "",
    varna: "",
    r_chie: "",
    draw_tetrado: "",
    idcode: "",
    g4_limited: false,
    base_pair: [],
    helice: [],
    nucleotide: [],
  };
  const { requestNumber } = useParams();
  let [loading, setLoading] = useState(true);
  let [resultSet, setResultSet] = useState(result);
  useEffect(() => {
    processingResponse(requestNumber, setResultSet, setLoading);
  }, []);
  return (
    <>
      <h1 style={{ marginTop: "20px" }}>Request code: {requestNumber}</h1>
      {resultSet.status == 5 ? (
        <Alert
          message="Error"
          showIcon
          description="Error"
          type="error"
          style={{ margin: "20px" }}
        />
      ) : (
        <></>
      )}
      <Steps current={resultSet.status} status="wait">
        <Step title="Make request" description="" />
        <Step title="Waiting in queue" description="" />
        <Step title="Processing" description="" />
        <Step title="Done" description="" />
      </Steps>

      {loading || resultSet.status < 4 || resultSet.status == 5 ? (
        <>
          {loading ? (
            <div
              style={{ height: "400px", margin: "20px" }}
              className={"horizontal-center"}
            >
              <Spin size="large" />
            </div>
          ) : (
            <div style={{ height: "400px" }}></div>
          )}
        </>
      ) : (
        <>
          <Divider />
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
          {resultSet.helice.length == 0 ? (
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
                Quadrupexes not found
              </h2>
            </>
          ) : (
            <Tabs defaultActiveKey="0" type="card" tabPosition={"top"}>
              {[...Array.from(resultSet.helice, (z, i) => z)].map((z, i) => (
                <TabPane tab={`Helice ${i + 1}`} key={i}>
                  <Tabs defaultActiveKey="0" type="card" tabPosition={"top"}>
                    {[
                      ...Array.from(
                        resultSet.helice[i].quadruplex,
                        (v, j) => v
                      ),
                    ].map((v, j) => (
                      <TabPane tab={`Quadruplex ${j + 1}`} key={j}>
                        <Descriptions
                          title="Analytics result"
                          bordered
                          layout="horizontal"
                          labelStyle={{ fontWeight: "bold", textAlign: "left" }}
                        >
                          {resultSet.idcode != "" ? (
                            <Descriptions.Item label="PDB ID:">
                              {resultSet.idcode}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}

                          {v.molecule != "" ? (
                            <Descriptions.Item label="Molecule:">
                              {v.molecule}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
                          {resultSet.structure_method != "" ? (
                            <Descriptions.Item label="Experimental method:">
                              {resultSet.structure_method}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
                          <Descriptions.Item label="Type (by no. of strands):">
                            {v.type=='UNI'?'unimolecular':''}
                            {v.type=='BI'?'bimolecular':''}
                            {v.type=='TETRA'?'tetramolecular':''}
                            {v.type=='OTHER'?'other':''}
                          </Descriptions.Item>
                          <Descriptions.Item label="No. of tetrads:">
                            {v.tetrads_no}
                          </Descriptions.Item>
                          {v.onz_class != "" ? (
                            <Descriptions.Item label="ONZM class:">
                              {v.onz_class}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
                          {v.loopClassification != "" ? (
                            <Descriptions.Item label="Loop topology:">
                              {v.loopClassification}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
                          {v.tetrad_combination != "" ? (
                            <Descriptions.Item label="Tetrad combination:">
                              {v.tetrad_combination}
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
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
                          {resultSet.dot_bracket.sequence}
                          <br />
                          {resultSet.dot_bracket.line1}
                          <br />
                          {resultSet.dot_bracket.line2}
                          <br />
                        </p>
                        {StructureVisualisation(v, resultSet)}
                        <Divider />
                        {TetradTable(v.tetrad, resultSet.g4_limited)}
                        <Divider />
                        {LoopTable(v.loop)}
                        <Divider />
                        {ChiAngleTable(v.chi_angle_value)}
                      </TabPane>
                    ))}
                  </Tabs>
                  <Divider />
                  {TetradPairTable(z.tetrad_pair)}
                  <Divider />
                </TabPane>
              ))}
            </Tabs>
          )}
          {BasePairTable(resultSet.base_pair)}
          <Divider />
          {NucleotideTable(resultSet.nucleotide)}
        </>
      )}
    </>
  );
};
