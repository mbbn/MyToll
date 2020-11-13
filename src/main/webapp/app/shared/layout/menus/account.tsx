import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {Tooltip, Menu, MenuProps, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {common} from '@material-ui/core/colors';
import {AccountCircle, Input, PersonAdd, Lock, ExitToApp} from '@material-ui/icons';
import {translate} from 'react-jhipster';

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

export const AccountMenu = ({ isAuthenticated = false }) => {
  const [adminMenu, setAdminMenu] = useState(null);
  const history = useHistory();
  return <>
    <Tooltip title={translate('global.menu.account.main')}>
      <ListItemIcon aria-controls="account-menu" aria-haspopup="true" onClick={(event)=>{setAdminMenu(event.currentTarget)}}>
        <AccountCircle style={{color: common.white}}/>
      </ListItemIcon>
    </Tooltip>
    <StyledMenu id="account-menu"
          anchorEl={adminMenu}
          keepMounted
          onClose={() => setAdminMenu(false)}
          open={Boolean(adminMenu)}>
      {isAuthenticated ? <>
        <MenuItem onClick={()=>{history.push('./account/settings');setAdminMenu(false);}}>
          <ListItemIcon>
            <AccountCircle/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.settings')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>{history.push('./account/password');setAdminMenu(false);}}>
          <ListItemIcon>
            <Lock/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.password')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>{history.push('./logout');setAdminMenu(false);}}>
          <ListItemIcon>
            <ExitToApp/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.logout')}</ListItemText>
        </MenuItem>
      </> : <>
        <MenuItem onClick={()=>{history.push('./login');setAdminMenu(false);}}>
          <ListItemIcon>
            <Input/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.login')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>{history.push('./account/register');setAdminMenu(false);}}>
          <ListItemIcon>
            <PersonAdd/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.register')}</ListItemText>
        </MenuItem>
          </>}
    </StyledMenu>
  </>;
};

export default AccountMenu;
