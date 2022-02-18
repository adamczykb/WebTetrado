import React from 'react';
import './assets/css/App.css';
import { useMediaQuery } from 'react-responsive';
import { DesktopLayout } from './components/layout/desktop/DesktopLayout';
import { MobileLayout } from './components/layout/mobile/Layout';

export class App extends React.Component {
    // componentDidMount() {
    //     console.log('mounting');
    // }
    // componentDidMount() {
    //     console.log('mounting');
    // }
    isDesktop: Boolean = true;
    componentDidUpdate() {
        this.isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })
        console.log('updated');
    }
    render() {
        return (<>{this.isDesktop ? <DesktopLayout /> : <MobileLayout />}</>);
    }
}


