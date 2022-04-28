import { Button, Result } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";

const NotFound = () => (
  <Content style={{ padding: "0 24px", minHeight: 280 }}>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <a href={"/"}>
          <Button type="primary">Back Home</Button>
        </a>
      }
    />
  </Content>
);

export default NotFound;
