import { Table } from "antd";
import {  nucleotide } from "../../types/RestultSet";

export const NucleotideTable = (data: nucleotide[]) => {
  const columns_nucleotides = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi angle (value) [°]",
      dataIndex: "chi_angle",
      key: "chi_angle",
    },
    {
      title: "Chi angle (type)",
      dataIndex: "glycosidicBond",
      key: "glycosidicBond",
    },
  ];
  return (
    <>
      <h2 id="nucleotides" style={{ marginTop: "40px" }}>
        Nucleotides
      </h2>
      <Table
        style={{ textAlign: "center" }}
        dataSource={data}
        columns={columns_nucleotides}
      />
    </>
  );
};
