import {
  Descriptions,
  Steps,
  Tabs,
  Alert,
  Spin,
  message,
  Tooltip,
  Image,
} from "antd";
import { useParams } from "react-router-dom";
const { Step } = Steps;
const { TabPane } = Tabs;
import { Divider } from "../layout/common/Divider";
import { lazy, Suspense, useEffect, useState } from "react";
import { result_values } from "../../types/RestultSet";
import { processingResponse } from "../../utils/adapters/processingResponse";
import { useMediaQuery } from "react-responsive";
import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import {
  ONZ_COLORS_STRING,
  STRING_ONZ_COLORS,
  ONZ_TEXTS_COLOR_STRING,
} from "../../assets/data/onzClassColor";
import usePushNotifications from "../../hooks/usePushNotifications";
import { nofificationRequest } from "../../utils/adapters/notificationRequest";
import lang from "../../lang.json";

const TetradTable = lazy(() => import("./TetradTable"));
const LoopTable = lazy(() => import("./LoopTable"));
const ChiAngleTable = lazy(() => import("./ChiAngleTable"));
const TetradPairTable = lazy(() => import("./TetradPairTable"));
const BasePairTable = lazy(() => import("./BasePairTable"));
const NucleotideTable = lazy(() => import("./NucleotideTable"));
const StructureVisualisation = lazy(() => import("./StructureVisualisation"));

const renderLoader = () => (
  <div
    style={{ height: "400px", margin: "20px" }}
    className={"horizontal-center"}
  >
    <br />
    <Spin size="large" />
  </div>
);

