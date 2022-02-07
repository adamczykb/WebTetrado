import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../components/home/Home'

const IndexRouter: React.FC = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};
export default IndexRouter;