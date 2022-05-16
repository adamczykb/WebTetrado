import { Button, Result } from "antd";
import { Content } from "antd/es/layout/layout";

const InternalServerError = () => (
  <Content style={{ padding: "0 24px", minHeight: 280 }}>
    <Result
      status="500"
      title="500"
      subTitle="Internal Server Error "
      extra={
        <a href={"/"}>
          <Button type="primary">Back Home</Button>
        </a>
      }
    />
  </Content>
);

export default InternalServerError;
