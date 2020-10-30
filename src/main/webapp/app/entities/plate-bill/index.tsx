import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PlateBill from './plate-bill';
import PlateBillDetail from './plate-bill-detail';
import PlateBillUpdate from './plate-bill-update';
import PlateBillDeleteDialog from './plate-bill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlateBillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlateBillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlateBillDetail} />
      <ErrorBoundaryRoute path={match.url} component={PlateBill} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlateBillDeleteDialog} />
  </>
);

export default Routes;
