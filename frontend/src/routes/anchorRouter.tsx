import { Anchor } from "antd";
import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const { Link } = Anchor;

const HomeAnchor = () => {
    return (
        <>
            <Link href="#introduction" title="Introduction" />
            <Link href="#check-your-structure" title="Check your structure" />
            <Link href="#check-your-result" title="Show the results of completed task" />
        </>
    );
};

const ResultAnchor = () => {
    return (
        <>
            <Link href="#result" title="Basic data" />
            <Link href="#two-d-structure" title="Structure visualizations" />
            <Link href="#tetrads" title="Tetrads" />
            <Link href="#loops" title="Loops" />
            <Link
                href="#chi-angle"
                title="Chi angles"
            />
            <Link href="#tetrad-pairs" title="Tetrad pairs" />
            <Link href="#base-pairs" title="Base pairs" />
            <Link href="#nucleotides" title="Nucleotides" />
        </>
    );
};
const HelpAnchor = () => {
    return (
        <>
            <Link href="#navigation" title="Navigation" />
            <Link
                href="#topological_class"
                title="Topological classification of tetrads and quadruplexes"
            />
            <Link href="#structure_visualisation" title="Structure representations and visualizations" />
            <Link href="#system_requirements" title="System requirements" />
            <Link href="#funding" title="Funding" />
            <Link href="#bibliography" title="Bibliography" />
        </>
    );
};
const AnchorRouter: React.FC = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomeAnchor />} />
                <Route path={"/result/:foo"} element={<ResultAnchor />} />
                <Route path={"/help/"} element={<HelpAnchor />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AnchorRouter;
