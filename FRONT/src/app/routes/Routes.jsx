import React from 'react';
import { createBrowserHistory } from "history";
import { Switch, Route } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from './../shared/constants/urlConstants';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

const customHistory = createBrowserHistory();

const Routes = () => {
    return (
        <Switch history={customHistory}>
            <Route exact path={URL_HOME} component={HomeView} />
            <Route path={URL_LOGIN} component={LoginView} />
        </Switch>
    );
};

export default Routes;