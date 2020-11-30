import React from 'react';
import { Translate } from 'react-jhipster';
import {Alert} from '@material-ui/lab';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert color="error">
          <Translate contentKey="error.http.404">The page does not exist.</Translate>
        </Alert>
      </div>
    );
  }
}

export default PageNotFound;
