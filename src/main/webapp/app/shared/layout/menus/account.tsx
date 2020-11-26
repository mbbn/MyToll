import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {Divider, Menu, MenuProps, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {common} from '@material-ui/core/colors';
import {KeyboardArrowDown, KeyboardArrowLeft, Input, Settings, Lock, PersonAdd, ExitToApp} from '@material-ui/icons';
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
  const [accountMenu, setAccountMenu] = useState(null);
  const history = useHistory();
  return <div>
    <MenuItem onClick={(event)=>{setAccountMenu(event.currentTarget)}} style={{color: common.white}}>
      <ListItemText>{translate('global.menu.account.main')}</ListItemText>
      <ListItemIcon aria-controls="account-menu" aria-haspopup="true" style={{color: common.white, minWidth:'auto'}}>
        {accountMenu ? <KeyboardArrowDown/>:<KeyboardArrowLeft/>}
      </ListItemIcon>
    </MenuItem>
    <StyledMenu id="account-menu"
          anchorEl={accountMenu}
          keepMounted
          onClose={() => setAccountMenu(false)}
          open={Boolean(accountMenu)}>
      {isAuthenticated ? <>
         <MenuItem onClick={()=>{history.push('/account/settings');setAccountMenu(false);}}>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.settings')}</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={()=>{history.push('/account/password');setAccountMenu(false);}}>
          <ListItemIcon>
            <Lock/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.password')}</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={()=>{history.push('/logout');setAccountMenu(false);}}>
          <ListItemIcon>
            <ExitToApp/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.logout')}</ListItemText>
        </MenuItem>
      </> : <>
        <MenuItem onClick={()=>{history.push('/login');setAccountMenu(false);}}>
          <ListItemIcon>
            <Input/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.login')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>{history.push('/account/register');setAccountMenu(false);}}>
          <ListItemIcon>
            <PersonAdd/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.account.register')}</ListItemText>
        </MenuItem>
          </>}
    </StyledMenu>
  </div>;
};

export default AccountMenu;
