import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button } from "antd";
import { Menu } from "../common/Menu";

export const MobileNavHeader = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <>
      {Menu(navExpanded, setNavExpanded)}
      <div id="webtetrado-banner-mobile">
        <div style={{ width: "67.15px" }}></div>
        <a href={"/"}>
          <div className="mobile-logo">WebTetrado</div>
        </a>
        <Button
          type="text"
          onClick={() => {
            setNavExpanded(!navExpanded);
          }}
          style={{ height: "auto" }}
        >
          <MenuOutlined id="MenuOutlined-mobile" />
        </Button>
      </div>
    </>
  );
};
