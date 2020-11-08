import React from 'react';
import { Translate } from 'react-jhipster';
import {Link} from '@material-ui/core';
import {HomeSharp} from '@material-ui/icons';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <Link href={"/"} className="brand-logo" style={{marginRight:'auto'}} dir="ltr">
    <BrandIcon/>
    <span className="brand-title">
      <Translate contentKey="global.title">MyToll</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </Link>
);

export const Home = props => (
  <Link>
    <HomeSharp/>
    <Translate contentKey="global.menu.home">Home</Translate>
  </Link>);
