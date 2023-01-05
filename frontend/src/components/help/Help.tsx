import { Image } from "antd";
import { Content } from "antd/es/layout/layout";
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
import { UseAppContext } from "../../AppContextProvider";

export const Help = () => {
    const context = UseAppContext();
    let renderContent = () => {
        return (
            <Content
                style={{
                    padding: !context.viewSettings.isCompressedViewNeeded
                        ? "0 24px"
                        : "0 0",
                }}
                id="help-navigation"
            >
                <div id="help-page" className="site-layout-content">
                    <h1>Help</h1>
                    <Suspense fallback={<RenderLoader />}>
                        <TableOfHelpContents />
                    </Suspense>
                    <h2 id={"navigation"}>1. Navigation</h2>
                    <div style={{ textAlign: "justify" }}>
                        <h3 id={"home_paragraph"}>1.1. Homepage and input data</h3>
                        <p>The main page of WebTetrado allows users to define and launch a new task (calculations for a given DNA/RNA structure) and check the results of a task already completed.  Launching a new task involves loading a single data file containing the atomic coordinates of a nucleic acid molecule, setting input parameters (optional), and clicking the "Send request" button. The system accepts input files in PDB and mmCIF formats. They can be uploaded from a designated location (such as a local drive) or directly from the Protein Data Bank. In the latter case, all you need to do is provide the PDB ID of the structure, and the system will download it itself. New users of WebTetrado can also use the available examples to familiarize themselves with how the system works. In this scenario, select an example and click the "Send request" button.</p>
                        <div className={"horizontal-center"}>
                            <Image
                                alt={"infographic"}
                                width={"75%"}
                                src={help_home_set_request}
                            />
                        </div>
                        <p>To check the results of a completed task, users should have a task ID. The ID should be pasted into the edit box located in the "Check your result" section. After entering the ID and clicking the "Show" button, the system displays the task result page.
                            Where to get the task ID from? The system gives a unique identifier to each running task. This identifier is displayed on the processing page as "TASK id" and is added to the URL of the result page. If users plan to check the results after some time, they should save the task identifier for later use. The results of a completed task are stored in the system for 7 days.</p>
                        <div className={"horizontal-center"}>
                            <Image
                                alt={"infographic"}
                                width={"75%"}
                                src={help_home_check_result}
                            />
                        </div>
                        <h3 id={"result_paragraph"}>1.2. Results of data processing</h3>
                        <p>Once the user runs the task, the system opens a result page that displays the status of the task (Task uploaded, Queueing, Processing, Task completed). The page has a dedicated URL whose suffix is the task identifier. The same identifier is also displayed in a header line on the result page.</p>
                        <div className={"horizontal-center"}>
                            <Image
                                alt={"infographic"}
                                width={"75%"}
                                src={help_result_waiting}
                            />
                        </div>
                        <p>Once the calculation is completed, the page shows either a message about the failure to find a quadruplex in the structure or the structural data of the motif(s) found. In the latter case, the data is displayed hierarchically following the top-down order. If the input structure contains G4-helix, the system shows which quadruplexes are included in it. Next, the quadruplex-specific parameters are displayed, and then the parameters that were calculated for the tetrads that make up the quadruplex. Computed data include metadata (PDB ID, experiment, molecule type), classifications of tetrads and quadruplexes (by loop progression (Webba da Silva), chi angle (Webba da Silva), the relative orientation of the strands, base-pairing patterns (ONZ)), structure data (number of tetrads, sequences, tetrad planarity, loop lengths, loop types, chi angles, rise, twist, base pair types). WebTetrado also displays visualizations of the secondary structure (classic diagram, arc diagram), secondary-tertiary structure (layer diagram), and the tertiary structure (cartoon model).</p>
                        <div className={"horizontal-center"}>
                            <Image
                                alt={"infographic"}
                                width={"75%"}
                                src={help_request_result}
                            />
                        </div>
                    </div>
                    <br />
                    <h2 id={"topological_class"}>
                        2. Topological classification of quadruplex structures
                    </h2>
                    <Suspense fallback={<RenderLoader />}>
                        <WebbDaSilvaClassificationHelpSection />
                    </Suspense>
                    <br />
                    <h2 id={"structure_visualisation"}>3. Structure representations and visualizations</h2>
                    <Suspense fallback={<RenderLoader />}>
                        <SecondaryStructureDrawingHelpSection />
                    </Suspense>
                    <br />
                    <h2 id={"system_requirements"}>4. System requirements</h2>
                    <p>
                        WebTetrado is designed for mobile and desktop devices. It works with most common web browsers; their latest versions are recommended.
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
                    <br />
                    <h2 id={"funding"}>5. Funding</h2>
                    <p>
                        We acknowledge support from the National Science Centre, Poland
                        [2019/35/B/ST6/03074], the statutory funds of Poznan University of
                        Technology and Institute of Bioorganic Chemistry PAS.
                    </p>
                </div>
            </Content>
        );
    };
    return renderContent();
};
