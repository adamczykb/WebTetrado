import { Content } from "antd/es/layout/layout";
import { UseAppContext } from "../../AppContextProvider";

export default function About() {
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
                    <h1>About</h1>
                    <div style={{ textAlign: 'justify' }}>WebTetrado reads the 3D structures of nucleic acids given in PDB or mmCIF format.
                        It identifies RNA/DNA base pairs and analyzes their patterns to find
                        and classify tetrads and quadruplexes. WebTetrado engine integrates functions, including
                        those of&nbsp;
                        <a href="https://github.com/tzok/eltetrado"
                            target="_blank"
                            rel="noreferrer"
                        >ElTetrado</a>,
                        to visualize G4 structures and compute their parameters such as rise, twist,
                        planarity, Chi angle, etc. It classifies loop topologies and tetrad combinations. It assigns tetrads to one
                        of the ONZ classes (O, N, Z) alongside with the directionality of the tetrad
                        (+/-) determined by the bonds between bases and their non-canonical interactions. For
                        a standalone version of the computational engine go to <a
                            href="https://github.com/tzok/eltetrado"
                            target="_blank"
                            rel="noreferrer"
                        >GitHub</a>.</div>
                    <br />
                    <h2>Team</h2>
                    <a
                        href="https://github.com/adamczykb"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Bartosz&nbsp;Adamczyk
                    </a>
                    <sup>1</sup>,{" "}
                    <a
                        href="https://github.com/michal-zurkowski"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Michał Żurkowski
                    </a>
                    <sup>1</sup>,{" "}
                    <a
                        href="https://www.cs.put.poznan.pl/mszachniuk"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Marta Szachniuk
                    </a>
                    <sup>1,2</sup>,{" "}

                    <a
                        href="https://www.cs.put.poznan.pl/tzok"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Tomasz Żok
                    </a>
                    <sup>1</sup>
                    <br />
                    <br />
                    <ol>
                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="http://www2.cs.put.poznan.pl/en/"
                            >
                                Institute of Computing Science
                            </a>
                            &nbsp;&&nbsp;
                            <a target="_blank" rel="noreferrer" href="http://www.ecbig.pl">
                                European Centre for Bioinformatics and Genomics
                            </a>
                            ,
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.put.poznan.pl/index.php/en"
                            >
                                &nbsp;Poznan University of Technology
                            </a>
                            , 60-965 Poznan, Poland
                        </li>

                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.ibch.poznan.pl/en/home/"
                            >
                                Institute of Bioorganic Chemistry
                            </a>
                            ,
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://pan.pl/en/"
                                title="Polish Academy of Sciences"
                            >
                                {" "}
                                Polish Academy of Sciences
                            </a>
                            , 61-704 Poznan, Poland
                        </li>
                    </ol>

                </div>
            </Content>
        );
    };
    return renderContent();
}
