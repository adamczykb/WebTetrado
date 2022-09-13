import { useEffect, useState } from "react";
import { Anchor, Layout, Button } from "antd";
import IndexRouter from "../../../routes/router";
import AnchorRouter from "../../../routes/anchorRouter";
import logo from "../../../assets/images/logo_simple.png";
import { MenuOutlined } from "@ant-design/icons";
const { Content, Footer } = Layout;

import pp_img from "../../../assets/images/PP-PUT_logo_jasne.png";
import ichb_img from "../../../assets/images/ICHB_PAN_EN_kolor.png";
import rna_polis_img from "../../../assets/images/RNApolis-logo.png";
import { Menu } from "../common/Menu";

const ContentList = (setMenuExpanded: any) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, []);
  return (
    <>
      <div className="nav-slider">
        <div
          className="vertical-center"
          style={{ justifyContent: "space-between" }}
        >
          <a href="/">
            <img height={"64px"} src={logo} />
          </a>
          <Button
            type="text"
            id={"navigation-button"}
            onClick={() => {
              setMenuExpanded(true);
            }}
          >
            <MenuOutlined id="MenuOutlined-desktop" />
          </Button>
        </div>

        <Anchor
          style={{
            margin: "50px 0",
          }}
          targetOffset={targetOffset}
        >
          <AnchorRouter />
        </Anchor>
        <div style={{ marginLeft: "5px" }}>
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
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.rnapolis.pl/"}
            >
              <img
                alt={"RNApolis"}
                style={{ width: "100%" }}
                src={rna_polis_img}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export const DesktopLayout = () => {
  const [isMenuExpanded, setMenuExpanded] = useState<Boolean>(false);
  return (
    <>
      {Menu(isMenuExpanded, setMenuExpanded)}
      <Layout>
        <Content className="site-layout">
          {ContentList(setMenuExpanded)}
          <div className="site-layout-background">
            <div id="webtetrado-banner-desktop">
              <a href="/" rel="noreferrer">
                WebTetrado
              </a>
            </div>
            <IndexRouter />
          </div>
        </Content>
        <Footer>
          WebTetrado 2022 |{" "}
          <a href="https://github.com/adamczykb" rel="noreferrer">
            Bartosz Adamczyk
          </a>
        </Footer>
      </Layout>
    </>
  );
};
