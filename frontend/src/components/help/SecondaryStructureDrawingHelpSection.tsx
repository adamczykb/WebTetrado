export const SecondaryStructureDrawingHelpSection = () => {
    return (
        <div>
            <h3 id={"secondary_drawing_dotbracket"}>
                3.1.{" "}
                2D structure (dot-bracket)
            </h3>
            <p>Dot-bracket notation is commonly used to represent the secondary structure of RNA. Here it is applied to any nucleic acid. In this notation:
            </p>
            <ul>
                <li>&#8226; an unpaired nucleotide is represented as a dot &quot;.&quot; </li>
                <li>&#8226; a base pair is represented as a pair of opening (left) and closing (right) brackets, i.e. "(" and ")", "[" and "]", &quot;&lt;&quot; and &quot;&gt;&quot;, &quot;&#123;&quot; and &quot;&#123;&quot;.</li>
            </ul>
            <p>A single string of dots and parentheses is sufficient to encode in dot-bracket notation a secondary structure in which one nucleotide forms at most one pairing. Unfortunately, it is not sufficient when one wants to dot-bracket the 2D structure of a tetrad or quadruplex. It is because tetrads and quadruplexes are formed by multiplets; each nucleotide in a tetrad forms pairs with two others. Therefore, specifically for these secondary structure motifs, the two-line dot-bracket notation was defined (Popenda et al., 2020). In the case of tetrad representation, each line holds two base pairs that do not share nucleobases. Thus, if nucleobase Ni forms hydrogen bonds with Nj and Nk in the tetrad, one of these pairs (e.g. Ni-Nj⁠) is encoded in the first line, and the other (⁠Ni-Nk⁠)—in the second line of the dot-bracket. </p>
            <h3 id={"secondary_drawing_varna"}>
                3.2.{" "}
                <a href="https://academic.oup.com/bioinformatics/article/25/15/1974/210730">
                    2D structure (classic diagram)
                </a>
            </h3>
            <p>
                VARNA is mainly an interactive software for drawing and editing RNA
                secondary structures. It supports several input file formats, including
                BPSEQ, CT and others. The main advantage of VARNA is its support for
                non-canonical base pairs (
                <a href="http://rnajournal.cshlp.org/content/7/4/499.long">
                    Leontis/Westhof
                </a>
                &nbsp; nomenclature). The output visualisation can be extracted in vector and
                bitmap picture formats including EPS, SVG, XFIG, JPG, or PNG. VARNA is
                available as the lightweight applet and swing component at{" "}
                <a href="http://varna.lri.fr/">http://varna.lri.fr/</a>.
            </p>
            <p>
                Additional scripts post-process the VARNA images to
                display non-canonical interactions. VARNA visualization supports
                Leontis/Westhof classification and it is used during WebTetrado
                post-processing (see table below). Gray dashed lines are used to connect multiplet-involved
                residues and other pairs unrepresentable in text format.
            </p>
            <table id={"visualization-symbol-table"}>
                <tbody>
                    <tr>
                        <td>
                            <b>RNA base-base classification</b>
                        </td>
                        <td>
                            <b>Visualization symbol</b>
                        </td>
                    </tr>
                    <tr>
                        <td>cis Watson-Crick Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-cww"}
                                src={
                                    require("../../assets/varna-symbol/symbol-cww.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Watson-Crick Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-tww"}
                                src={
                                    require("../../assets/varna-symbol/symbol-tww.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Watson-Crick Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-cwh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-cwh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Watson-Crick Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-twh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-twh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Watson-Crick Sugar</td>
                        <td>
                            <img
                                alt={"symbol-cws"}
                                src={
                                    require("../../assets/varna-symbol/symbol-cws.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Watson-Crick Sugar</td>
                        <td>
                            <img
                                alt={"symbol-tws"}
                                src={
                                    require("../../assets/varna-symbol/symbol-tws.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Hoogsteen Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-chw"}
                                src={
                                    require("../../assets/varna-symbol/symbol-chw.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Hoogsteen Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-thw"}
                                src={
                                    require("../../assets/varna-symbol/symbol-thw.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Hoogsteen Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-chh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-chh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Hoogsteen Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-thh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-thh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Hoogsteen Sugar</td>
                        <td>
                            <img
                                alt={"symbol-chs"}
                                src={
                                    require("../../assets/varna-symbol/symbol-chs.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Hoogsteen Sugar</td>
                        <td>
                            <img
                                alt={"symbol-ths"}
                                src={
                                    require("../../assets/varna-symbol/symbol-ths.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Sugar Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-csw"}
                                src={
                                    require("../../assets/varna-symbol/symbol-csw.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Sugar Watson-Crick</td>
                        <td>
                            <img
                                alt={"symbol-tsw"}
                                src={
                                    require("../../assets/varna-symbol/symbol-tsw.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Sugar Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-csh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-csh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Sugar Hoogsteen</td>
                        <td>
                            <img
                                alt={"symbol-tsh"}
                                src={
                                    require("../../assets/varna-symbol/symbol-tsh.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>cis Sugar Sugar</td>
                        <td>
                            <img
                                alt={"symbol-css"}
                                src={
                                    require("../../assets/varna-symbol/symbol-css.svg")
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>trans Sugar Sugar</td>
                        <td>
                            <img
                                alt={"symbol-tss"}
                                src={
                                    require("../../assets/varna-symbol/symbol-tss.svg")
                                }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h3 id={"secondary_drawing_rchie"}>
                3.3.{" "}
                <a href="https://academic.oup.com/nar/article/40/12/e95/2414962">
                    2D structure (arc diagram)
                </a>
            </h3>
            <p>
                R-chie is a tool for generating different types of arc diagrams. It
                supports visualization of multiple sequence alignments and incorporation
                of co-variance information into the image. R-chie can read inputs in
                various formats including BPSEQ, CT and dot-bracket, also these
                containing higher order pseudoknots. It is highly configurable and
                allows to save output as PNG or PDF files. The webserver is available at{" "}
                <a href="http://www.e-rna.org/r-chie">http://www.e-rna.org/r-chie</a>.
            </p>
            <h3 id={"secondary_drawing_drawtetrado"}>
                3.4.{" "}
                <a href="https://academic.oup.com/bioinformatics/article/38/15/3835/6608692?login=false">
                    2.5D structure (layer diagram)
                </a>
            </h3>
            <p>
                Layer diagram shows the 3D models of quadruplexes and G4Helices in a simplified view. Each tetrad is demonstrated as a planar
                rhombus with defined each nucleotide and its order number within a sequence.
            </p>
            <div className={"horizontal-center"}>
                <img alt='drawtetrado_layer_visualization' width={'25%'} src={require('../../assets/images/drawtetrado.svg')} />
            </div>
            <p style={{ textAlign: 'center' }}>
                Layer diagram of quadruplex. Black arrows indicate progression from 5’ to 3’ end.<br /> Nucleotides are displayed as rhombuses with their sequential numeric id.
            </p>
            <h3 id={"tetrary_drawing_molstar"}>
                3.5.{" "}
                <a href="https://molstar.org/">
                    3D structure (cartoon model)
                </a>
            </h3>
            <p>Mol* viewer is a high-performance structure visualzer that is able to render compounded structures with atoms. WebTetrado uses Mol* to mark residues with correspondent base-pairing patterns ONZ colouring.</p>
        </div>
    );

};
