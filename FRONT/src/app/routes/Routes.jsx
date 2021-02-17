import React from 'react';
import { createBrowserHistory } from "history";
import { Switch, Route } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from './../shared/constants/urlConstants';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

const customHistory = createBrowserHistory();

const Routes = ({ setIsLogged }) => {
    return (
        <Switch history={customHistory}>
            <Route exact path={URL_HOME} component={HomeView} />
            <Route path={URL_LOGIN} render={(props) => <LoginView setIsLogged={setIsLogged} {...props}/>} />
        </Switch>
    );
};

export default Routes;