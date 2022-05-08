import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import IndexRouter from '../../../routes/router';
import pp_img from "../../../assets/images/PP-PUT_logo_jasne.png";
import ichb_img from "../../../assets/images/ICHB_PAN_EN_kolor.png";
import rna_polis_img from "../../../assets/images/RNApolis-logo.png";
import { MobileNavHeader } from "./nav"; 

export class MobileLayout extends React.Component {
    render(): React.ReactNode {
        return (
          <Layout>
            <MobileNavHeader />
            <Content
              className="site-layout"
              style={{
                padding: "0 0",
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
              <div >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.put.poznan.pl/index.php/en"}
          >
            <img alt={"PP logo"} style={{ width: "80px",marginRight:'20px' }} src={pp_img} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://www.ibch.poznan.pl/en.html"}
          >
            <img alt={"IBCH logo"} style={{ width: "80px",marginLeft:'20px' }} src={ichb_img} />
          </a>
        </div>
        <div style={{ margin: "30px 0" }}>
          <a target="_blank" rel="noreferrer" href={"https://www.rnapolis.pl/"}>
            <img
              alt={"RNApolis"}
              style={{ width: "200px" }}
              src={rna_polis_img}
            />
          </a>
        </div>
      </div>
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