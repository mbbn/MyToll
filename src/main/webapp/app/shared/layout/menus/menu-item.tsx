import React from 'react';

import {MenuItem as MuiMenuItem, MenuItemProps, ListItemText} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem extends MenuItemProps {
  title: string;
  icon?: IconProp;
  to: string;
  id?: string;
  iconStyle?:any;
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const {title, to, icon, id, iconStyle,...other} = this.props;

    return (
      <MuiMenuItem component={'a'} href={to} id={id} dense={true} divider={true}>
        <FontAwesomeIcon icon={icon} fixedWidth style={{marginLeft: 5, ...iconStyle}}/>
        <ListItemText>{title}</ListItemText>
      </MuiMenuItem>
    );
  }
}
