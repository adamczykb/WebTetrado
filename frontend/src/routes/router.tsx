import { Result } from "../components/result/Result";
import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../components/home/Home'
import CiteUs from "../components/cite_us/CiteUs";
import NotFound from "../components/errors/404";
import About from "../components/about/About";

const IndexRouter: React.FC = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/result/:requestNumber"} element={<Result />} />
                <Route path={"/citeus"} element={<CiteUs />} />
                <Route path={"/about"} element={<About />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
};
export default IndexRouter;