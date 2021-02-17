import React, { useState } from 'react';
import NavBar from './../components/header-footer/NavBar';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { isAuthenticated } from './../shared/services/authenticationServices';

const RoutesWithNavigation = () => {
    /**
     * TODO: Temp. Need ReactRedux for better performance
     */
    const [isLogged, setIsLogged] = useState(isAuthenticated())
    return (
        <BrowserRouter>
            <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />
            <main>
                <Routes setIsLogged={setIsLogged} />
            </main>
        </BrowserRouter>
    );
};

export default RoutesWithNavigation;