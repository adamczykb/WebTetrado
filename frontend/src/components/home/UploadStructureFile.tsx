import { message, UploadFile, UploadProps } from "antd";
import { request_form_values } from "../../types/RestultSet";
import config from "../../config.json";
import lang from "../../lang.json";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

interface UploadFileArguments {
  maxModel: number;
  setMaxModel: any;
  formValues: request_form_values;
  setFormValues: any;
  fileListState: UploadFile[] | undefined;
  setFileList: any;
}

const UploadStructureFile = (props: UploadFileArguments) => {
  let uploader_props: UploadProps = {
    name: "structure",
    multiple: false,
    action: config.SERVER_URL + "/api/upload/structure/",
    maxCount: 1,
    beforeUpload: (file: File) => {
      let fileName = file.name.split(".");
      let fileNameLength = file.name.split(".").length;
      props.setFileList(undefined);
      props.setFormValues({
        ...props.formValues,
        fileId: "",
        rcsbPdbId: "",
        settings: { ...props.formValues.settings, model: 1 },
      });
      props.setMaxModel(0);
      const isCifOrPdb =
        file.type === "chemical/x-cif" ||
        file.type === "chemical/x-pdb" ||
        fileName[fileNameLength - 1].toLowerCase() === "cif" ||
        fileName[fileNameLength - 1].toLowerCase() === "pdb";
      if (!isCifOrPdb) {
        message.error(lang.file_not_pdb_cif + `${file.name}`);
        props.setFormValues({ ...props.formValues, fileId: "" });
        props.setFileList([] as UploadFile<File>[]);
        return false;
      } else {
        message.info(lang.uploading_file + `${file.name}`);
      }
      return isCifOrPdb;
    },
    onRemove(info: any) {
      props.setFormValues({ ...props.formValues, fileId: "" });
      props.setFileList([] as UploadFile<File>[]);
      props.setMaxModel(0);
    },
    onChange(event) {
      const { status } = event.file;
      if (status === "done") {
        if (event.file.response.error.length > 0) {
          message.error(lang.file_not_pdb_cif + `${event.file.name}`);
          props.setFileList([] as UploadFile<File>[]);
          props.setFormValues({ ...props.formValues, fileId: "" });
          return;
        }
        message.success(lang.file_upload_success + `${event.file.name}`);
        props.setFormValues({
          ...props.formValues,
          rcsbPdbId: "",
          fileId: event.file.response.id,
          settings: { ...props.formValues.settings, model: 1 },
        });

        props.setMaxModel(event.file.response.models);
        props.setFileList([event.file]);
      } else if (status === "error") {
        message.error(lang.error_uploading + `${event.file.name}`);
        props.setFormValues({ ...props.formValues, fileId: "" });
        props.setFileList(undefined);
      }
    },
    onDrop(e: any) {
      props.setFileList(undefined);
      props.setFormValues({ ...props.formValues, fileId: "" });
    },
  };
  return (
    <Dragger
      fileList={props.fileListState ? props.fileListState : undefined}
      {...uploader_props}
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
  );
};

export default UploadStructureFile;
