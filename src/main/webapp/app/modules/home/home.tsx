import './home.scss';

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-jhipster';
import {Tabs, Tab, Paper, Divider, Grid} from '@material-ui/core';
import Toll from "app/modules/toll/toll";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account} = props;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Grid container spacing={2}>
      <Grid sm={4} item>
        <Paper elevation={2} square={true}>
          <Tabs aria-label="simple tabs example" value={activeTab} onChange={(event, value) => {setActiveTab(value)}}>
            <Tab id={'toll-0'} label={translate('home.tabs.marginalTolls')} icon={<img alt={translate('home.tabs.marginalTolls')} src="./content/images/park.png"/>}/>
            <Tab id={'toll-1'} label={translate('home.tabs.freeWayTolls')} icon={<img alt={translate('home.tabs.freeWayTolls')} src="./content/images/Freeway.png"/>}/>
          </Tabs>
          <Divider style={{marginBottom:10}}/>
          <div
            role="tabpanel"
            hidden={activeTab !== 0}
            id={`toll-0`}
            aria-labelledby={`simple-tab-0`}
          >
            <Toll category={'SIDEPARK'}/>
          </div>
          <div
            role="tabpanel"
            hidden={activeTab !== 1}
            id={`toll-1`}
            aria-labelledby={`simple-tab-1`}
          >
            <Toll category={'HIGHWAY'}/>
          </div>
        </Paper>
      </Grid>
      <Grid sm={8} item>
        {/* <Card>
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
        </Card>*/}
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
