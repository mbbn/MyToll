import React from 'react';
import {faUserShield} from '@fortawesome/free-solid-svg-icons'
import {translate } from 'react-jhipster';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import MenuItem from "app/shared/layout/menus/menu-item";

export const AdminMenu = ({ showSwagger, showDatabase}) => {
  return <NavDropdown title={translate('global.menu.admin.main')} icon={faUserShield}>
    <MenuItem title={translate('global.menu.admin.userManagement')} to={'/admin/user-management'} icon={'user'}/>
    <MenuItem title={translate('global.menu.admin.metrics')} to={'/admin/metrics'} icon={'tachometer-alt'}/>
    <MenuItem title={translate('global.menu.admin.health')} to={'/admin/health'} icon={'heart'}/>
    <MenuItem title={translate('global.menu.admin.configuration')} to={'/admin/configuration'} icon={'list'}/>
    <MenuItem title={translate('global.menu.admin.audits')} to={'/admin/audits'} icon={'bell'}/>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    <MenuItem title={translate('global.menu.admin.logs')} to={'/admin/logs'} icon={'tasks'}/>
    {showSwagger ? <MenuItem title={translate('global.menu.admin.apidocs')} to={'/admin/docs'} icon={'book'}/> : null}
    {showDatabase ? <MenuItem title={translate('global.menu.admin.database')} to={'/h2-console'} icon={'hdd'}/> : null}
  </NavDropdown>;
};

export default AdminMenu;
