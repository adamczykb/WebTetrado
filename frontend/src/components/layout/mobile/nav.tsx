import { Header } from "antd/es/layout/layout";
import mainLogo from "../../../assets/images/logo_simple.png";
import { MenuOutlined } from "@ant-design/icons";
import configData from "../../../config.json";
import { useState } from "react";

import '../../../assets/css/MobileLayout.css'

export const MobileNavHeader = () => {
  const [navExpanded, setNavExpanded] = useState(false);


  function toggleNav() {
    setNavExpanded(!navExpanded);
  }
  return (
    <div style={{ transition: "all 0.5s linear" }}>
      <Header className="Header" style={{ padding: "0 0px", width: "100% " }}>
        <a href={"/"}>
          <div style={{ marginLeft: "10px" }}>
            <div className="logo" style={{ float: "left" }}>
              <img style={{ height: "50px" }} src={mainLogo} alt={"logo"} />
            </div>
            <div
              className="logo"
              style={{
                float: "left",
                fontSize: "25px",
                color: "white",
              }}
            >
              &nbsp;WebTetrado
            </div>
          </div>
        </a>
        <button
          onClick={() => {
            toggleNav();
          }}
          className="nav-button"
        >
          <MenuOutlined />
        </button>
      </Header>
      <div
        id={"nav-list"}
        className="NavAnimation"
        style={navExpanded ? { opacity: 1 } : { opacity: 0, height: 0 }}
      >
        <nav className="Nav">
          <a href={configData.SERVER_URL}>Home</a>
          <a href={configData.SERVER_URL + "/help"}>Help</a>
          <a href={configData.SERVER_URL + "/citeus"}>Cite us</a>
          <a href={configData.SERVER_URL + "/examples"}>Examples</a>
          <a href={configData.SERVER_URL + "/about"}>About</a>
        </nav>
      </div>
    </div>
  );
};
