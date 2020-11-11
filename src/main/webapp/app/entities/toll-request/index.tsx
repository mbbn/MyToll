import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TollRequest from './toll-request';
import TollRequestDetail from './toll-request-detail';
import TollRequestUpdate from './toll-request-update';
import TollRequestDeleteDialog from './toll-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TollRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TollRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TollRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={TollRequest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TollRequestDeleteDialog} />
  </>
);

export default Routes;
