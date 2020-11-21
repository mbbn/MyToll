import './header.scss';

import React, {useState, useEffect} from 'react';
import {Translate, Storage} from 'react-jhipster';
import {AppBar, Toolbar, Link} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import LoadingBar from 'react-redux-loading-bar';
import {isRTL} from 'app/config/translation';
import {Home, Brand} from './header-components';
import {AdminMenu, EntitiesMenu, AccountMenu} from '../menus';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => document.querySelector('html').setAttribute('dir', isRTL(Storage.session.get('locale')) ? 'rtl' : 'ltr'));
  const classes = useStyles();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header" className={classes.root}>
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <AppBar position={"fixed"}>
        <Toolbar variant={"dense"} disableGutters={true}>
          <Home/>
          {props.isAuthenticated && <EntitiesMenu />}
          {/* {props.isAuthenticated && props.isAdmin && (
            <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
          )}*/}
          <AccountMenu isAuthenticated={props.isAuthenticated} />
          <Brand/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
