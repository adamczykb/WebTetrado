import { Divider } from "../layout/common/Divider";
import { Results } from "./Results";
import { lazy, Suspense } from "react";
import { RenderLoader } from "../result/RenderLoader";
import { UseAppContext } from "../../AppContextProvider";

const RequestForm = lazy(() => import("./RequestForm"));

export const Home = () => {
    const context = UseAppContext();
    return (
        <>
            <h3
                id={"introduction"}
                style={
                    !context.viewSettings.isCompressedViewNeeded
                        ? {}
                        : { padding: "40px" }
                }
            >
                WebTetrado reads the 3D structures of nucleic acids and searches them for tetrads and quadruplexes. Identified motifs are visualized, classified, and described by a number of structural parameters.
            </h3>
            <Divider />
            <h1
                id="check-your-structure"
                style={{ padding: "20px 0", textAlign: "center", fontSize: "32px" }}
            >
                Upload DNA/RNA structure
            </h1>

            <Suspense fallback={<RenderLoader />}>
                <RequestForm />
            </Suspense>
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
