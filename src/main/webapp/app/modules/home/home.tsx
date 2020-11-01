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
  TabPane,
  Label,
  Button
} from 'reactstrap';
import {Fab} from '@material-ui/core'
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from "jalali-react-datepicker";
import { IRootState } from 'app/shared/reducers';
import {convertDateTimeToServer} from "app/shared/util/date-utils";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account, plateBillEntity } = props;
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  };

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
                <AvForm model={plateBillEntity} onSubmit={saveEntity}>
                  <Row>
                    <Col xs="2" style={{paddingTop: 25, paddingRight: 25}}>
                      <Label id="plateLabel" for="plate-bill-plate" style={{fontSize: 30}}>
                        <Translate contentKey="myTollApp.plateBill.plate">Plate</Translate>
                      </Label>
                    </Col>
                    <Col xs="10">
                      <Row className="justify-content-center" style={{borderStyle: "solid", borderRadius: 10, margin: 5, direction: 'ltr'}}>
                        <Col xs="1" style={{
                          background: "url('../../../../content/images/iran.png') 3px 5px / 80% no-repeat rgb(4, 111, 218)",
                          padding: 1
                        }}/>
                        <Col xs="2" style={{padding: 0}}>
                          <AvInput style={{fontSize: 30, textAlign: 'center'}}
                                   id="plate-part1"
                                   type="text"
                                   name="part1"
                                   maxLength="2"
                                   validate={{
                                     required: {value: true, errorMessage: translate('entity.validation.required')},
                                   }}/>
                        </Col>
                        <Col xs="3" style={{padding: 0}}>
                          <AvInput style={{
                            fontSize: 30,
                            textAlignLast: 'center',
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 1
                          }}
                                   id="plate-part2"
                                   type="select"
                                   className="form-control"
                                   name="part2"
                                   value={''}
                          >
                            <option/>
                            <option value="10">{translate('myTollApp.PlateAlphabet.A10')}</option>
                            <option value="11">{translate('myTollApp.PlateAlphabet.A11')}</option>
                            <option value="12">{translate('myTollApp.PlateAlphabet.A12')}</option>
                            <option value="13">{translate('myTollApp.PlateAlphabet.A13')}</option>
                            <option value="14">{translate('myTollApp.PlateAlphabet.A14')}</option>
                            <option value="15">{translate('myTollApp.PlateAlphabet.A15')}</option>
                            <option value="16">{translate('myTollApp.PlateAlphabet.A16')}</option>
                            <option value="17">{translate('myTollApp.PlateAlphabet.A17')}</option>
                            <option value="18">{translate('myTollApp.PlateAlphabet.A18')}</option>
                            <option value="19">{translate('myTollApp.PlateAlphabet.A19')}</option>
                            <option value="20">{translate('myTollApp.PlateAlphabet.A20')}</option>
                            <option value="21">{translate('myTollApp.PlateAlphabet.A21')}</option>
                            <option value="22">{translate('myTollApp.PlateAlphabet.A22')}</option>
                            <option value="23">{translate('myTollApp.PlateAlphabet.A23')}</option>
                            <option value="24">{translate('myTollApp.PlateAlphabet.A24')}</option>
                            <option value="25">{translate('myTollApp.PlateAlphabet.A25')}</option>
                            <option value="26">{translate('myTollApp.PlateAlphabet.A26')}</option>
                            <option value="27">{translate('myTollApp.PlateAlphabet.A27')}</option>
                            <option value="28">{translate('myTollApp.PlateAlphabet.A28')}</option>
                            <option value="29">{translate('myTollApp.PlateAlphabet.A29')}</option>
                            <option value="30">{translate('myTollApp.PlateAlphabet.A30')}</option>
                            <option value="31">{translate('myTollApp.PlateAlphabet.A31')}</option>
                            <option value="32">{translate('myTollApp.PlateAlphabet.A32')}</option>
                            <option value="33">{translate('myTollApp.PlateAlphabet.A33')}</option>
                            <option value="34">{translate('myTollApp.PlateAlphabet.A34')}</option>
                            <option value="35">{translate('myTollApp.PlateAlphabet.A35')}</option>
                            <option value="36">{translate('myTollApp.PlateAlphabet.A36')}</option>
                            <option value="37">{translate('myTollApp.PlateAlphabet.A37')}</option>
                            <option value="38">{translate('myTollApp.PlateAlphabet.A38')}</option>
                            <option value="39">{translate('myTollApp.PlateAlphabet.A39')}</option>
                            <option value="40">{translate('myTollApp.PlateAlphabet.A40')}</option>
                            <option value="41">{translate('myTollApp.PlateAlphabet.A41')}</option>
                          </AvInput>
                        </Col>
                        <Col xs="3" style={{padding: 0}}>
                          <AvInput style={{fontSize: 30, textAlign: 'center'}}
                                   id="plate-part3"
                                   type="text"
                                   name="part3"
                                   maxLength="3"
                                   validate={{
                                     required: { value: true, errorMessage: translate('entity.validation.required') },
                                   }}
                          />
                        </Col>
                        <Col xs="3" style={{borderLeftStyle: "solid"}}>
                          <Label id="plateLabel" for="plate-bill-plate" style={{fontSize: 30, margin: 0}}>
                            {translate('myTollApp.plate.iran')}
                          </Label>
                          <AvInput style={{fontSize: 20, textAlign: 'center'}}
                                   id="plate-part4"
                                   type="text"
                                   name="part4"
                                   maxLength="2"
                                   validate={{
                                     required: { value: true, errorMessage: translate('entity.validation.required') },
                                   }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="2" style={{paddingTop: 20, paddingRight: 20}}>
                      <Label id="mobileLabel" for="plate-bill-plate" style={{fontSize: 25, margin: 0}}>
                        {translate('myTollApp.customer.mobile')}
                      </Label>
                    </Col>
                    <Col xs="9">
                      <AvField style={{
                        fontSize: 30,
                        textAlign: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        direction: 'ltr',
                        margin: 5
                      }}
                        id="base-info-title"
                        type="text"
                        name="mobile"
                        maxLength="11"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="5">
                      <DatePicker className={"input"} timePicker={false} label={translate('myTollApp.customer.mobile')}/>
                    </Col>
                    <Col xs="5">
                      <DatePicker className={"input"} timePicker={false} label={translate('myTollApp.customer.mobile')}/>
                    </Col>
                  </Row>
                  <Row>
                    <Button color="primary" id="save-entity" type="submit">
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
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
  plateBillEntity: storeState.plateBill.entity,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
