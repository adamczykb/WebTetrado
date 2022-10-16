import { Divider } from "../layout/common/Divider";
import { RequestForm } from "./RequestForm";
import { Results } from "./Results";
import { useMediaQuery } from "react-responsive";

export const Home = () => {
  let isDesktop = useMediaQuery({ query: "(min-width: 900px)" });
  return (
    <>
      <h3
        id={"introduction"}
        style={
          isDesktop
            ? { padding: "40px", paddingBottom: "20px", textAlign: "justify" }
            : { paddingBottom: "20px", textAlign: "justify" }
        }
      >
        Online implemetation of{" "}
        <i>
          <a href="https://github.com/tzok/eltetrado/" rel="noreferrer">
            ElTetrado
          </a>
        </i>{" "}
        application that analyzes base pairing patterns of DNA/RNA 3D structures
        to find and classify tetrads and quadruplexes. <i>ElTetrado</i> assigns
        tetrads to one of the ONZ classes (O, N, Z) alongside with the
        directionality of the tetrad (+/-) determined by the bonds between bases
        and their non-canonical interactions. The interactions follow
        Leontis/Westhof classification (Leontis and Westhof, 2001). Watson-Crick
        (W) edge of first base in the tetrad structure exposed to the Hoogsteen
        (H) edge of the next nucleobase from the same tetrad sets the tetrad
        directionality, clockwise (+) or anticlockwise (-).
      </h3>
      <Divider />
      <h1
        id="check-your-structure"
        style={{ padding: "20px 0", textAlign: "center", fontSize: "32px" }}
      >
        Upload DNA/RNA structure
      </h1>
      <RequestForm compressedView={isDesktop} />
      <Divider />
      <h1
        id="check-your-result"
        style={{ padding: "20px 0", textAlign: "center", fontSize: "32px" }}
      >
        Check your result
      </h1>
      <Results />
    </>
  );
};
