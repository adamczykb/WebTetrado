import { Button } from "antd";
import { Parser } from "json2csv";
import { DownloadOutlined } from "@ant-design/icons";

export function JsonToCsvButton(data: any, fields: string[], header_names: string[], file_name: string) {
  function parseToCSV() {
    const opts = { fields: fields };
    const parser = new Parser(opts);

    for (let i = 0; i < data.length; i++) {
      Object.entries(data[i]).map((value, index) => {
        if (value[1]!.toString().indexOf(',') > -1) {
          data[i][value[0]] = '[' + value[1]!.toString() + ']'
        }
      })
    }
    let csv = parser.parse(data);
    const element = document.createElement("a");

    for (let i = 0; i < fields.length; i++) {
      csv = csv.replace(fields[i], header_names[i])
    }
    const file = new Blob(
      [csv.replaceAll('"', "").replaceAll("[", '"[').replaceAll("]", ']"')],
      { type: "text/plain" }
    );

    element.href = URL.createObjectURL(file);
    element.download = file_name + ".csv";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <Button
      type="primary"
      shape="round"
      onClick={parseToCSV}>
      <DownloadOutlined rev={undefined} />
      Download CSV
    </Button>
  );
}
