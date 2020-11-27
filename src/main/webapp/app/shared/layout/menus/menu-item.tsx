import React from 'react';

import {MenuItem as MuiMenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  title: string;
  icon?: IconProp;
  to: string;
  id?: string;
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const {title, to, icon, id} = this.props;

    return (
      <MuiMenuItem component={'a'} href={to} id={id} dense={true} divider={true}>
        <FontAwesomeIcon icon={icon} fixedWidth style={{marginLeft: 5}}/>
        <ListItemText>{title}</ListItemText>
      </MuiMenuItem>
    );
  }
}
