import './home.scss';

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Alert} from '@material-ui/lab';
import {Freeway} from "app/modules/toll/freeway";
import Marginal from "app/modules/toll/marginal";
import {Translate, translate} from 'react-jhipster';
import {AppBar, Tabs, Tab, Card, CardHeader, CardContent, Grid, Button, Link} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import TollRequest from "app/entities/toll-request/toll-request";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account} = props;
  const [activeTab, setActiveTab] = useState(0);
  const [showTollRequest, setShowTollRequest] = useState(false);
  const [bills, setBills] = useState([]);

  const handleClose = ()=>{
    setShowTollRequest(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid sm={4} item>
        <Card>
          <AppBar position="static" color="default">
            <Tabs aria-label="simple tabs example" value={activeTab} onChange={(event, value) => {setActiveTab(value)}}>
              <Tab id={'toll-0'} label={translate('home.tabs.marginalTolls')} icon={<img alt={translate('home.tabs.marginalTolls')} src="./content/images/park.png"/>}/>
              <Tab disabled={true} id={'toll-1'} label={translate('home.tabs.freeWayTolls')} icon={<img alt={translate('home.tabs.freeWayTolls')} src="./content/images/Freeway.png"/>}/>
            </Tabs>
          </AppBar>
          <CardContent>
            <div
              role="tabpanel"
              hidden={activeTab !== 0}
              id={`toll-0`}
              aria-labelledby={`simple-tab-0`}
            >
              <Marginal afterLoadBills={loadedBills => {
                setBills(loadedBills);
                setShowTollRequest(true);
              }}/>
            </div>
            <div
              role="tabpanel"
              hidden={activeTab !== 1}
              id={`toll-1`}
              aria-labelledby={`simple-tab-1`}
            >
              <Freeway afterLoadBills={loadedBills => {
                setBills(loadedBills);
                setShowTollRequest(true);
              }}/>
            </div>
          </CardContent>
        </Card>
        <Dialog open={showTollRequest} fullWidth={true} onClose={handleClose}>
          <DialogTitle>{translate('myTollApp.tollRequest.home.title')}</DialogTitle>
          <DialogContent>
            <TollRequest bills={bills}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default" variant={"contained"}>
              {translate('entity.action.back')}
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus variant={"contained"}>
              {translate('entity.action.pay')}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid sm={8} item>
        <Card>
          <CardHeader>
            <h2>
              <Translate contentKey="home.title">Welcome!</Translate>
            </h2>
          </CardHeader>
          <CardContent>
            <p className="lead">
              <Translate contentKey="home.subtitle">This is your homepage</Translate>
            </p>
            {account && account.login ? (
              <div>
                <Alert color="success">
                  <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                    You are logged in as user {account.login}.
                  </Translate>
                </Alert>
              </div>
            ) : (
              <div>
                <Alert color="warning">
                  <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                  <Link href="/account/register" className="alert-link">
                    <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                  </Link>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
