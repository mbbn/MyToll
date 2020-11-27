import React from 'react';
import {Divider} from '@material-ui/core';
import {translate} from 'react-jhipster';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import MenuItem from "app/shared/layout/menus/menu-item";

export const AccountMenu = ({ isAuthenticated = false }) => {
  return <NavDropdown title={translate('global.menu.account.main')} icon={faUsers}>
    {isAuthenticated ? <>
      <MenuItem title={translate('global.menu.account.settings')} to={'/account/settings'} icon={'wrench'}/>
      <MenuItem title={translate('global.menu.account.password')} to={'/account/password'} icon={'lock'}/>
      <MenuItem title={translate('global.menu.account.logout')} to={'/logout'} icon={'sign-out-alt'}/>
    </> : <>
      <MenuItem title={translate('global.menu.account.login')} to={'/login'} icon={'sign-in-alt'}/>
      <MenuItem title={translate('global.menu.account.register')} to={'/account/register'} icon={'sign-in-alt'}/>
    </>}
  </NavDropdown>;
};

export default AccountMenu;
