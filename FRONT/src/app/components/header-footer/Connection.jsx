import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from './../../shared/services/authenticationServices';
import { URL_LOGIN } from '../../shared/constants/urlConstants';

const LoginLink = () => (
    <NavLink to={URL_LOGIN} className='nav-link text-white' activeClassName='text-muted'>Sign in</NavLink>
)

const DeconnectionButton = ({setIsLogged}) => (
    <button className='btn btn-link nav-link text-white' onClick={() => signOut(setIsLogged)} >Sign out</button>
)

const Connection = ({ isLogged, setIsLogged }) => isLogged ? <DeconnectionButton setIsLogged={setIsLogged} /> : <LoginLink/>


export default Connection;