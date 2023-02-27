import { useState } from "react";
import { Layout } from "antd";
import IndexRouter from "../../../routes/router";
const { Content, Footer } = Layout;

import { Menu } from "../common/Menu";
import { ContentList } from "./ContentList";

export const DesktopLayout = () => {
  const [isMenuExpanded, setMenuExpanded] = useState<Boolean>(false);
  return (
    <>
      <Menu isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />
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
          WebTetrado 2023 |{" "}
          <a href="https://github.com/adamczykb" rel="noreferrer">
            Bartosz Adamczyk
          </a>
        </Footer>
      </Layout>
    </>
  );
};
