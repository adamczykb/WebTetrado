import { Anchor } from "antd";
import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../components/home/Home'
const { Link } = Anchor;

const HomeAnchor = () =>{
    return (<> 
    <Link href="#introduction" title="Introduction" />
    <Link href="#check-your-structure" title="Check your structure" />
    <Link href="#check-your-result" title="Check your result" />
    </>)
}

const ResultAnchor = () =>{
    return (<> 
    <Link href="#result" title="Analytics result" />
    <Link href="#two-d-structure" title="Structure visualizations" />
    <Link href="#tetrads" title="Tetrads" />
    <Link href="#loops" title="Loops" />
    <Link href="#chi-angle"  title="Chi angle value and type in each nucleotide" />
    <Link href="#tetrad-pairs" title="Tetrad pairs" />
    <Link href="#base-pairs"  title="Base pairs" />
    <Link href="#nucleotides"  title="Nucleotides" />

    </>)
}
const AnchorRouter: React.FC = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomeAnchor />} />
                <Route path={"/result/:foo"} element={<ResultAnchor />} />
            </Routes>
        </BrowserRouter>
    )
};
export default AnchorRouter;