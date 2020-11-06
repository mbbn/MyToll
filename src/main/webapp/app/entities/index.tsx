import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BaseInfo from './base-info';
import Customer from './customer';
import Plate from './plate';
import PlateBill from './plate-bill';
import TollRequest from './toll-request';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}base-info`} component={BaseInfo} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}plate`} component={Plate} />
      <ErrorBoundaryRoute path={`${match.url}plate-bill`} component={PlateBill} />
      <ErrorBoundaryRoute path={`${match.url}toll-request`} component={TollRequest} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
