import logo from '../../assets/images/logo_bordered.png'
import { Divider } from '../layout/common/Divider';
import { RequestForm } from './RequestForm';
import { Results } from './Results';
import { useCookies } from "react-cookie";
//@ts-ignore
import { v4 as uuid } from 'uuid';
import { MolStarWrapper } from '../molstar/MolStarWrapper';

export const Home = () => {
    const [cookies, setCookie] = useCookies(["userId"]);
    if(!cookies.userId){
        setCookie("userId",uuid(),{
            sameSite: true,
            maxAge:3600*24*365
          })
    }
    return (
        <>
            <div id='introduction' className={'horizontal-center'}>
                <img src={logo} style={{ marginTop: '40px', height: '200px' }} />
            </div>
            <br />
            <h3 style={{ padding: '40px', paddingBottom: '20px', textAlign: 'justify' }}>Online implemetation of <i><a href="https://github.com/tzok/eltetrado/" rel="noreferrer">ElTetrado</a></i> application that analyzes base pairing patterns of DNA/RNA 3D structures to find and
                classify tetrads and quadruplexes. <i>ElTetrado</i> assigns tetrads to one of the ONZ classes (O, N, Z)
                alongside with the directionality of the tetrad (+/-) determined by the bonds between bases and their non-canonical interactions.
                The interactions follow Leontis/Westhof classification (Leontis and Westhof, 2001). Watson-Crick (W) edge of first base in the tetrad
                structure exposed to the Hoogsteen (H) edge of the next nucleobase from the same tetrad sets the tetrad directionality, clockwise (+)
                or anticlockwise (-).</h3>
            <Divider/>
            <h1 id='check-your-structure' style={{ padding: '20px 0', textAlign: 'center', fontSize: '32px' }}>Check your structure</h1>
            <RequestForm />
            <Divider/>
            <h1 id='check-your-result' style={{ padding: '20px 0', textAlign: 'center', fontSize: '32px' }}>Check your result</h1>
            <Results />
            
        </>)

}