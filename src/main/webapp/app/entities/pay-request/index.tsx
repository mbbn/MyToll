import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PayRequest from './pay-request';
import PayRequestDetail from './pay-request-detail';
import PayRequestUpdate from './pay-request-update';
import PayRequestDeleteDialog from './pay-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PayRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PayRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PayRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={PayRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PayRequestDeleteDialog} />
  </>
);

export default Routes;
