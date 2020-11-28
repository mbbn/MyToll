import React from 'react';
import {translate} from 'react-jhipster';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import {faTags, faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons'
import MenuItem from "app/shared/layout/menus/menu-item";
import {green} from '@material-ui/core/colors';

export const EntitiesMenu = () => {
  return (<NavDropdown title={translate('global.menu.entities.main')} icon={faTags}>
    <MenuItem title={translate('global.menu.entities.payRequest')} to={'/pay-request'} icon={faMoneyBillWaveAlt} iconStyle={{color:green["500"]}}/>
    </NavDropdown>);
};
