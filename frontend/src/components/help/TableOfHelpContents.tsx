export const TableOfHelpContents = () => {
    let moveTo = (id: string) => {
        document.getElementById(id)!.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    };
    return (
        <>
            <h2>Table of contents</h2>
            <ol>
                <li>
                    <a
                        onClick={() => {
                            moveTo("navigation");
                        }}
                    >
                        Navigation
                    </a>
                    <ol style={{ paddingLeft: "10px" }}>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("home_paragraph");
                                }}
                            >
                                Home
                            </a>
                            <ol style={{ paddingLeft: "10px" }}>
                                <li>
                                    <a
                                        onClick={() => {
                                            moveTo("home_set_request");
                                        }}
                                    >
                                        Set request
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => {
                                            moveTo("home_check_result");
                                        }}
                                    >
                                        Check request
                                    </a>
                                </li>{" "}
                            </ol>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("result_paragraph");
                                }}
                            >
                                Result
                            </a>
                            <ol style={{ paddingLeft: "10px" }}>
                                <li>
                                    <a
                                        onClick={() => {
                                            moveTo("result_waiting_for_result");
                                        }}
                                    >
                                        Waiting for result
                                    </a>{" "}
                                </li>
                                <li>
                                    <a
                                        onClick={() => {
                                            moveTo("result_request_result");
                                        }}
                                    >
                                        Request result
                                    </a>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("webb_da_silva_classification");
                        }}
                    >
                        Webb da Silva classification
                    </a>
                    <ol style={{ paddingLeft: "10px" }}>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_chi_angle");
                                }}
                            >
                                Chi angle
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_loop_progression");
                                }}
                            >
                                Loop progression
                            </a>
                        </li>
                    </ol>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("secondary_structure");
                        }}
                    >
                        Secondary structure drawing
                    </a>
                    <ol style={{ paddingLeft: "10px" }}>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_varna");
                                }}
                            >
                                VARNA
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_rchie");
                                }}
                            >
                                R-chie
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_drawtetrado");
                                }}
                            >
                                Layer diagram (by DrawTetrado)
                            </a>
                        </li>

                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_pseudoknot");
                                }}
                            >
                                Pseudoknot annotation drawing
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_interactions");
                                }}
                            >
                                Scripts to annotate non-canonical interactions
                            </a>
                        </li>
                    </ol>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("system_requirements");
                        }}
                    >
                        System requirements
                    </a>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("funding");
                        }}
                    >
                        Funding
                    </a>
                </li>
            </ol>
        </>
    );
};
