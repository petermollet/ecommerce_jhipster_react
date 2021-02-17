import React from 'react';
import { NavLink } from 'react-router-dom';
import { URL_HOME } from './../../shared/constants/urlConstants';
import Connection from './Connection';

const NavBar = ({ isLogged, setIsLogged }) => {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-success">
            <a className="navbar-brand" href="/">Mon jolie site</a>
            <button className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ml-2">
                        <NavLink exact to={URL_HOME} className='nav-link text-white' activeClassName='text-muted' >Home</NavLink>
                    </li>
                    <li className="nav-item ml-2">
                        <Connection isLogged={isLogged} setIsLogged={setIsLogged} />
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavBar;