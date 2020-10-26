import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BaseInfo from './base-info';
import BaseInfoDetail from './base-info-detail';
import BaseInfoUpdate from './base-info-update';
import BaseInfoDeleteDialog from './base-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BaseInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BaseInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BaseInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={BaseInfo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BaseInfoDeleteDialog} />
  </>
);

export default Routes;
