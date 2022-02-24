import { Table } from "antd";
import { loop } from "../../types/RestultSet";

export const LoopTable = (data: loop[]) => {
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
  return (
    <>
      <h2 id="loops" style={{ marginTop: "40px" }}>
        Loops
      </h2>
      <Table
        style={{ textAlign: "center" }}
        dataSource={data}
        columns={columns_loops}
      />
    </>
  );
};
