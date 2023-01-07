import { Collapse, Image } from "antd";
const { Panel } = Collapse;

export const WebbDaSilvaClassificationHelpSection = () => {
    let webbDaSilvaRoman = [
        "Ia",
        "Ib",
        "IIa",
        "IIb",
        "IIIa",
        "IIIb",
        "IVa",
        "IVb",
        "Va",
        "Vb",
        "VIa",
        "VIb",
        "VIIa",
        "VIIb",
        "VIIIa",
        "VIIIb",
    ];
    return (
        <>
            <h3 id={"webb_loop_progression"}>2.1. by loop progression (Webba da Silva)</h3>
            <p>Nucleotides connecting individual tetrads in a quadruplex form so-called loops. We distinguish four types of these loops:</p>
            <ul>
                <li>&#8226; lateral loop (edge-wise loop) connects two adjacent, antiparallel strands,</li>
                <li>&#8226; diagonal loop connects two opposite, antiparallel strands,</li>
                <li>&#8226; propeller loop (external loop, double-chain reversal loop) connects two adjacent, parallel strands,</li>
                <li>&#8226; V-shaped loop connects two vertices of adjacent tetrads in which one guanosine residue lacks phosphodiester chain support.</li>
            </ul>
            <p>
                Webba da Silva (Webba da Silva, 2007) proposed a classification of topologies of unimolecular quadruplexes that is based on three types of loops (lateral, diagonal, and propeller). It defines 26 permissible loop combinations, with 13 starting from a clockwise loop and the other 13 from an anticlockwise loop. The following figure shows the schemes of all of these looping topologies. Denoted by "a" are topologies that start with anticlockwise progressing loops, and the topologies denoted by "b" start with clockwise progressing loops.
            </p>
            <Collapse defaultActiveKey={1}>
                <Panel header="Loop progression " key="1">
                    <div
                        className="horizontal-center"
                        style={{
                            flexWrap: "wrap",
                        }}
                    >
                        {Array.from(Array(13).keys()).map((v) => {
                            return Array.from(["a", "b"]).map((v1) => {
                                return (
                                    <div className="da-silva-chi-row">
                                        <h3 style={{ paddingTop: "10px" }}>
                                            {v + 1}
                                            {v1}
                                        </h3>
                                        <div className="da-silva-chi-column">
                                            <Image
                                                alt={(v + 1).toString() + v1}
                                                src={require("../../assets/da-silva/" +
                                                    (v + 1).toString() +
                                                    v1 +
                                                    ".svg")}
                                                height="100%"
                                            />
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    </div>
                </Panel>
            </Collapse>
            <br />
            <h3 id={"webb_chi_angle"}>2.2. by Chi angle (Webba da Silva)</h3>
            <p>
                Each G-quadruplex is built from stacked G-tetrads. In such a tetrad, four guanine bases align in a pseudo-plane through hydrogen-bond alignments involving the Watson–Crick edge of a guanine and the Hoogsteen edge of its partner. Tetrads can be classified according to the glycosidic bond angle of the intervening nucleotides, which have either an anti or a syn conformation. As shown in the figure below, there exist 16 possible positions of glycosidic bond angle in a tetrad (Webba da Silva, 2007).
            </p>
            <Collapse defaultActiveKey={1}>
                <Panel header="Chi angle" key="1">
                    <div
                        className="horizontal-center"
                        style={{
                            flexWrap: "wrap",
                        }}
                    >
                        {webbDaSilvaRoman.map((v) => {
                            return (
                                <div className="da-silva-loop-row">
                                    <h3 style={{ paddingTop: "10px" }}>{v}</h3>
                                    <div className="da-silva-loop-column">
                                        <Image
                                            alt={v}
                                            src={require("../../assets/da-silva/" + v + ".svg")}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Panel>
            </Collapse>
            <br />
            <h3 id={"webb_realative_strands"}>2.3. by relative orientation of the strands</h3>
            <p>
                The relative orientation of the strands determines the type of quadruplex structure (Esposito et al., 2007):
            </p>
            <ul>
                <li>
                    &#8226; parallel quadruplex is formed when all four strands are oriented in the same direction,
                </li>
                <li>
                    &#8226; hybrid quadruplex, otherwise known as type (3+1), forms when three strands are oriented in one direction and the fourth strand is oriented in the opposite direction,
                </li>
                <li>
                    &#8226; antiparallel quadruplex (2+2) has two forms (a) the top-top-down-down type has two adjacent strands oriented in the same direction and the other two in the opposite direction, (b) the top-down-top-down quadruplex has two alternating strands oriented in the same direction and the other two in the opposite direction.
                </li>
            </ul>
            <div
                className="horizontal-center"
                style={{
                    flexWrap: "wrap",
                }}
            >
                <div style={{ textAlign: 'center' }}><img alt="parallel" width="250px" src={require("../../assets/images/parallel.svg")} /><br /><span>Parallel</span></div>
                <div style={{ textAlign: 'center' }}><img alt="hybrid-clean" width="250px" src={require("../../assets/images/hybrid.svg")} /><br /><span>Hybrid</span></div>
                <div style={{ textAlign: 'center' }}><img alt="antiparallel" width="250px" src={require("../../assets/images/antiparallel-a.svg")} /><br /><span>Antiparallel (top-top-down-down)</span></div>
            </div>
            <br />
            <h3 id={"webb_base_pairing_patterns"}>2.4. by base-pairing patterns (ONZ)</h3>
            <p>
                ONZ classification for tetrads has been introduced by Popenda et al., 2020. It is based on the pairing pattern between the tetrad-forming nucleotides, N1⁠, N2⁠, N3⁠, N4. Category O (O-shaped) contains tetrads, the nucleotides of which interact according to strand direction (from 5′- to 3′-end). It means that in the O-type tetrad, N1 (the first nucleotide from 5′-end) interacts with N2⁠, N2 with N3⁠, N3 with N4, and—finally—N4 with N1⁠. The N category (N-shaped) represents tetrads stabilized by base pairs (N1,N2), (N2,N4), (N4,N3), (N3,N1). Finally, the tetrad belongs to class Z (Z-shaped), if the following interactions takes place between its nucleotides: (N1,N3), (N3,N2), (N2,N4), (N4,N1).
                Making use of the new tetrad classification, we have proposed ONZ-based taxonomy for quadruplexes. We have assumed that the classes of component tetrads automatically determine the category of the whole quadruplex. From this it follows that a quadruplex consisting of O-type tetrads belongs to class O, a motif built from N-shaped tetrads is in class N, while if it includes only tetrads from the Z category, it is assigned to class Z. Hence, we have O, N and Z classes that group regular motifs, i.e. quadruplexes composed of tetrads of the same type. There are also irregular structures that contain tetrads of different types. To hold such cases, we have defined the category of mixed structures denoted by M.
            </p>
        </>
    );
};
