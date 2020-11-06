import React from 'react';
import {MenuList, MenuItem} from '@material-ui/core'
import {IconButton, Link} from '@material-ui/core';
import {List} from '@material-ui/icons';
import { Translate, translate } from 'react-jhipster';

export const EntitiesMenu = props => (
    <IconButton>
        <List/>
        <span>
        <Translate contentKey="global.menu.home">global.menu.entities.main</Translate>
      </span>
    </IconButton>
  /* <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/base-info">
      <Translate contentKey="global.menu.entities.baseInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/plate">
      <Translate contentKey="global.menu.entities.plate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/plate-bill">
      <Translate contentKey="global.menu.entities.plateBill" />
    </MenuItem>
    {/!* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here *!/}
  </NavDropdown>*/
);
