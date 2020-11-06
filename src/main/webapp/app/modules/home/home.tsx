import './home.scss';

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Translate, translate} from 'react-jhipster';
import {AppBar, Tabs, Tab, Card, CardHeader, CardContent} from '@material-ui/core'
import {
  Row,
  Col,
  Alert} from 'reactstrap';
import Freeway from "app/modules/toll/freeway";
import Marginal from "app/modules/toll/marginal";
import TollDataTable from "app/modules/toll/tollDataTable";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account, plateBillEntity } = props;
  const [activeTab, setActiveTab] = useState(0);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        mobile: values['mobile'],
        plate: values['part1'] + values['part2'] + values['part3'] + values['part4'],
      };

      // props.createEntity(entity);
      /* eslint-disable no-console */
      console.log(entity);
    }
  };

  return (
    <Row>
      <Col xs="4">
        <Card>
          <AppBar position="static" color="default">
            <Tabs aria-label="simple tabs example" value={activeTab} onChange={(event, value) => {setActiveTab(value)}}>
              <Tab id={'toll-0'} label={translate('home.tabs.freeWayTolls')} icon={<img src="../../../../content/images/Freeway.png"/>}/>
              <Tab disabled={true} id={'toll-1'} label={translate('home.tabs.marginalTolls')} icon={<img src="../../../../content/images/park.png"/>}/>
            </Tabs>
          </AppBar>
          <CardContent>
            <div
              role="tabpanel"
              hidden={activeTab !== 0}
              id={`toll-0`}
              aria-labelledby={`simple-tab-0`}
            >
              <Freeway/>
            </div>
            <div
              role="tabpanel"
              hidden={activeTab !== 1}
              id={`toll-1`}
              aria-labelledby={`simple-tab-1`}
            >
              <Marginal/>
            </div>
          </CardContent>
        </Card>
      </Col>
      <Col md="8">
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
                  <Link to="/account/register" className="alert-link">
                    <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                  </Link>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TollDataTable/>
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  plateBillEntity: storeState.plateBill.entity,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
