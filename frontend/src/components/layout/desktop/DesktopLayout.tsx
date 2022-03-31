import React, { useEffect, useState } from "react";
import { Anchor, Layout, Menu } from "antd";
import "../../../assets/css/DesktopLayout.css";
import IndexRouter from "../../../routes/router";
import AnchorRouter from "../../../routes/anchorRouter";

import logo from "../../../assets/images/logo_simple.png";
const { Header, Content, Footer } = Layout;

import pp_img from "../../../assets/images/PP-PUT_logo_jasne.png";
import ichb_img from "../../../assets/images/ICHB_PAN_EN_kolor.png";
import rna_polis_img from "../../../assets/images/RNApolis-logo.png";

const ContentList: React.FC = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, []);
  return (
    <div
      className="nav_slider"
      style={{
        position: "fixed",
        top: "100px",
        width: "200px",
        left: "calc((100% - 1400px) / 2 - 200px )",
      }}
    >
      <Anchor targetOffset={targetOffset}>
        <AnchorRouter />
      </Anchor>
      <div style={{ marginTop: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.put.poznan.pl/index.php/en"}
          >
            <img alt={"PP logo"} style={{ width: "80px" }} src={pp_img} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.ibch.poznan.pl/en.html"}
          >
            <img alt={"IBCH logo"} style={{ width: "80px" }} src={ichb_img} />
          </a>
        </div>
        <div style={{ width: "90%", marginTop: "30px" }}>
          <a target="_blank" rel="noreferrer" href={"https://www.rnapolis.pl/"}>
            <img
              alt={"RNApolis"}
              style={{ width: "100%" }}
              src={rna_polis_img}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export class DesktopLayout extends React.Component {
  render(): React.ReactNode {
    return (
      <Layout>
        <Header
          className={"horizontal-center"}
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            userSelect: "none",
          }}
        >
          <div style={{ width: "1400px" }}>
            <a href="/" rel="noreferrer">
              <div
                className={"vertical-center"}
                style={{
                  float: "left",
                  fontSize: "24px",
                  paddingLeft: "10px",
                  color: "white",
                }}
              >
                <img
                  src={logo}
                  style={{ height: "42px", paddingRight: "10px" }}
                />
                WebTetrado
              </div>
            </a>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ float: "left", paddingLeft: "10px" }}
            >
              <Menu.Item key="1">
                <a href="/">Home</a>
              </Menu.Item>

              <Menu.Item key="2">
                <a href="/help">Help</a>
              </Menu.Item>

              <Menu.Item key="3">
                <a href="/citeus">Cite us</a>
              </Menu.Item>

              <Menu.Item key="4">
                <a href="/about">About</a>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <ContentList />
        <Content
          className="site-layout"
          style={{
            padding: "0 0",
            marginTop: 64,
            maxWidth: "1400px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            float: "left",
          }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <IndexRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          WebTetrado 2022 |{" "}
          <a
            href="https://github.com/adamczykb"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.85)" }}
          >
            Bartosz Adamczyk
          </a>
        </Footer>
      </Layout>
    );
  }
}
