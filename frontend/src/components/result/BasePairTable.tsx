import { Table } from "antd";
import { base_pair } from "../../types/RestultSet";

export const BasePairTable = (data: base_pair[]) => {
  const columns_base_pairs = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Edge 3",
      dataIndex: "edge3",
      key: "edge3",
    },
    {
      title: "Edge 5",
      dataIndex: "edge5",
      key: "edge5",
    },
    {
      title: "Nucleotide 1",
      dataIndex: "nt1",
      key: "nt1",
    },
    {
      title: "Nucleotide 2",
      dataIndex: "nt2",
      key: "nt2",
    },
    {
      title: "Stericity",
      dataIndex: "stericity",
      key: "stericity",
    },
  ];
  return (
    <>
      <h2 id="base-pairs" style={{ marginTop: "40px" }}>
            Base pairs
          </h2>
          <Table
            style={{ textAlign: "center" }}
            dataSource={data}
            columns={columns_base_pairs}
          />
    </>
  );
};
