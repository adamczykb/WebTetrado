import { Result } from "../components/result/Result";
import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../components/home/Home'
import { MolStarWrapper } from "../components/molstar/MolStarWrapper";

const IndexRouter: React.FC = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/result/:requestNumber"} element={<Result />} />
                {/* <Route path={"/molstar/show"} element={<MolStarWrapper />} /> */}
            </Routes>
        </BrowserRouter>
    )
};
export default IndexRouter;