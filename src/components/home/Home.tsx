import { Content } from 'antd/lib/layout/layout';
import React from 'react';
//@ts-ignore
import logo from '../../assets/images/logo_bordered.png'
//@ts-ignore 
import bottom_arrow from '../../assets/images/divider_arrow.png'
//@ts-ignore 
import pp_img from '../../assets/images/PP-PUT_logo_jasne.png'
//@ts-ignore 
import ichb_img from '../../assets/images/ICHB_PAN_EN_kolor.png'
//@ts-ignore 
import rna_polis_img from '../../assets/images/RNApolis-logo.png'

import { Upload, message, Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { useState, useEffect } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;
const { Dragger } = Upload;



const props = {
    name: 'structure',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    maxCount: 1,
    onChange(info: any) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.fileList);
            if(info.file.name.split('.')[1]!='cif' && info.file.name.split('.')[1]!='pdb'){
                message.error(`${info.file.name} has wrong file format.`);
                
                return;
            }
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e: any) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const AnchorExample: React.FC = () => {
    const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);
    useEffect(() => {
        setTargetOffset(window.innerHeight / 2);
    }, []);
    return (
        <Anchor targetOffset={targetOffset} className='nav_slider' style={{ position: 'fixed', top: '100px', left: 'calc((100% - 1400px) / 2 - 200px )' }}>
            <Link href="#intro" title="Introduction" />
            <Link href="#intro2" title="Check your structure" />
            <Link href="#intro3" title="Check your result" />
        </Anchor>
    );
};
export class Home extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <>
                <AnchorExample />
                <Content className="site-layout" style={{ padding: '0 0', marginTop: 64, maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto', float: 'left' }}>
                    <div className="site-layout-background" style={{ padding: 24 }}>
                        <div id='intro' className={'horizontal-center'}>
                            <img src={logo} style={{ marginTop: '40px', height: '200px' }} />
                        </div>
                        <br />
                        <p style={{ padding: '40px', paddingBottom: '20px', textAlign: 'justify' }}>Online implemetation of <i><a href="https://github.com/tzok/eltetrado/" rel="noreferrer">ElTetrado</a></i> application that analyzes base pairing patterns of DNA/RNA 3D structures to find and
                            classify tetrads and quadruplexes. <i>ElTetrado</i> assigns tetrads to one of the ONZ classes (O, N, Z)
                            alongside with the directionality of the tetrad (+/-) determined by the bonds between bases and their non-canonical interactions.
                            The interactions follow Leontis/Westhof classification (Leontis and Westhof, 2001). Watson-Crick (W) edge of first base in the tetrad
                            structure exposed to the Hoogsteen (H) edge of the next nucleobase from the same tetrad sets the tetrad directionality, clockwise (+)
                            or anticlockwise (-).</p>
                        <div className={'horizontal-center'}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <div className={'horizontal-center'}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <h2 id='intro2' style={{ padding: '20px 0', textAlign: 'center' }}>Check your structure</h2>
                        <div className={'horizontal-center'} >
                            <div>
                                <div style={{ width: '400px', height: '230px' }}>
                                    <Dragger {...props} style={{ padding: '20px' }}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            *.cif, *.pdb
                                        </p>
                                    </Dragger>

                                </div>
                                <div className={'horizontal-center'} style={{ marginTop: '50px' }}>
                                    <Button type="primary">Upload and process</Button>
                                </div>
                            </div>
                            <div className="split-layout__divider" style={{ width: '90px' }}>
                                <div className="split-layout__rule"></div>
                                <div className="split-layout__label">Or</div>
                                <div className="split-layout__rule"></div>
                            </div>
                            <div style={{ width: '400px' }} className={'vertical-center'}>
                                <div>
                                    <p style={{ margin: '0' }}>Get structure from RCSB:</p>
                                    <Input.Group compact>
                                        <Input style={{ width: 'calc(100% - 155px)', paddingTop: '2px', paddingBottom: '2px' }} placeholder={'PDB ID eg. 1D59 '} maxLength={4} />
                                        <Button type="primary">Get and process</Button>
                                    </Input.Group>
                                </div>
                            </div>

                        </div>
                        <div className={'horizontal-center'} style={{ marginTop: '40px' }}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <div className={'horizontal-center'}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <h2 id='intro3' style={{ padding: '20px 0', textAlign: 'center' }}>Check your result</h2>
                        <div className={'horizontal-center'} >
                            <div style={{ width: '300px' }}>
                                <Input.Group compact>
                                    <Input style={{ width: 'calc(100% - 73px)', paddingTop: '2px', paddingBottom: '2px' }} placeholder={'Order number'} maxLength={4} />
                                    <Button type="primary">Show</Button>
                                </Input.Group>
                            </div>
                        </div>
                        <div className={'horizontal-center'} style={{ marginTop: '40px' }}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <div className={'horizontal-center'}>
                            <img src={bottom_arrow} style={{ width: '50px' }} />
                        </div>
                        <div className={'horizontal-center'} style={{ marginTop: '50px' }}>
                            <img alt={'PP logo'} src={pp_img} style={{ margin: '0 50px', height: '100px' }} />
                            <img alt={'RNApolis logo'} src={rna_polis_img} style={{ margin: '0 50px', width: '200px', objectFit: 'contain' }} />
                            <img alt={'ICHB logo'} src={ichb_img} style={{ margin: '0 50px', height: '100px' }} />

                        </div>
                    </div>
                </Content>

            </>)
    }
}