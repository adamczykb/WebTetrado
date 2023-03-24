import {
  Button,
  Collapse,
  Form,
  Input,
  message,
  Slider,
  Spin,
  Switch,
  Tooltip,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useEffect, useState } from "react";
import { UseAppContext } from "../../AppContextProvider";
import lang from "../../lang.json";
import { request_form_values } from "../../types/RestultSet";
import { checkRcsbMaxModel } from "../../utils/adapters/checkRcsbMaxModel";
import { processingRequest } from "../../utils/adapters/processingRequest";
import UploadStructureFile from "./UploadStructureFile";
const { Panel } = Collapse;

export default function RequestForm() {
  const context = UseAppContext();
  let form_values: request_form_values = {
    fileId: "",
    rcsbPdbId: "",
    settings: {
      complete2d: false,
      reorder: true,
      stackingMatch: 2,
      g4Limited: true,
      strict: false,
      model: 1,
    },
  };
  const [loading, setLoading] = useState(false);
  const [maxModel, setMaxModel] = useState(1);
  const [pdbError, setPDBError] = useState(false);
  const [maxModelQuery, setMaxModelQuery] = useState(false);
  const [formValues, setFormValues] = useState(form_values);
  const [fileListState, setFileList] = useState<UploadFile[] | undefined>(
    undefined
  );
  const submit = () => {
    if (
      (!fileListState || fileListState.length == 0) &&
      formValues.rcsbPdbId.length < 4
    ) {
      message.error(lang.lack_of_source);
      return null;
    }

    if (Number.isNaN(formValues.settings.stackingMatch)) {
      formValues.settings.stackingMatch = 2;
    }
    if (
      formValues.settings.stackingMatch < 1 &&
      formValues.settings.stackingMatch > 2
    ) {
      message.error(lang.wrong_value + "stacking match.");
      return null;
    }
    setLoading(true);
    processingRequest(formValues, setLoading);
  };
  useEffect(() => {
    if (formValues.fileId === "") setMaxModel(0);

    if (formValues.rcsbPdbId.length === 4) {
      setMaxModelQuery(true);
      checkRcsbMaxModel(
        setMaxModel,
        setPDBError,
        formValues.rcsbPdbId,
        setMaxModelQuery
      );
      setFormValues({
        ...formValues,
        settings: { ...formValues.settings, model: 1 },
      });
    } else {
      setPDBError(false);
    }
  }, [formValues.rcsbPdbId]);
  return (
    <>

      <div style={{ marginBottom: "40px", marginLeft: 'auto', marginRight: 'auto', textAlign: "left", width: '100%', maxWidth: '890px' }}>
        <h4
          style={{ textAlign: 'left', padding: "0" }}
        >
          From example collection:
        </h4>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([]);
            setFormValues({
              ...formValues,
              fileId: "",
              rcsbPdbId: "2HY9",
            });
          }}
        >
          2HY9
        </Button>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([]);
            setFormValues({
              ...formValues,
              fileId: "",
              rcsbPdbId: "6RS3",
            });
          }}
        >
          6RS3
        </Button>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([]);
            setFormValues({
              ...formValues,
              fileId: "",
              rcsbPdbId: "1JJP",
            });
          }}
        >
          1JJP
        </Button>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([]);
            setFormValues({
              ...formValues,
              fileId: "",
              rcsbPdbId: "6FC9",
            });
          }}
        >
          6FC9
        </Button>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([
              { name: "1mdg.cif", uid: "" },
            ]);
            setFormValues({
              ...formValues,
              fileId: "rdy_1mdg_cif",
              rcsbPdbId: "",
              settings: { ...formValues.settings, model: 1 },
            });
            setMaxModel(1);
          }}
        >
          1MDG
        </Button>
        <Button
          className="no-radious"
          size={
            !context.viewSettings.isCompressedViewNeeded ? "large" : "middle"
          }
          onClick={() => {
            setFileList([
              { name: "q-ugg-5k-salt_4…00ns_frame1065.pdb", uid: "" },
            ]);
            setFormValues({
              ...formValues,
              fileId: "rdy_q-ugg-5k-salt-0-00ns-0rame1065_pdb",
              rcsbPdbId: "",
              settings: { ...formValues.settings, model: 1 },
            });
            setMaxModel(1);
          }}
        >
          RNA G-Quadruplex in solution
        </Button>
      </div>
      <Form labelCol={{ span: 16 }} wrapperCol={{ span: 32 }}>
        {!!context.viewSettings.isCompressedViewNeeded ? (
          <div className={"horizontal-center"} style={{ height: 250 }}>
            <div>
              <div style={{ width: "400px", height: "200px" }}>
                <h4 style={{ margin: "0", marginBottom: "5px" }}>
                  From local drive:
                </h4>
                <UploadStructureFile
                  maxModel={maxModel}
                  setMaxModel={setMaxModel}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  fileListState={fileListState}
                  setFileList={setFileList}
                />
              </div>
            </div>
            <div className="split-layout__divider" style={{ width: "90px" }}>
              <div className="split-layout__rule"></div>
              <div className="split-layout__label">or</div>
              <div className="split-layout__rule"></div>
            </div>
            <div style={{ width: "400px" }} className={"vertical-center"}>
              <div>
                <h4 style={{ margin: "0" }}>From Protein Data Bank:</h4>
                <Form.Item>
                  <Input
                    name="rcsbPdbId"
                    data-testid="rcsb-pdb-id-input"
                    value={formValues.rcsbPdbId}
                    status={pdbError ? "error" : ""}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        rcsbPdbId: e.target.value.toUpperCase(),
                      })
                    }
                    disabled={formValues.fileId != ""}
                    style={{
                      width: "200px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                    placeholder={"PDB ID eg. 1D59 "}
                    maxLength={4}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="split-layout__rule__row"
              style={{ borderStyle: "dashed", margin: "20px 0" }}
            ></div>
            <h4 style={{ margin: "0", marginBottom: "5px" }}>
              From local drive:
            </h4>
            <UploadStructureFile
              maxModel={maxModel}
              setMaxModel={setMaxModel}
              formValues={formValues}
              setFormValues={setFormValues}
              fileListState={fileListState}
              setFileList={setFileList}
            />
            <div className="split-layout__divider__row">
              <div className="split-layout__rule__row"></div>
              <div className="split-layout__label__row">or</div>
              <div className="split-layout__rule__row"></div>
            </div>

            <h4 style={{ margin: "0" }}>From Protein Data Bank:</h4>
            <Form.Item>
              <Input
                data-testid="rcsb-pdb-id-input"
                name="rcsbPdbId"
                value={formValues.rcsbPdbId}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    rcsbPdbId: e.target.value.toUpperCase(),
                  })
                }
                disabled={formValues.fileId != ""}
                style={{
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  fontSize: "20px",
                }}
                placeholder={"PDB ID eg. 1D59 "}
                maxLength={4}
              />
            </Form.Item>
            <div
              className="split-layout__rule__row"
              style={{ borderStyle: "dashed", margin: "20px 0" }}
            ></div>
          </div>
        )}

        <div
          className={"horizontal-center"}
          style={{ paddingTop: "30px", fontSize: "17px" }}
        >
          <Collapse defaultActiveKey={1} style={{ width: "100%", maxWidth: '890px' }}>
            <Panel header="Additional settings" key="1">
              <Form.Item>
                <div className="horizontal-item-center">
                  <div
                    className="item-label"
                    style={
                      !context.viewSettings.isCompressedViewNeeded
                        ? { padding: "5px 0" }
                        : {}
                    }
                  >
                    Analyze the model with the number:
                  </div>
                  <Input
                    style={{ width: "calc(50% - 5px)", maxWidth: "100px" }}
                    size={
                      !context.viewSettings.isCompressedViewNeeded
                        ? "middle"
                        : "small"
                    }
                    type={"number"}
                    min="1"
                    max={maxModel}
                    data-testid="model-selector-slider"
                    value={formValues.settings.model}
                    onChange={(e) => {
                      if (e.target.valueAsNumber > maxModel) {
                        setFormValues({
                          ...formValues,
                          settings: {
                            ...formValues.settings,
                            model: maxModel,
                          },
                        });
                      } else {
                        setFormValues({
                          ...formValues,
                          settings: {
                            ...formValues.settings,
                            model: e.target.valueAsNumber,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </Form.Item>
              <Form.Item valuePropName="checked">
                <div className="horizontal-item-center">
                  <div className="item-label"><Tooltip title="Distinguish GGGG tetrads in the result view">Highlight G-tetrads at the output: </Tooltip> </div>
                  <Switch
                    size={
                      !context.viewSettings.isCompressedViewNeeded
                        ? "default"
                        : "small"
                    }
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    defaultChecked
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        settings: {
                          ...formValues.settings,
                          g4Limited: !formValues.settings.g4Limited,
                        },
                      })
                    }
                  />
                </div>
              </Form.Item>
              <Form.Item valuePropName="checked">
                <div className="horizontal-item-center">
                  <div className="item-label">
                    <Tooltip
                      title="Nucleotides in tetrad are found when linked only by
                        cWH pairing"
                    >
                      Detect tetrads with cWH pairings only:{" "}
                    </Tooltip>
                  </div>
                  <Switch
                    size={
                      !context.viewSettings.isCompressedViewNeeded
                        ? "default"
                        : "small"
                    }
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        settings: {
                          ...formValues.settings,
                          strict: !formValues.settings.strict,
                        },
                      })
                    }
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div className="horizontal-item-center">
                  <div
                    className="item-label"
                    style={
                      !context.viewSettings.isCompressedViewNeeded
                        ? { padding: "5px 0" }
                        : {}
                    }
                  >
                    <Tooltip
                      title="A perfect tetrad stacking covers 4 nucleotides; this
                        option can be used with value 1 or 2 to allow this
                        number of nucleotides to be non-stacked with otherwise
                        well aligned tetrad"
                    >
                      Accept stacking mismatch for how many nts:
                    </Tooltip>
                  </div>
                  <Input
                    style={{ width: "calc(50% - 5px)", maxWidth: "100px" }}
                    size={
                      !context.viewSettings.isCompressedViewNeeded
                        ? "middle"
                        : "small"
                    }
                    type={"number"}
                    min="0"
                    max="4"
                    value={formValues.settings.stackingMatch}
                    onChange={(e) => {
                      if (
                        e.target.valueAsNumber > 4 ||
                        e.target.valueAsNumber < 0
                      ) {
                        setFormValues({
                          ...formValues,
                          settings: {
                            ...formValues.settings,
                            stackingMatch: 1,
                          },
                        });
                      } else {
                        setFormValues({
                          ...formValues,
                          settings: {
                            ...formValues.settings,
                            stackingMatch: e.target.valueAsNumber,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </Form.Item>
              <Form.Item valuePropName="checked">
                <div className="horizontal-item-center">
                  <div className="item-label">
                    <Tooltip
                      title="If this option is disabled bi- and tetramolecular quadruplexes can be misclassified acc ONZ taxonomy."
                    >
                      Reorder chains to enable ONZ:{" "}
                    </Tooltip>
                  </div>
                  <Switch
                    size={
                      !context.viewSettings.isCompressedViewNeeded
                        ? "default"
                        : "small"
                    }
                    defaultChecked
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        settings: {
                          ...formValues.settings,
                          reorder: !formValues.settings.reorder,
                        },
                      })
                    }
                  />
                </div>
              </Form.Item>
            </Panel>
          </Collapse>
        </div>

        <div className={"horizontal-center"} style={{ paddingTop: "30px" }}>
          <Form.Item>
            <Button
              data-testid="send-request-button"
              htmlType="submit"
              type="primary"
              disabled={
                ((!fileListState || fileListState.length == 0) &&
                  formValues.rcsbPdbId.length < 4) ||
                pdbError ||
                maxModelQuery
              }
              loading={loading || maxModelQuery}
              onClick={submit}
            >
              Submit task
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
