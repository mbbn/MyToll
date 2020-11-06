import React, {useState} from 'react';
import {Link, Menu, MenuItem} from '@material-ui/core';
import {VerifiedUser} from '@material-ui/icons';
// import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import {languages} from "app/config/translation";

const accountMenuItemsAuthenticated = (
  <>
    {/* <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>*/}
  </>
);

const accountMenuItems = (
  <>
    {/* <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="sign-in-alt" to="/account/register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>*/}
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => {
  const [adminMenu, setAdminMenu] = useState(null);
  return <>
    <Link aria-controls="account-menu" aria-haspopup="true" onClick={(event)=>{setAdminMenu(event.currentTarget)}}>
      <VerifiedUser/>
      <span>{translate('global.menu.account.main')}</span>
    </Link>
  </>;
  /* return <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>;*/
};

export default AccountMenu;
