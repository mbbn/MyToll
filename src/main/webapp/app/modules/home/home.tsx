import './home.scss';

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import {
  Row,
  Col,
  Alert,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TabContent,
  TabPane
} from 'reactstrap';
import {Fab} from '@material-ui/core'
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {convertDateTimeToServer} from "app/shared/util/date-utils";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  };

  const saveEntity = (event, errors, values) => {
    values.creationTime = convertDateTimeToServer(values.creationTime);
    values.lastUpdateTime = convertDateTimeToServer(values.lastUpdateTime);

    if (errors.length === 0) {
      const entity = {
        ...values,
      };

      // props.createEntity(entity);
    }
  };

  return (
    <Row>
      <Col sd="4">
        <Card style={{padding:0}}>
          <CardHeader style={{paddingBottom:0}}>
            <Nav id="bill-tabs" tabs style={{paddingRight:0}}>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >
                  <img src="../../../../content/images/Freeway.png"/>
                  <span style={{paddingRight: 5}}><Translate contentKey="home.tabs.freeWayTolls">FreeWay Tolls</Translate></span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >
                  <img src="../../../../content/images/park.png"/>
                  <span style={{paddingRight: 5}}><Translate contentKey="home.tabs.marginalTolls">Marginal Tolls</Translate></span>
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AvForm model={{}} onSubmit={saveEntity}>
                  <Row className="justify-content-center" style={{borderStyle: "solid", borderRadius: 10, margin: 5, direction: 'ltr'}}>
                    <Col sm="1" style={{
                      background: "url('../../../../content/images/iran.png') 3px 5px / 80% no-repeat rgb(4, 111, 218)",
                      padding: 1
                    }}/>
                    <Col sm="2">
                      <AvInput style={{fontSize: 30}}
                        id="base-info-title"
                        type="text"
                        name="title"
                        maxLength="2"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </Col>
                    <Col sm="2">
                      <Row style={{borderStyle: "solid", borderRadius: 5, margin: 2, borderWidth: 1}}>
                        <AvInput style={{fontSize: 30}}
                          id="base-info-category"
                          type="select"
                          className="form-control"
                          name="category"
                          value={'PLATE_MAP'}
                        >
                          <option value="PLATE_MAP">{translate('myTollApp.BaseInfoCategory.PLATE_MAP')}</option>
                        </AvInput>
                      </Row>
                    </Col>
                    <Col sm="4">
                      <AvInput style={{fontSize: 30}}
                        id="base-info-title"
                        type="text"
                        name="title"
                        maxLength="3"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </Col>

                    <Col sm="3" style={{borderLeftStyle: "solid"}}>
                      <AvInput style={{fontSize: 30}}
                        id="base-info-title"
                        type="text"
                        name="title"
                        maxLength="2"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm="8" style={{borderRadius: 10, borderWidth:1, borderStyle: 'solid', direction: 'ltr'}}>
                      <AvInput style={{fontSize: 30, textAlign: 'center'}}
                        id="base-info-title"
                        type="text"
                        name="title"
                        maxLength="11"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </Col>
                  </Row>
                </AvForm>
              </TabPane>
              <TabPane tabId="2">
                <div id="park">park</div>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
      <Col md="8">
        <Card>
          <CardHeader>
            <h2>
              <Translate contentKey="home.title">Welcome!</Translate>
            </h2>
          </CardHeader>
          <CardBody>
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
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
