import { Table } from "antd";
import { tetrad_pair } from "../../types/RestultSet";

interface TetradPariTableArguments {
  value: tetrad_pair[];
  isDesktop: boolean;
}

export default function TetradPairTable(props: TetradPariTableArguments) {
  const columns_tetrad_pairs = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Tetrad pairs",
      dataIndex: "pair",
      key: "pair",
    },
    {
      title: "Twist [°]",
      dataIndex: "twist",
      key: "twist",
    },
    {
      title: "Rise [Å]",
      dataIndex: "rise",
      key: "rise",
    },
    {
      title: "Strand direction",
      dataIndex: "strand_direction",
      key: "strand_direction",
    },
  ];
  return (
    <>
      <h2 id="tetrad-pairs" style={{ marginTop: "40px" }}>
        Tetrad pairs
      </h2>
      <Table
        style={{ textAlign: "center" }}
        dataSource={props.value}
        scroll={props.isDesktop ? { x: "auto" } : { x: "100%" }}
        columns={columns_tetrad_pairs}
      />
    </>
  );
}
