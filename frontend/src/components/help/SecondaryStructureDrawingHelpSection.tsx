import { VisualisationLegend } from "../result/Legend";

export const SecondaryStructureDrawingHelpSection = () => {
  return (
    <div>
      <p>The quadruplex structure shown on the result page in dot-bracket notation and in all visualizations is colored by default according to the color codes corresponding to the ONZ classification. This means that any tetrad that is assigned to the O class is colored blue, the N-type tetrad is green, and the Z-type tetrad is orange. In addition, we distinguish between the tetrads of the + (clockwise) type and the tetrads of the - (anticlockwise) type. The former ones have a dark shade, and the latter - have a light shade. The output visualizations can be downloaded and saved in the SVG format.</p>
      <VisualisationLegend />
      <br />
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
        The secondary structure of the quadruplex is presented in a classical diagram generated using a VARNA-based procedure (Darty et al., 2009). In WebTetrado, we adjusted this procedure to visualize quadruplexes. Its advantage is the support for non-canonical base pairs. They are graphically annotated according to the Leontis-Westhof classification (Leontis and Westhof, 2001). For this annotation, we use pictograms presented in the table below. By default, only base pairs involved in the quadruplex are drawn on the diagram. However, two switches available on the interactive panel with the diagram, allow users to view canonical and non-canonical pairings outside the tetrads. The latter are colored grey.
      </p>
      <table id={"visualization-symbol-table"} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <tbody>
          <tr>
            <td>
              <b>Base pair type</b>
            </td>
            <td>
              <b>cis</b>
            </td>
            <td>
              <b>trans</b>
            </td>
          </tr>
          <tr>
            <td>Watson-Crick-Franklin - Watson-Crick-Franklin</td>
            <td>
              <img
                alt={"symbol-cww"}
                src={
                  require("../../assets/varna-symbol/symbol-cww.svg")
                }
              />
            </td>
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
            <td>Watson-Crick-Franklin - Hoogsteen</td>
            <td>
              <img
                alt={"symbol-cwh"}
                src={
                  require("../../assets/varna-symbol/symbol-cwh.svg")
                }
              />
            </td>
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
            <td>Watson-Crick-Franklin - Sugar</td>
            <td>
              <img
                alt={"symbol-cws"}
                src={
                  require("../../assets/varna-symbol/symbol-cws.svg")
                }
              />
            </td>
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
            <td>Hoogsteen - Watson-Crick-Franklin</td>
            <td>
              <img
                alt={"symbol-chw"}
                src={
                  require("../../assets/varna-symbol/symbol-chw.svg")
                }
              />
            </td>
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
            <td>Hoogsteen - Hoogsteen</td>
            <td>
              <img
                alt={"symbol-chh"}
                src={
                  require("../../assets/varna-symbol/symbol-chh.svg")
                }
              />
            </td>
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
            <td>Hoogsteen - Sugar</td>
            <td>
              <img
                alt={"symbol-chs"}
                src={
                  require("../../assets/varna-symbol/symbol-chs.svg")
                }
              />
            </td>
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
            <td>Sugar - Watson-Crick-Franklin</td>
            <td>
              <img
                alt={"symbol-csw"}
                src={
                  require("../../assets/varna-symbol/symbol-csw.svg")
                }
              />
            </td>
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
            <td>Sugar - Hoogsteen</td>
            <td>
              <img
                alt={"symbol-csh"}
                src={
                  require("../../assets/varna-symbol/symbol-csh.svg")
                }
              />
            </td>
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
            <td>Sugar - Sugar</td>
            <td>
              <img
                alt={"symbol-css"}
                src={
                  require("../../assets/varna-symbol/symbol-css.svg")
                }
              />
            </td>
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
        Arc diagram is an alternative representation of the secondary structure of a quadruplex shown in WebTetrado. To generate it, we use the R-chie program (Lai et al., 2022), which we adapted for quadruplexes. In a classical arc diagram, multiplets are not represented. Our procedure generates top-down arc diagrams, which correspond to two-line dot-bracket notation (Popenda et al., 2020). The top arcs in a diagram correspond to the first line of dot-bracket encoding, and the bottom arcs correspond to the second line of dot-bracket notation. The visualization of the arc diagram is interactive. There is a switch on its panel that allows drawing arcs that represent canonical base pairs beyond tetrads. By default, the arc diagram shows only the pairings directly involved in the quadruplex.
      </p>
      <h3 id={"secondary_drawing_drawtetrado"}>
        3.4.{" "}
        <a href="https://academic.oup.com/bioinformatics/article/38/15/3835/6608692?login=false">
          2.5D structure (layer diagram)
        </a>
      </h3>
      <p>
        The layer diagram shows the simplified 2.5 D model of a quadruplex or G4Helix. G4-helix is represented as a stack of quadruplexes. A quadruplex is drawn as an n-layered stack, where n is the number of tetrads. Each tetrad is displayed as a planar rhombus composed of four parallelograms that represent nucleotides. The name of a nucleotide is shown, containing chain ID, nucleotide symbol, and number. The name is displayed using a black font for syn conformation or a white font for anti. Strands are drawn with arrows depicting their directionalities. The layout is automatically optimized to give a clear image avoiding strand clutter. The drawing is generated automatically by the DrawTetrado program (Zurkowski et al., 2022) that runs within the computational engine of the system.
      </p>
      <h3 id={"tetrary_drawing_molstar"}>
        3.5.{" "}
        <a href="https://molstar.org/">
          3D structure (cartoon model)
        </a>
      </h3>
      <p>
        To visualize the tertiary structure, WebTetrado uses the Mol* viewer (Sehnal et al., 2021). The 3D structure is represented in the cartoon model, in which the nucleotides that make up the tetrads are by default coloured according to the code defined for the ONZ classification. Nucleotides outside the quadruplex are light gray. The panel with the visualization of the 3D structure provides all options of Mol*. Users can therefore modify the view of the structure (hide and display specified fragments of the structure, recolor, change background settings, etc.).
      </p>
    </div>
  );

};
