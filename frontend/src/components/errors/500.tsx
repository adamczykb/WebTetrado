import { Button } from "antd";
import { Content } from "antd/es/layout/layout";
import crying_rna from "../../assets/images/crying_rna.png";

const InternalServerError = () => (
  <Content style={{ padding: "0 24px", minHeight: 280 }}>
    <div
      style={{ width: "100%", flexDirection: "column", paddingBottom: "50px" }}
      className={"horizontal-center vertical-center"}
    >
      <img
        alt="crying_rna"
        style={{ width: "400px", paddingRight: "36px" }}
        src={crying_rna}
      />
      <h1>500</h1>
      <p style={{ color: "gray" }}>Internal server error</p>
      <a href={"/"}>
        <Button type="primary">Back Home</Button>
      </a>
    </div>
  </Content>
);

export default InternalServerError;
