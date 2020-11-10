import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Tooltip} from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate } from 'react-jhipster';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const accountMenuItemsAuthenticated = (
  <>
     <StyledMenuItem>
       <FontAwesomeIcon icon={'wrench'}/>
       {translate('global.menu.account.settings')}
    </StyledMenuItem>
    <StyledMenuItem>
      <FontAwesomeIcon icon={'lock'}/>
      {translate('global.menu.account.password')}
    </StyledMenuItem>
    <StyledMenuItem>
      <FontAwesomeIcon icon={'sign-out-alt'}/>
      {translate('global.menu.account.logout')}
    </StyledMenuItem>
  </>
);

const accountMenuItems = (
  <>
    <StyledMenuItem id="login-item">
      <FontAwesomeIcon icon={'sign-in-alt'}/>
      {translate('global.menu.account.login')}
    </StyledMenuItem>
    <StyledMenuItem>
      <FontAwesomeIcon icon={'sign-in-alt'}/>
      {translate('global.menu.account.register')}
    </StyledMenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => {
  const [adminMenu, setAdminMenu] = useState(null);
  return <>
    <Tooltip title={translate('global.menu.account.main')}>
      <IconButton aria-controls="account-menu" aria-haspopup="true" onClick={(event)=>{setAdminMenu(event.currentTarget)}}>
        <FontAwesomeIcon icon={'user'}/>
      </IconButton>
    </Tooltip>
    <StyledMenu id="account-menu"
          anchorEl={adminMenu}
          keepMounted
          onClose={() => setAdminMenu(false)}
          open={Boolean(adminMenu)}>
      {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
    </StyledMenu>
  </>;
};

export default AccountMenu;
