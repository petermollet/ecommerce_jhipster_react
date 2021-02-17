import React from 'react'
import Login from '../components/account/Login';
import { authenticated } from './../api/backend/account';
import { signIn } from './../shared/services/authenticationServices';
import { URL_HOME } from './../shared/constants/urlConstants';

const LoginView = ({ history, setIsLogged }) => {
    const handleLogin = (values) => {
        authenticated(values).then(res => {
            if(res.status === 200) {
                signIn(res.data.id_token, setIsLogged)
                history.push(URL_HOME)
            }
        })
    }

    const initialValues = {
        username:'',
        password:''
    }

    return (
        <div className="container text-center mt-5">
            <Login submit={handleLogin} initialValues={initialValues} />
        </div>
    );
};

export default LoginView