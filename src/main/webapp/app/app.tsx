import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {hot} from 'react-hot-loader';

import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {getProfile} from 'app/shared/reducers/application-profile';
import {setLocale} from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import {hasAnyAuthority} from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import {AUTHORITIES} from 'app/config/constants';
import {StylesProvider, jssPreset, ThemeProvider} from "@material-ui/core/styles";
import {CssBaseline, Grid} from '@material-ui/core';
import myTollTheme from "app/ContextManager";
import AppRoutes from 'app/routes';
import {create} from "jss";
import rtl from "jss-rtl";



// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const paddingTop = '70px';
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={myTollTheme}>
        <CssBaseline/>
        <Router basename={baseHref}>
          <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container"
                          toastClassName="toastify-toast"/>
          <ErrorBoundary>
            <Header
              isAuthenticated={props.isAuthenticated}
              isAdmin={props.isAdmin}
              currentLocale={props.currentLocale}
              onLocaleChange={props.setLocale}
              ribbonEnv={props.ribbonEnv}
              isInProduction={props.isInProduction}
              isSwaggerEnabled={props.isSwaggerEnabled}
            />
          </ErrorBoundary>
          <Grid container spacing={2} style={{paddingTop, minHeight: '90vh'}}>
            <Grid item xs={12} style={{padding: 15}}>
              <ErrorBoundary>
                <AppRoutes/>
              </ErrorBoundary>
            </Grid>
          </Grid>
          <Footer/>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
