import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import {Grid} from '@material-ui/core';

const Footer = props => (
  <div className="footer page-content">
    <Grid container>
      <Grid item md={12}>
        <p>
          <Translate contentKey="footer">Your footer</Translate>
        </p>
      </Grid>
    </Grid>
  </div>
);

export default Footer;
