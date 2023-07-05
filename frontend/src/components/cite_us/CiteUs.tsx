import { Content } from "antd/es/layout/layout";
import { UseAppContext } from "../../AppContextProvider";

export default function CiteUs() {
  const context = UseAppContext();
  let renderContent = () => {
    return (
      <Content
        style={{
          padding: !context.viewSettings.isCompressedViewNeeded
            ? "0 24px"
            : "0 0",
          minHeight: 280,
        }}
      >
        <div className="site-layout-content">
          <h1>Cite us</h1>
          <div style={{ textAlign: "justify" }}>
            <p>
              Any published work which has made use of WebTetrado should cite
              the following paper:
              <br />
              <br />
              B. Adamczyk, M. Zurkowski, M. Szachniuk, T.Zok. WebTetrado: a webserver to explore quadruplexes in nucleic acid 3D structures. <i>Nucleic Acids Research</i> 51(W1), <b>2023</b>, W607-W612 (doi: <a href="https://doi.org/10.1093/nar/gkad346">10.1093/nar/gkad346</a>).
            </p>
          </div>
        </div>
      </Content>
    );
  };
  return renderContent();
}
