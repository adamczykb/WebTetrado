import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import React from "react";
import IndexRouter from "../../../routes/router";
import pp_img from "../../../assets/images/PP-PUT_logo_jasne.png";
import ichb_img from "../../../assets/images/ICHB_PAN_EN_kolor.png";
import rna_polis_img from "../../../assets/images/RNApolis-logo.png";
import { MobileNavHeader } from "./MobileNavHeader";

export class MobileLayout extends React.Component {
  render(): React.ReactNode {
    return (
      <Layout>
        <Content className="site-layout" id="mobile-site-layout">
          <div className="site-layout-background">
            <MobileNavHeader />
            <IndexRouter />
          </div>
        </Content>

        <div id={"footer-logos"}>
          <div className={"center"}>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.put.poznan.pl/index.php/en"}
            >
              <img alt={"PP logo"} height="86px" src={pp_img} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.rnapolis.pl/"}
            >
              <img
                alt={"RNApolis"}
                style={{ height: "40px", marginLeft: "40px" }}
                src={rna_polis_img}
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.ibch.poznan.pl/en.html"}
            >
              <img
                alt={"IBCH logo"}
                style={{ height: "86px", marginLeft: "40px" }}
                src={ichb_img}
              />
            </a>
          </div>
        </div>
        <Footer style={{ textAlign: "center" }}>
          WebTetrado 2022 |{" "}
          <a href="https://github.com/adamczykb" rel="noreferrer">
            Bartosz Adamczyk
          </a>
        </Footer>
      </Layout>
    );
  }
}
