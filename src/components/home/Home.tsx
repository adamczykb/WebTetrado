import { Content } from 'antd/lib/layout/layout';
import React from 'react';
//@ts-ignore
import logo from '../../assets/images/logo_bordered.png'

export class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, width: '1500px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="site-layout-background" style={{ padding: 24 }}>
                    <div className={'horizontal-center'}>
                        <img src={logo} style={{ marginTop:'40px', height: '200px' }} />
                    </div>
                    <br/>
                    <h3 style={{padding:'40px',textAlign:'justify'}}>Online implemetation of <i><a href="https://github.com/tzok/eltetrado/" rel="noreferrer">ElTetrado</a></i> application that analyzes base pairing patterns of DNA/RNA 3D structures to find and 
                    classify tetrads and quadruplexes. <i>ElTetrado</i> assigns tetrads to one of the ONZ classes (O, N, Z) 
                    alongside with the directionality of the tetrad (+/-) determined by the bonds between bases and their non-canonical interactions. 
                    The interactions follow Leontis/Westhof classification (Leontis and Westhof, 2001). Watson-Crick (W) edge of first base in the tetrad
                     structure exposed to the Hoogsteen (H) edge of the next nucleobase from the same tetrad sets the tetrad directionality, clockwise (+) 
                     or anticlockwise (-).</h3>
                </div>
            </Content>)
    }
}