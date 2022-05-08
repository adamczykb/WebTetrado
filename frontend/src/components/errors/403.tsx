import { Button, Result } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";

const SiteForbidden = () => (
  <Content style={{ padding: "0 24px", minHeight: 280 }}>
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you don't have permission to visit this site."
      extra={
        <a href={"/"}>
          <Button type="primary">Back Home</Button>
        </a>
      }
    />
  </Content>
);

export default SiteForbidden;
