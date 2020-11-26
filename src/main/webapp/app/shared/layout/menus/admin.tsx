import React, {useState} from 'react';
import {useHistory} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {translate } from 'react-jhipster';
import {Divider, Menu, MenuProps, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {common} from '@material-ui/core/colors';
import {KeyboardArrowDown, KeyboardArrowLeft} from '@material-ui/icons';
import {withStyles} from '@material-ui/core/styles';

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

export const AdminMenu = ({ showSwagger, showDatabase}) => {
  const [adminMenu, setAdminMenu] = useState(null);
  const history = useHistory();
  return <div>
    <MenuItem onClick={(event)=>{setAdminMenu(event.currentTarget)}} style={{color: common.white}}>
      <ListItemText>{translate('global.menu.admin.main')}</ListItemText>
      <ListItemIcon aria-controls="account-menu" aria-haspopup="true" style={{color: common.white, minWidth:'auto'}}>
        {adminMenu ? <KeyboardArrowDown/>:<KeyboardArrowLeft/>}
      </ListItemIcon>
    </MenuItem>
    <StyledMenu id="account-menu"
                anchorEl={adminMenu}
                keepMounted
                onClose={() => setAdminMenu(false)}
                open={Boolean(adminMenu)}>
      <MenuItem onClick={() => {
        history.push('/admin/user-management');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'user'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.userManagement')}</ListItemText>
      </MenuItem>
      <Divider/>
      {/* <MenuItem onClick={() => {
        history.push('/admin/metrics');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'tachometer-alt'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.metrics')}</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={() => {
        history.push('/admin/health');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'heart'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.health')}</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={() => {
        history.push('/admin/configuration');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'list'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.configuration')}</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={() => {
        history.push('/admin/audits');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'bell'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.audits')}</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={() => {
        history.push('/admin/logs');
        setAdminMenu(false);
      }}>
        <ListItemIcon>
          <FontAwesomeIcon icon={'tasks'}/>
        </ListItemIcon>
        <ListItemText>{translate('global.menu.admin.logs')}</ListItemText>
      </MenuItem>
      <Divider/>
      {showSwagger ?
          <MenuItem onClick={() => {
            history.push('/admin/docs');
            setAdminMenu(false);
          }}>
              <ListItemIcon>
                  <FontAwesomeIcon icon={'book'}/>
              </ListItemIcon>
              <ListItemText>{translate('global.menu.admin.apidocs')}</ListItemText>
          </MenuItem>:null}
      <Divider/>
      {showDatabase ?
        <MenuItem onClick={() => {
          history.push('/h2-console');
          setAdminMenu(false);
        }}>
          <ListItemIcon>
            <FontAwesomeIcon icon={'hdd'}/>
          </ListItemIcon>
          <ListItemText>{translate('global.menu.admin.database')}</ListItemText>
        </MenuItem>:null}*/}
    </StyledMenu>
  </div>;
};

export default AdminMenu;
