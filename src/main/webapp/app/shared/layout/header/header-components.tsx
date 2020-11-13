import React from 'react';
import {Translate, translate} from 'react-jhipster';
import {IconButton, Tooltip} from '@material-ui/core';
import {HomeSharp} from '@material-ui/icons';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/cpay.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <Tooltip title={translate('global.title')}>
    <IconButton href={"/"} className="brand-logo" style={{marginRight: 'auto'}} dir="ltr">
      <BrandIcon/>
      <span>
        <Translate contentKey="global.title">MyToll</Translate>
      </span>
      {/* <span className="navbar-version">{appConfig.VERSION}</span>*/}
    </IconButton>
  </Tooltip>);

export const Home = props => (
    <Tooltip title={translate('global.menu.home')}>
      <IconButton href={'./'}>
        <HomeSharp/>
      </IconButton>
    </Tooltip>);
