import { Descriptions, Steps, Tabs, Alert, Spin, message } from "antd";
import { useParams } from "react-router-dom";
const { Step } = Steps;
const { TabPane } = Tabs;
import { Divider } from "../layout/common/Divider";
import { useEffect, useState } from "react";
import { result_values } from "../../types/RestultSet";
import { StructureVisualisation } from "./StructureVisualisation";
import { TetradTable } from "./TetradTable";
import { LoopTable } from "./LoopTable";
import { ChiAngleTable } from "./ChiAngleTable";
import { TetradPairTable } from "./TetradPairTable";
import { BasePairTable } from "./BasePairTable";
import { NucleotideTable } from "./NucleotideTable";
import { processingResponse } from "../../utils/adapters/ProcessingResponse";
import { useMediaQuery } from "react-responsive";
import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

import usePushNotifications from "../../hooks/usePushNotifications";
import { nofificationRequest } from "../../utils/adapters/NotificationRequest";

export const Result = () => {
  let result: result_values = {
    name: "",
    dot_bracket: { line1: "", line2: "", sequence: "" },
    status: 0,
    error_message: "",
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

  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    error,
    loadingPush,
  } = usePushNotifications();
  const isConsentGranted = userConsent === "granted";

  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });

  const { requestNumber } = useParams();
  let [loadingResult, setLoadingResult] = useState(true);
  let [subscribed, setSubscribe] = useState(false);
  let [resultSet, setResultSet] = useState(result);

  const sendRequestNotification = () => {
    if (!isConsentGranted) {
      return;
    }
    if (!requestNumber || requestNumber.length === 0) {
      return;
    }
    onClickSusbribeToPushNotification().then(function () {
      onClickSendSubscriptionToPushServer()
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.id;
        })
        .then(async function (subscriptionId) {
          setSubscribe(true);
          nofificationRequest(requestNumber, subscriptionId).then(function (
            value
          ) {
            if (value) {
              let pushMessages = localStorage.getItem("pushMessages");
              if (pushMessages === null) {
                localStorage.setItem("pushMessages", requestNumber);
              } else {
                let temp = pushMessages.split(",");
                if (!temp.includes(requestNumber)) {
                  temp.push(requestNumber);
                  localStorage.setItem("pushMessages", temp.join(","));
                }
              }
              message.success("Notification turned on");
            }
          });
        });
    });
  };

  const requestNotification = async () => {
    if (userConsent === "granted") {
      sendRequestNotification();
    } else {
      await onClickAskUserPermission().then(() => {
        sendRequestNotification();
      });
    }
  };

  useEffect(() => {
    processingResponse(
      requestNumber,
      setResultSet,
      resultSet,
      setLoadingResult
    );
    if (
      localStorage.getItem("pushMessages") &&
      requestNumber &&
      requestNumber.length > 0
    ) {
      if (
        localStorage.getItem("pushMessages")?.split(",").includes(requestNumber)
      )
        setSubscribe(true);
      if (
        localStorage
          .getItem("pushMessages")
          ?.split(",")
          .includes(requestNumber) &&
        resultSet.status > 3
      ) {
        let temp = localStorage.getItem("pushMessages")?.split(",");
        temp = temp?.splice(temp.indexOf(requestNumber), 1);
        localStorage.setItem("pushMessages", temp!.join(","));
      }
    }
  }, []);
  return (
    <>
      <h1 style={{ marginTop: "20px" }}>Request</h1>
      {resultSet.status > 0 &&
      resultSet.status < 4 &&
      pushNotificationSupported ? (
        <Button
          icon={<BellOutlined />}
          type={"default"}
          disabled={subscribed}
          loading={loadingPush}
          onClick={requestNotification}
          style={{ marginBottom: "20px" }}
        >
          {subscribed ? "Notification turned on" : "Turn on notification"}
        </Button>
      ) : (
        <></>
      )}

      <h2>
        code: <i>{requestNumber}</i>
      </h2>

      <Steps current={resultSet.status} status="wait">
        <Step title="Make request" description="" />
        <Step title="Waiting in queue" description="" />
        <Step title="Processing" description="" />
        <Step
          title="Done"
          description={
            resultSet.status === 4 ? "Results will be stored for one week." : ""
          }
        />
      </Steps>

      {resultSet.status == 5 ? (
        <Alert
          message="Server error"
          showIcon
          description={resultSet.error_message}
          type="error"
          style={{ margin: "20px" }}
        />
      ) : (
        <></>
      )}
      {loadingResult || resultSet.status < 4 || resultSet.status == 5 ? (
        <>
          {loadingResult ? (
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
                          contentStyle={{ whiteSpace: "nowrap" }}
                          style={{ width: "100%" }}
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
                            {v.type == "UNI" ? "unimolecular" : ""}
                            {v.type == "BI" ? "bimolecular" : ""}
                            {v.type == "TETRA" ? "tetramolecular" : ""}
                            {v.type == "OTHER" ? "other" : ""}
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
                        {TetradTable(v.tetrad, resultSet.g4_limited, isDesktop)}
                        <Divider />
                        {LoopTable(v.loop, isDesktop)}
                        <Divider />
                        {ChiAngleTable(v.chi_angle_value, isDesktop)}
                      </TabPane>
                    ))}
                  </Tabs>
                  <Divider />
                  {TetradPairTable(z.tetrad_pair, isDesktop)}
                  <Divider />
                </TabPane>
              ))}
            </Tabs>
          )}
          {BasePairTable(resultSet.base_pair, isDesktop)}
          <Divider />
          {NucleotideTable(resultSet.nucleotide, isDesktop)}
        </>
      )}
    </>
  );
};
