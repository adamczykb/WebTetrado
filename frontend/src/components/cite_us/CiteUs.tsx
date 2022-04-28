

import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";

export default function CiteUs() {
    let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });

    let renderContent = () => {
        return (
            <Content
                style={{ padding: isDesktop ? "0 24px" : "0 0", minHeight: 280 }}
            >
                <div className="site-layout-content">
                    <h1>Cite us</h1>
                    <div style={{ textAlign: "justify" }}>
                        <p>
                            Any published work which has made use of WebTetrado should cite the
                            following paper:
                            <br />
                            <br />
                            <b>B. Adamczyk, M. Zurkowski, M. Antczak, M. Szachniuk, T.Zok.</b>
                            <br/>
                            WebTetrado: a webserver to explore quadruplexes in nucleic acid 3D structures
                        </p>
                    </div>
                </div>
            </Content>
        );
    };
    return renderContent();
}
