import { Image } from "antd";
import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";
import { Divider } from "../layout/common/Divider";
import help_home_set_request from "../../assets/images/help_home_set_request.png";
import help_request_result from "../../assets/images/help_request_result.png";
import help_result_waiting from "../../assets/images/help_result_waiting.png";
import help_home_check_result from "../../assets/images/help_home_check_result.png";
import safari from "../../assets/images/234px-Safari_browser_logo.png";
import firefox from "../../assets/images/640px-Firefox_logo.png";
import chrome from "../../assets/images/Google_Chrome_icon_(September_2014).png";
import edge from "../../assets/images/microsoftedgenewlogo.jpg";
import { TableOfHelpContents } from "./TableOfHelpContents";
import { WebbDaSilvaClassificationHelpSection } from "./WebbDaSilvaClassificationHelpSection";
import { SecondaryStructureDrawingHelpSection } from "./SecondaryStructureDrawingHelpSection";
import { Suspense } from "react";
import { RenderLoader } from "../result/RenderLoader";

export const Help = () => {
  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
  let renderContent = () => {
    return (
      <Content
        style={{ padding: isDesktop ? "0 24px" : "0 0" }}
        id="help-navigation"
      >
        <div id="help-page" className="site-layout-content">
          <h1>Help</h1>
          <Suspense fallback={<RenderLoader />}>
            <TableOfHelpContents />
          </Suspense>
          <h2 id={"navigation"}>1. Navigation</h2>
          <div style={{ textAlign: "justify" }}>
            <h3 id={"home_paragraph"}>1.1. Home</h3>
            <h3 id={"home_set_reqeust"}>1.1.1. Set request</h3>
            <div className={"horizontal-center"}>
              <Image
                alt={"infographic"}
                width={"75%"}
                src={help_home_set_request}
              />
            </div>
            <Divider />
            <h3 id={"home_check_reqeust"}>1.1.2. Check request</h3>
            <div className={"horizontal-center"}>
              <Image
                alt={"infographic"}
                width={"75%"}
                src={help_home_check_result}
              />
            </div>
            <Divider />
            <h3 id={"result_paragraph"}>1.2. Result</h3>
            <h3 id={"result_waiting_for_result"}>1.2.1. Waiting for result</h3>
            <div className={"horizontal-center"}>
              <Image
                alt={"infographic"}
                width={"75%"}
                src={help_result_waiting}
              />
            </div>
            <Divider />
            <h3 id={"result_request_result"}>1.2.1. Request result</h3>
            <div className={"horizontal-center"}>
              <Image
                alt={"infographic"}
                width={"75%"}
                src={help_request_result}
              />
            </div>
          </div>
          <Divider />
          <h2 id={"webb_da_silva_classification"}>
            2. Webb da Silva classification
          </h2>
          <Suspense fallback={<RenderLoader />}>
            <WebbDaSilvaClassificationHelpSection />
          </Suspense>
          <Divider />

          <h2 id={"secondary_structure"}>3. Secondary structure drawing</h2>
          <Suspense fallback={<RenderLoader />}>
            <SecondaryStructureDrawingHelpSection />
          </Suspense>
          <Divider />
          <h2 id={"system_requirements"}>4. System requirements</h2>
          <p>
            WebTetrado is designed to work with most of web browsers. The latest
            versions of browsers are recommended.
          </p>
          <table style={{ border: "1px solid gray", textAlign: "center" }}>
            <tr>
              <td width="75px">
                <a href="https://www.google.com/intl/en_en/chrome/">
                  <img alt={"chrome logo"} width="55px" src={chrome} />
                </a>
              </td>
              <td width="75px">
                <a href="https://www.microsoft.com/en-us/edge">
                  <img alt={"edge logo"} width="64px" src={edge} />
                </a>
              </td>
              <td width="75px">
                <a href="https://www.mozilla.org/en-US/firefox/new/">
                  <img alt={"firefox logo"} width="64px" src={firefox} />
                </a>
              </td>
              <td width="75px">
                <a href="https://www.apple.com/safari/">
                  <img alt={"safari logo"} width="64px" src={safari} />
                </a>
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td>
                <b>
                  Chrome
                  <br />
                  85
                </b>
              </td>
              <td>
                <b>
                  Edge
                  <br />
                  88
                </b>
              </td>
              <td>
                <b>
                  Firefox
                  <br />
                  86
                </b>
              </td>
              <td>
                <b>
                  Safari
                  <br />
                  14
                </b>
              </td>
            </tr>
          </table>
          <Divider />
          <h2 id={"funding"}>5. Funding</h2>
          <p>
            We acknowledge support from the National Science Centre, Poland
            [2019/35/B/ST6/03074], the statutory funds of Poznan University of
            Technology and Institute of Bioorganic Chemistry PAS.
          </p>
          <Divider />
          <h2 id={"references"}>6. References</h2>
        </div>
      </Content>
    );
  };
  return renderContent();
};
