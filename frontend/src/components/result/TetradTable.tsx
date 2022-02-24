import { Table } from "antd";
import { tetrad } from "../../types/RestultSet";

export const TetradTable = (data: tetrad[]) => {
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
  return (
    <>
      <h2 id="tetrads" style={{ marginTop: "40px" }}>
        Tetrads
      </h2>
      <Table
        style={{ textAlign: "center" }}
        dataSource={data}
        columns={columns_tetrad}
      />
    </>
  );
};
