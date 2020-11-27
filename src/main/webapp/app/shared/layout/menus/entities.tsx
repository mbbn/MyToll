import React from 'react';
import {translate} from 'react-jhipster';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import {faTags, faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import MenuItem from "app/shared/layout/menus/menu-item";

export const EntitiesMenu = () => {
  return (<NavDropdown title={translate('global.menu.entities.main')} icon={faTags}>
    <MenuItem title={translate('global.menu.entities.payRequest')} to={'/pay-request'} icon={faMoneyBill}/>
    </NavDropdown>);
};
