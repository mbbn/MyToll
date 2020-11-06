import React, {useState} from 'react';
import {Link, Menu, MenuItem} from '@material-ui/core';
import {Flag} from '@material-ui/icons';
import { locales, languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }: { currentLocale: string; onClick: Function }) => {
  const [localeMenu, setLocaleMenu] = useState(null);

  return Object.keys(languages).length > 1 ? (
    <>
      <Link title={currentLocale ? languages[currentLocale].name : undefined} aria-controls="locale-menu" aria-haspopup="true" onClick={(event)=>{setLocaleMenu(event.currentTarget)}}>
        <Flag/>
        <span>{currentLocale ? languages[currentLocale].name : undefined}</span>
      </Link>
      <Menu id="locale-menu"
            anchorEl={localeMenu}
            keepMounted
            open={Boolean(localeMenu)}
            onClose={event => setLocaleMenu(null)}>
        {locales.map(locale => (
          <MenuItem key={locale} value={locale}>
            {languages[locale].name}
          </MenuItem>
        ))}
      </Menu>
    </>
  ) : null;
};
