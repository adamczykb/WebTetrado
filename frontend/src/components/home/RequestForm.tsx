import { message, Input, Button, Switch, Form, Collapse, Slider, Spin } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import config from "../../config.json";
import { processingRequest } from "../../utils/adapters/ProcessingRequest";
import { useMediaQuery } from "react-responsive";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { checkRcsbMaxModel } from "../../utils/adapters/CheckRcsbMaxModel";
import lang from "../../lang.json";
const { Panel } = Collapse;

export const RequestForm = () => {
  let form_values = {
    fileId: "",
    rcsbPdbId: "",
    settings: {
      complete2d: false,
      noReorder: false,
      stackingMatch: 2,
      g4Limited: true,
      strict: false,
      model: 1,
    },
  };
  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
  const [loading, setLoading] = useState(false);
  const [maxModel, setMaxModel] = useState(0);
  const [pdbError, setPDBError] = useState(false);
  const [maxModelQuery, setMaxModelQuery] = useState(false);
  const [formValues, setFormValues] = useState(form_values);
  const [fileListState, setFileList] = useState<UploadFile[] | undefined>(
    undefined
  );

  let props: UploadProps = {
    name: "structure",
    multiple: false,
    action: config.SERVER_URL + "/api/upload/structure/",
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      setFileList(undefined);
      setFormValues({
        ...formValues,
        fileId: "",
        rcsbPdbId: "",
        settings: { ...formValues.settings, model: 1 },
      });
      setMaxModel(0);
      const isCifOrPdb =
        file.type === "chemical/x-cif" ||
        file.type === "chemical/x-pdb" ||
        fileName[fileNameLength - 1].toLowerCase() === "cif" ||
        fileName[fileNameLength - 1].toLowerCase() === "pdb";
      if (!isCifOrPdb) {
        message.error(lang.file_not_pdb_cif + `${file.name}` );
        setFormValues({ ...formValues, fileId: "" });
        setFileList([] as UploadFile<File>[]);
        return false;
      } else {
        message.info(lang.uploading_file +`${file.name}` );
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      setFormValues({ ...formValues, fileId: "" });
      setFileList([] as UploadFile<File>[]);
      setMaxModel(0);
    },
    onChange(event) {
      const { status } = event.file;
      if (status === "done") {
        if (event.file.response.error.length > 0) {
          message.error(`${event.file.name}` + lang.file_not_pdb_cif);
          setFileList([] as UploadFile<File>[]);
          setFormValues({ ...formValues, fileId: "" });
          return;
        }
        message.success(lang.file_upload_success+`${event.file.name}` );
        setFormValues({
          ...formValues,
          rcsbPdbId: "",
          fileId: event.file.response.id,
          settings: { ...formValues.settings, model: 1 },
        });

        setMaxModel(event.file.response.models);
        setFileList([event.file]);
      } else if (status === "error") {  
        message.error(lang.error_uploading+ `${event.file.name}` );
        setFormValues({ ...formValues, fileId: "" });
        setFileList(undefined);
      }
    },
    onDrop(e: any) {
      setFileList(undefined);
      setFormValues({ ...formValues, fileId: "" });
    },
  };
  const submit = () => {
    if (
      (!fileListState || fileListState.length == 0) &&
      formValues.rcsbPdbId.length < 4
    ) {
      message.error(lang.lack_of_source);
      return null;
    }

    if (formValues.settings.stackingMatch == NaN) {
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
        setMaxModel(0);

        if (formValues.rcsbPdbId.length === 4) {
    setMaxModelQuery(true);
      checkRcsbMaxModel(setMaxModel, setPDBError, formValues.rcsbPdbId, setMaxModelQuery);
      setFormValues({
        ...formValues,
        settings: { ...formValues.settings, model: 1 },
      });
    } else {
      setPDBError(false);
    }
  }, [formValues.rcsbPdbId]);
  //useEffect(() => {
  //if (fileListState && fileListState.length > 0) {
  //setFormValues({ ...formValues, rcsbPdbId: "" });
  //}
  //}, [fileListState]);
  return (
    <>
      <h2
        id="check-your-structure"
        style={{ padding: "20px 0", textAlign: "center" }}
      >
        Check out examples
      </h2>
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <Button
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
          onClick={() => {
            setFileList([{name:"q-ugg-5k-salt_4…00ns_frame1065.pdb",uid:""}]);
            setFormValues({
              ...formValues,
              fileId: "rdy_q-ugg-5k-salt-0-00ns-0rame1065_pdb",
              rcsbPdbId: "",
            });
              setMaxModel(1); 
          }}
      >RNA G-Quadruplex in solution
        </Button>      </div>
      <Form labelCol={{ span: 16 }} wrapperCol={{ span: 32 }}>
        {isDesktop ? (
          <div className={"horizontal-center"} style={{ height: 250 }}>
            <div>
              <div style={{ width: "400px", height: "200px" }}>
                <h4 style={{ margin: "0", marginBottom: "5px" }}>
                  From local drive:
                </h4>
                <Dragger
                  fileList={fileListState ? fileListState : undefined}
                  {...props}
                  style={{ padding: "20px" }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <h3 className="ant-upload-text">
                    Click or drag file to this area to upload
                  </h3>
                  <h3 className="ant-upload-hint">*.cif, *.pdb</h3>
                </Dragger>
              </div>
            </div>
            <div className="split-layout__divider" style={{ width: "90px" }}>
              <div className="split-layout__rule"></div>
              <div className="split-layout__label">Or</div>
              <div className="split-layout__rule"></div>
            </div>
            <div style={{ width: "400px" }} className={"vertical-center"}>
              <div>
                <h4 style={{ margin: "0" }}>From Protein Data Bank:</h4>
                <Form.Item>
                  <Input
                    name="rcsbPdbId"
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
            <Dragger
              fileList={fileListState ? fileListState : undefined}
              {...props}
              style={{ padding: "20px" }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <h3 className="ant-upload-text">
                Click or drag file to this area to upload
              </h3>
              <h3 className="ant-upload-hint">*.cif, *.pdb</h3>
            </Dragger>

            <div className="split-layout__divider__row">
              <div className="split-layout__rule__row"></div>
              <div className="split-layout__label__row">Or</div>
              <div className="split-layout__rule__row"></div>
            </div>

            <h4 style={{ margin: "0" }}>From Protein Data Bank:</h4>
            <Form.Item>
              <Input
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
          <Collapse defaultActiveKey={1} style={{ width: "70%" }}>
            <Panel header="Additional settings" key="1">
                {//<Form.Item valuePropName="checked">
                //<div className="horizontal-item-center">
                  //<div className="item-label">Complete 2D: </div>
                  //<Switch
                    //size={isDesktop ? "small" : "default"}
                    //checkedChildren="Yes"
                    //unCheckedChildren="No"
                    //onChange={() =>
                      //setFormValues({
                        //...formValues,
                        //settings: {
                          //...formValues.settings,
                          //complete2d: !formValues.settings.complete2d,
                        //},
                      //})
                    //}
                  ///>
                //</div>
                //</Form.Item>
                }
              <Form.Item valuePropName="checked">
                <div className="horizontal-item-center">
                  <div className="item-label">No reorder: </div>
                  <Switch
                    size={isDesktop ? "small" : "default"}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        settings: {
                          ...formValues.settings,
                          noReorder: !formValues.settings.noReorder,
                        },
                      })
                    }
                  />
                </div>
              </Form.Item>
              <Form.Item valuePropName="checked">
                <div className="horizontal-item-center">
                  <div className="item-label">G4-limited search: </div>
                  <Switch
                    size={isDesktop ? "small" : "default"}
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
                  <div className="item-label">Strict: </div>
                  <Switch
                    size={isDesktop ? "small" : "default"}
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
                    style={isDesktop ? {} : { padding: "5px 0" }}
                  >
                    Stacking mismatch:
                  </div>
                  <Input
                    style={{ width: "calc(50% - 5px)", maxWidth: "100px" }}
                    size={isDesktop ? "small" : "middle"}
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
              {maxModel > 0 ? (
                <>
                  <Form.Item>
                    <div className="horizontal-item-center">
                      <div
                        className="item-label"
                        style={isDesktop ? {} : { padding: "5px 0" }}
                      >
                        Model number:
                      </div>
                      <Slider
                        min={1}
                        max={maxModel}
                        style={{ width: "200px" }}
                        onChange={(value: number) =>
                          setFormValues({
                            ...formValues,
                            settings: {
                              ...formValues.settings,
                              model: value,
                            },
                          })
                        }
                        value={formValues.settings.model}
                        step={1}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <div className="horizontal-item-center">
                      <div
                        className="item-label"
                        style={isDesktop ? {} : { padding: "5px 0" }}
                      ></div>
                      <Input
                        style={{ width: "calc(50% - 5px)", maxWidth: "100px" }}
                        size={isDesktop ? "small" : "middle"}
                        type={"number"}
                        min="1"
                        max={maxModel}
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
                </>
            ) : maxModelQuery?
            <Form.Item> 
                        <p className="horizontal-center">Waiting for server response...</p>
                        <Spin className="horizontal-center"/>
            </Form.Item>
            :
            <></>
            }
            </Panel>
          </Collapse>
        </div>
        <div className={"horizontal-center"} style={{ paddingTop: "30px" }}>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              disabled={
                  (((!fileListState || fileListState.length == 0) &&
                  formValues.rcsbPdbId.length < 4) ||
                pdbError)||maxModel==0
              }
              loading={loading}
              onClick={submit}
            >
              Send request
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
