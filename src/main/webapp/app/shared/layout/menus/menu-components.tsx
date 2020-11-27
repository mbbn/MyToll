import React, {useState} from 'react';

import {common} from '@material-ui/core/colors';
import {withStyles, useTheme} from '@material-ui/core/styles';
import {useMediaQuery, Menu, MenuProps, MenuItem, Tooltip, ListItemText} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

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
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

interface INavDropdownProp {
  title: string;
  icon?: IconProp;
  children: any;
}

export const NavDropdown = (props: INavDropdownProp) => {
  const {title, icon, children} = props;
  const [menu, setMenu] = useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (<div>
    <Tooltip title={title}>
      <MenuItem style={{color: common.white}} onClick={(event) => setMenu(event.target)} dense={true} divider={true}>
        <FontAwesomeIcon icon={icon} fixedWidth style={{marginLeft: 5, color: common.white}}/>
        {matches ? <ListItemText>{title}</ListItemText> : null}
      </MenuItem>
    </Tooltip>
    <StyledMenu id="account-menu"
                anchorEl={menu}
                keepMounted
                onClose={() => setMenu(false)}
                open={Boolean(menu)}>
      {children}
    </StyledMenu>
  </div>);
};
