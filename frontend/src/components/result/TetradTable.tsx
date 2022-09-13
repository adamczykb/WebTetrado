import { Button, Table, Tooltip, Image } from "antd";
import { tetrad } from "../../types/RestultSet";
import { DownloadOutlined } from "@ant-design/icons";
export const TetradTable = (
  data: tetrad[],
  g4Limited: boolean,
  isDesktop: Boolean
) => {
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
      title: "Tetrad combination",
      dataIndex: "gbaClassification",
      key: "gbaClassification",
      render: (text: string) => (
        <>
          <Tooltip
            title={
              <Image src={require("../../assets/da-silva/" + text + ".svg")} />
            }
            color={"white"}
          >
            <u>{text}</u>
            <sup>?</sup>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Planarity [Å]",
      dataIndex: "planarity",
      key: "planarity",
    },
    {
      title: "Download",
      dataIndex: "file",
      key: "file",
      render: (text: string) => (
        <>
          {text.length > 0 ? (
            <a href={text}>
              <Button type="primary" icon={<DownloadOutlined />} />
            </a>
          ) : (
            <></>
          )}
        </>
      ),
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
        scroll={isDesktop ? { x: "auto" } : { x: "100%" }}
        rowClassName={(_r, i) =>
          data[i].sequence == "GGGG" && g4Limited ? "colored-row" : ""
        }
      />
    </>
  );
};
