import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-success">
            <a className="navbar-brand" href="/">Mon jolie site</a>
            <button className="navbar-toggler">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ml-2">
                        <NavLink exact to='/' className='nav-link text-white' activeClassName='text-muted' >Home</NavLink>
                    </li>
                    <li className="nav-item ml-2">
                        <NavLink to='/login' className='nav-link text-white' activeClassName='text-muted' >Login</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavBar;