import { Table } from "antd";
import { tetrad } from "../../types/RestultSet";
import '../../assets/css/DesktopLayout.css'
export const TetradTable = (data: tetrad[],g4Limited:boolean) => {
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
        rowClassName={(_r, i) => (data[i].sequence=='GGGG' && g4Limited ? 'colored-row' : '')}
      />
    </>
  );
};