export const Result = () => {
  let result: result_values = {
    name: "",
    dot_bracket: { line1: "", line2: "", sequence: "" },
    status: 0,
    error_message: "",
    structure_method: "",
    structure_file: "",
    varna: "",
    varna_can: "",
    varna_can_non_can: "",
    varna_non_can: "",
    r_chie: "",
    r_chie_canonical: "",
    model: 1,
    draw_tetrado: "",
    idcode: "",
    g4_limited: false,
    base_pair: [],
    helice: [],
    nucleotide: [],
    remove_date: "",
  };
  //let visualisation_switch: visualsation_switch_result = {
  //varna_non_can: false,
  //varna_can: false,
  //r_chie_canonical: false,
  //};

  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    loadingPush,
  } = usePushNotifications();

  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
  let temp_array = new Map<number, string>();

  const { requestNumber } = useParams();
  let [loadingResult, setLoadingResult] = useState(true);
  let [subscribed, setSubscribe] = useState(false);
  let [resultSet, setResultSet] = useState(result);
  let [bracketArray, setBracketArray] = useState<Map<number, string>>();
  const sendRequestNotification = () => {
    if (!userConsent) {
      return;
    }
    if (!requestNumber || requestNumber.length === 0) {
      return;
    }
    onClickSusbribeToPushNotification().then((val) => {
      onClickSendSubscriptionToPushServer().then(async function (
        subscriptionId
      ) {
        if (subscriptionId) {
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
              message.success(lang.notification_turned_on);
            }
          });
        }
      });
    });
  };

  const requestNotification = async () => {
    onClickAskUserPermission().then((result) => {
      if (result === "granted") {
        sendRequestNotification();
      }
    });
  };

  useEffect(() => {
    processingResponse(
      requestNumber,
      setResultSet,
      resultSet,
      setLoadingResult
    );
    setBracketArray(temp_array);

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

  useEffect(() => {
    let onz_bracket_map = new Map<number, string>();
    resultSet.helice.forEach((helice, h_index) => {
      helice.quadruplex.forEach((quadruplex, q_index) => {
        quadruplex.tetrad.forEach((tetrad, t_index) => {
          tetrad.name.split("-").forEach((nucleotide, n_index) => {
            onz_bracket_map.set(
              resultSet.nucleotide[
                resultSet.nucleotide.findIndex((value, index, obj) => {
                  return value.name == nucleotide;
                })
              ].number,
              ONZ_COLORS_STRING[tetrad.onz_class]
            );
          });
        });
      });
    });
    setBracketArray(onz_bracket_map);
  }, [resultSet]);
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
          {subscribed ? lang.notification_turned_on : lang.turn_on_notification}
        </Button>
      ) : (
        <></>
      )}

      <h2>
        code:{" "}
        <span
          onClick={() => {
            window.navigator["clipboard"].writeText(requestNumber!);
            message.success("Request code has been saved to clipboard.");
          }}
        >
          <Tooltip title="Click here to copy to clipboard.">
            <i>{requestNumber}</i>
          </Tooltip>
        </span>
      </h2>

      <Steps current={resultSet.status} status="wait">
        <Step title="Make request" description="" />
        <Step title="Waiting in queue" description="" />
        <Step title="Processing" description="" />
        <Step
          title="Done"
          description={
            resultSet.status === 4
              ? "Results will be stored until " + resultSet.remove_date + "."
              : ""
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
              <br />
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
                Quadruplexes not found
              </h2>
            </>
          ) : (
            <Tabs defaultActiveKey="0" type="card" tabPosition={"top"}>
              {[...Array.from(resultSet.helice, (z, i) => z)].map((z, i) => (
                <TabPane tab={`N4-Helix ${i + 1}`} key={i}>
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
                          {v.loopClassification.split(" ")[0] != "-" ? (
                            <Descriptions.Item label="Loop topology:">
                              <Tooltip
                                title={
                                  <Image
                                    alt={v.loopClassification.split(" ")[0]}
                                    src={require("../../assets/da-silva/" +
                                      v.loopClassification.split(" ")[0] +
                                      ".svg")}
                                  />
                                }
                                color={"white"}
                              >
                                <u>{v.loopClassification}</u>
                                <sup>?</sup>
                              </Tooltip>
                            </Descriptions.Item>
                          ) : (
                            <></>
                          )}
                          {v.tetrad_combination != "" ? (
                            <Descriptions.Item label="Tetrad combination:">
                              <>
                                {v.tetrad_combination
                                  .split(", ")
                                  .map((value, ind, array) => {
                                    return (
                                      <Tooltip
                                        title={
                                          <div
                                            style={{
                                              display: "flex",
                                              direction: "ltr",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <h3>{value}a</h3>
                                              <Image
                                                alt={value}
                                                src={require("../../assets/da-silva/" +
                                                  value +
                                                  "a.svg")}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <h3>{value}b</h3>
                                              <Image
                                                alt={value}
                                                src={require("../../assets/da-silva/" +
                                                  value +
                                                  "b.svg")}
                                              />
                                            </div>
                                          </div>
                                        }
                                        color={"white"}
                                      >
                                        <u>{value}</u>
                                        <sup>?</sup>
                                        {array.length - 1 > ind ? ", " : ""}
                                      </Tooltip>
                                    );
                                  })}
                              </>
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
                          {resultSet.dot_bracket.sequence
                            .split("")
                            .map((sequence, index) =>
                              sequence == "-" ? (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              ) : bracketArray?.has(
                                  index +
                                    1 -
                                    (
                                      resultSet.dot_bracket.sequence
                                        .slice(0, index)
                                        .match(/-/g) || []
                                    ).length
                                ) ? (
                                <Tooltip
                                  placement="top"
                                  title={
                                    STRING_ONZ_COLORS[
                                      bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ) || ""
                                    ]
                                  }
                                >
                                  <span
                                    style={{
                                      fontFamily: '"PT Mono", monospace',
                                      backgroundColor: bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ),
                                      color:
                                        ONZ_TEXTS_COLOR_STRING[
                                          STRING_ONZ_COLORS[
                                            bracketArray?.get(
                                              index +
                                                1 -
                                                (
                                                  resultSet.dot_bracket.sequence
                                                    .slice(0, index)
                                                    .match(/-/g) || []
                                                ).length
                                            )!
                                          ]
                                        ],
                                    }}
                                  >
                                    {sequence}
                                  </span>
                                </Tooltip>
                              ) : (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              )
                            )}
                          <br />
                          {resultSet.dot_bracket.line1
                            .split("")
                            .map((sequence, index) =>
                              sequence == "-" ? (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              ) : bracketArray?.has(
                                  index +
                                    1 -
                                    (
                                      resultSet.dot_bracket.sequence
                                        .slice(0, index)
                                        .match(/-/g) || []
                                    ).length
                                ) ? (
                                <Tooltip
                                  placement="top"
                                  title={
                                    STRING_ONZ_COLORS[
                                      bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ) || ""
                                    ]
                                  }
                                >
                                  <span
                                    style={{
                                      fontFamily: '"PT Mono", monospace',
                                      backgroundColor: bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ),
                                      color:
                                        ONZ_TEXTS_COLOR_STRING[
                                          STRING_ONZ_COLORS[
                                            bracketArray?.get(
                                              index +
                                                1 -
                                                (
                                                  resultSet.dot_bracket.sequence
                                                    .slice(0, index)
                                                    .match(/-/g) || []
                                                ).length
                                            )!
                                          ]
                                        ],
                                    }}
                                  >
                                    {sequence}
                                  </span>
                                </Tooltip>
                              ) : (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              )
                            )}

                          <br />
                          {resultSet.dot_bracket.line2
                            .split("")
                            .map((sequence, index) =>
                              sequence == "-" ? (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              ) : bracketArray?.has(
                                  index +
                                    1 -
                                    (
                                      resultSet.dot_bracket.sequence
                                        .slice(0, index)
                                        .match(/-/g) || []
                                    ).length
                                ) ? (
                                <Tooltip
                                  placement="top"
                                  title={
                                    STRING_ONZ_COLORS[
                                      bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ) || ""
                                    ]
                                  }
                                >
                                  <span
                                    style={{
                                      fontFamily: '"PT Mono", monospace',
                                      backgroundColor: bracketArray?.get(
                                        index +
                                          1 -
                                          (
                                            resultSet.dot_bracket.sequence
                                              .slice(0, index)
                                              .match(/-/g) || []
                                          ).length
                                      ),
                                      color:
                                        ONZ_TEXTS_COLOR_STRING[
                                          STRING_ONZ_COLORS[
                                            bracketArray?.get(
                                              index +
                                                1 -
                                                (
                                                  resultSet.dot_bracket.sequence
                                                    .slice(0, index)
                                                    .match(/-/g) || []
                                                ).length
                                            )!
                                          ]
                                        ],
                                    }}
                                  >
                                    {sequence}
                                  </span>
                                </Tooltip>
                              ) : (
                                <span
                                  style={{ fontFamily: '"PT Mono", monospace' }}
                                >
                                  {sequence}
                                </span>
                              )
                            )}
                          <br />
                        </p>
                        <Suspense fallback={renderLoader()}>
                          <StructureVisualisation
                            value={v}
                            resultSet={resultSet}
                          />
                        </Suspense>
                        <Divider />
                        <Suspense fallback={renderLoader()}>
                          <TetradTable
                            value={v.tetrad}
                            g4Limited={resultSet.g4_limited}
                            isDesktop={isDesktop}
                          />
                        </Suspense>
                        <Divider />
                        <Suspense fallback={renderLoader()}>
                          <LoopTable value={v.loop} isDesktop={isDesktop} />
                        </Suspense>
                        <Divider />
                        <Suspense fallback={renderLoader()}>
                          <ChiAngleTable
                            value={v.chi_angle_value}
                            isDesktop={isDesktop}
                          />
                        </Suspense>
                      </TabPane>
                    ))}
                  </Tabs>
                  <Divider />
                  <Suspense fallback={renderLoader()}>
                    <TetradPairTable
                      value={z.tetrad_pair}
                      isDesktop={isDesktop}
                    />
                  </Suspense>

                  <Divider />
                </TabPane>
              ))}
            </Tabs>
          )}
          {resultSet.helice.length == 0 ? (
            <></>
          ) : (
            <>
              <Suspense fallback={renderLoader()}>
                <BasePairTable
                  value={resultSet.base_pair}
                  isDesktop={isDesktop}
                />
              </Suspense>

              <Divider />
              <Suspense fallback={renderLoader()}>
                <NucleotideTable
                  value={resultSet.nucleotide}
                  isDesktop={isDesktop}
                />
              </Suspense>
            </>
          )}
        </>
      )}
    </>
  );
};
