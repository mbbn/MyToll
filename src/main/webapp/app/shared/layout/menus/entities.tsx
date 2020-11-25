import React, {useState} from 'react';
import {MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {common} from '@material-ui/core/colors';
import {KeyboardArrowDown, KeyboardArrowLeft} from '@material-ui/icons';
import {translate} from 'react-jhipster';

export const EntitiesMenu = props => {
  const [entityMenu, setEntityMenu] = useState(null);
  return (
    <div>
      <MenuItem onClick={(event)=>{setEntityMenu(event.currentTarget)}} style={{color: common.white}}>
        <ListItemText>{translate('global.menu.entities.main')}</ListItemText>
        <ListItemIcon aria-controls="account-menu" aria-haspopup="true" style={{color: common.white, minWidth: 'auto'}}>
          {entityMenu ? <KeyboardArrowDown/>:<KeyboardArrowLeft/>}
        </ListItemIcon>
      </MenuItem>
    </div>);
};
