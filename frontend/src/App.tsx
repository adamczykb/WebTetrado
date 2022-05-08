import React, { useEffect } from 'react';
import './assets/css/App.css';
import { useMediaQuery } from 'react-responsive';
import { DesktopLayout } from './components/layout/desktop/Layout';
import { MobileLayout } from './components/layout/mobile/Layout';

export default function App () {
    let isDesktop:Boolean= useMediaQuery({ query: "(min-width: 900px)" });
    
    return <>{isDesktop ? <DesktopLayout /> : <MobileLayout />}</>;
}


