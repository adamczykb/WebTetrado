import { message, Input, Button, Switch, Form, Collapse } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import config from "../../config.json";
import { processingRequest } from "../../utils/adapters/ProcessingRequest";
import { useCookies } from "react-cookie";
import { useMediaQuery } from "react-responsive";
const { Panel } = Collapse;

export const RequestForm = () => {

  let form_values = {
    fileId: "",
    rscbPdbId: "",
    settings: {
      complete2d: false,
      noReorder: false,
      stackingMatch: 2,
      g4Limited:true,
      strict: false,
    },
  };
  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" })
  const [formValues, setFormValues] = useState(form_values);
  const [loading, setLoading] = useState(false);
  const props = {
    name: "structure",
    multiple: false,
    action: config.SERVER_URL + "/api/upload/structure/",
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      const isCifOrPdb =
        file.type === "chemical/x-cif" ||
        file.type === "chemical/x-pdb" ||
        fileName[fileNameLength - 1].toLowerCase() === "cif" ||
        fileName[fileNameLength - 1].toLowerCase() === "pdb";
      if (!isCifOrPdb) {
        message.error(`${file.name} is not a proper file`);
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      setFormValues({ ...formValues, fileId: "" });
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        message.info("Uploading file in progress...");
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFormValues({
          ...formValues,
          rscbPdbId: "",
          fileId: info.file.response.id,
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setFormValues({ ...formValues, fileId: "" });
      }
    },
    onDrop(e: any) {},
  };
  const submit = () => {
    if (formValues.fileId == "" && formValues.rscbPdbId == "") {
      message.error("None of structure sources are provided 😱");
      return null;
    }
    if (
      formValues.settings.stackingMatch < 1 &&
      formValues.settings.stackingMatch > 2
    ) {
      message.error("Wrong value in stacking match option");
      return null;
    }
    setLoading(true);
    processingRequest(formValues,setLoading);
  };
  return (
    <Form labelCol={{ span: 16 }} wrapperCol={{ span: 32 }}>
      {isDesktop ? (
        <div className={"horizontal-center"} style={{ height: 250 }}>
          <div>
            <div style={{ width: "400px", height: "200px" }}>
              <h4 style={{ margin: "0", marginBottom: "5px" }}>
                From local drive:
              </h4>
              <Dragger {...props} style={{ padding: "20px" }}>
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
                  value={formValues.rscbPdbId}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rscbPdbId: e.target.value.toUpperCase(),
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
          <Dragger {...props} style={{ padding: "20px" }}>
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
              value={formValues.rscbPdbId}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  rscbPdbId: e.target.value.toUpperCase(),
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
            <Form.Item valuePropName="checked">
              <div className="horizontal-item-center">
                <div className="item-label">Complete 2D: </div>
                <Switch
                  size={isDesktop ? "small" : "default"}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  onChange={() =>
                    setFormValues({
                      ...formValues,
                      settings: {
                        ...formValues.settings,
                        complete2d: !formValues.settings.complete2d,
                      },
                    })
                  }
                />
              </div>
            </Form.Item>
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
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      settings: {
                        ...formValues.settings,
                        stackingMatch: e.target.valueAsNumber,
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
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={submit}
          >
            Send request
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
