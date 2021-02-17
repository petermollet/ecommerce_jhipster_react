import React from 'react';
import NavBar from './../components/header-footer/NavBar';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

const RoutesWithNavigation = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <main>
                <Routes />
            </main>
        </BrowserRouter>
    );
};

export default RoutesWithNavigation;