import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {Divider, Menu, MenuProps, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {common} from '@material-ui/core/colors';
import {KeyboardArrowDown, KeyboardArrowLeft, Input, Settings, Lock, ExitToApp} from '@material-ui/icons';
import {translate} from 'react-jhipster';

const StyledMenu = withStyles({
  paper: {
    marginTop: 10,
    border: '1px solid #d3d4d5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 0
  },
})((props: MenuProps) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export const AccountMenu = ({ isAuthenticated = false }) => {
  const [adminMenu, setAdminMenu] = useState(null);
  const history = useHistory();
  return <div>
    <MenuItem onClick={(event)=>{setAdminMenu(event.currentTarget)}} style={{color: common.white}}>
      <ListItemText>{translate('global.menu.account.main')}</ListItemText>
      <ListItemIcon aria-controls="account-menu" aria-haspopup="true" style={{color: common.white, minWidth:'auto'}}>
        {adminMenu ? <KeyboardArrowDown/>:<KeyboardArrowLeft/>}
      </ListItemIcon>
    </MenuItem>
    <StyledMenu id="account-menu"
          anchorEl={adminMenu}
          keepMounted
          onClose={() => setAdminMenu(false)}
          open={Boolean(adminMenu)}>
      {isAuthenticated ? <>
         <MenuItem onClick={()=>{history.push('./account/settings');setAdminMenu(false);}}>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.settings')}</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={()=>{history.push('./account/password');setAdminMenu(false);}}>
          <ListItemIcon>
            <Lock/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.password')}</ListItemText>
        </MenuItem>
        <Divider/>
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
        {/* <MenuItem onClick={()=>{history.push('./account/register');setAdminMenu(false);}}>
          <ListItemIcon>
            <PersonAdd/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.register')}</ListItemText>
        </MenuItem>*/}
          </>}
    </StyledMenu>
  </div>;
};

export default AccountMenu;
