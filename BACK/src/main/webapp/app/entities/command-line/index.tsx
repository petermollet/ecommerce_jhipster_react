import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CommandLine from './command-line';
import CommandLineDetail from './command-line-detail';
import CommandLineUpdate from './command-line-update';
import CommandLineDeleteDialog from './command-line-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommandLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommandLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommandLineDetail} />
      <ErrorBoundaryRoute path={match.url} component={CommandLine} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CommandLineDeleteDialog} />
  </>
);

export default Routes;
