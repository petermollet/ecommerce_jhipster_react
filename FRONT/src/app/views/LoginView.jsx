import React from 'react'
import Login from '../components/account/Login';
import { authenticated } from './../api/backend/account';
import { signIn } from './../shared/services/authenticationServices';

const LoginView = () => {

    const handleLogin = (values) => {
        authenticated(values).then(res => {
            if(res.status === 200) signIn(res.data.id_token)
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