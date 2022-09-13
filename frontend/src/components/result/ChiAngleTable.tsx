import { Table } from "antd";
import { chi_angle_value } from "../../types/RestultSet";

export const ChiAngleTable = (data: chi_angle_value[], isDesktop: Boolean) => {
  const columns_chi = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
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
      title: "Nucleotide 3",
      dataIndex: "nt3",
      key: "nt3",
    },
    {
      title: "Nucleotide 4",
      dataIndex: "nt4",
      key: "nt4",
    },
  ];
  return (
    <>
      <h2 id="chi-angle" style={{ marginTop: "40px" }}>
        Chi angle value and type in each nucleotide
      </h2>
      <Table
        style={{ textAlign: "center" }}
        dataSource={data}
        columns={columns_chi}
        scroll={isDesktop ? { x: "auto" } : { x: "100%" }}
      />
    </>
  );
};
