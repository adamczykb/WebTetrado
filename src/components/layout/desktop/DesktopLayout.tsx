import React from 'react';
import { Layout, Menu } from 'antd';
import '../../../assets/css/DesktopLayout.css';
import IndexRouter from '../../../routes/router';
//@ts-ignore
import logo from '../../../assets/images/faviconold.ico';
const { Header, Content, Footer } = Layout;

export class DesktopLayout extends React.Component {

    render(): React.ReactNode {
        return (

            <Layout>
                <Header className={'horizontal-center'} style={{ position: 'fixed', zIndex: 1, width: '100%', userSelect: 'none' }}>
                    <div style={{ width: '1400px' }}>
                        <div className={'vertical-center'} style={{ float: 'left', fontSize: '24px', paddingLeft: '10px', color: 'white' }}>
                            <img src={logo} style={{ height: '42px', paddingRight: '10px' }} />
                            WebTetrado
                        </div>
                        <Menu theme='dark' mode="horizontal" style={{ float: 'left', paddingLeft: '10px' }}>
                            <Menu.Item key="1">Home</Menu.Item>
                            <Menu.Item key="2">Help</Menu.Item>
                            <Menu.Item key="3">About</Menu.Item>
                        </Menu>
                    </div>
                </Header>

                <IndexRouter />

                <Footer style={{ textAlign: 'center' }}>WebTetrado 2022 | XYZ</Footer>
            </Layout>
        )
    }
}