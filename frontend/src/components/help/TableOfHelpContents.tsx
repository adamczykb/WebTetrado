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
                                Homepage and input data
                            </a>

                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("result_paragraph");
                                }}
                            >
                                Results of data processing
                            </a>
                        </li>
                    </ol>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("topological_class");
                        }}
                    >
                        Topological classification of tetrads and quadruplexes
                    </a>
                    <ol style={{ paddingLeft: "10px" }}>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_loop_progression");
                                }}
                            >
                                by loop progression (Webba da Silva)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_chi_angle");
                                }}
                            >
                                by Chi angle (Webba da Silva)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_realative_strands");
                                }}
                            >
                                by relative orientation of the strands
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("webb_base_pairing_patterns");
                                }}
                            >
                                by base-pairing patterns (ONZ)
                            </a>
                        </li>

                    </ol>
                </li>
                <li>
                    <a
                        onClick={() => {
                            moveTo("structure_visualisation");
                        }}
                    >
                        Structure representations and visualizations
                    </a>
                    <ol style={{ paddingLeft: "10px" }}>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_dotbracket");
                                }}
                            >
                                2D structure (dot-bracket)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_varna");
                                }}
                            >
                                2D structure (classic diagram)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_rchie");
                                }}
                            >
                                2D structure (arc diagram)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("secondary_drawing_drawtetrado");
                                }}
                            >
                                2.5D structure (layer diagram)
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    moveTo("tetrary_drawing_molstar");
                                }}
                            >
                                3D structure (cartoon model)
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
                <li>
                    <a
                        onClick={() => {
                            moveTo("bibliography");
                        }}
                    >
                        Bibliography
                    </a>
                </li>

            </ol>
        </>
    );
};
