import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button } from "antd";
import { Menu } from "../common/Menu";

export const MobileNavHeader = () => {
  const [isMenuExpanded, setMenuExpanded] = useState<Boolean>(false);

  return (
    <>
      <Menu isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />
      <div id="webtetrado-banner-mobile">
        <div style={{ width: "67.15px" }}></div>
        <a href={"/"}>
          <div className="mobile-logo">WebTetrado</div>
        </a>
        <Button
          type="text"
          onClick={() => {
            setMenuExpanded(!isMenuExpanded);
          }}
          style={{ height: "auto" }}
        >
          <MenuOutlined id="MenuOutlined-mobile" />
        </Button>
      </div>
    </>
  );
};
