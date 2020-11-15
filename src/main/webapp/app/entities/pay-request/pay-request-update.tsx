import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBill } from 'app/shared/model/bill.model';
import { getEntities as getBills } from 'app/entities/bill/bill.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pay-request.reducer';
import { IPayRequest } from 'app/shared/model/pay-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPayRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayRequestUpdate = (props: IPayRequestUpdateProps) => {
  const [idsbills, setIdsbills] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { payRequestEntity, bills, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pay-request');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBills();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...payRequestEntity,
        ...values,
        bills: mapIdList(values.bills),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myTollApp.payRequest.home.createOrEditLabel">
            <Translate contentKey="myTollApp.payRequest.home.createOrEditLabel">Create or edit a PayRequest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : payRequestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pay-request-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pay-request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNoLabel" for="pay-request-accountNo">
                  <Translate contentKey="myTollApp.payRequest.accountNo">Account No</Translate>
                </Label>
                <AvField
                  id="pay-request-accountNo"
                  type="text"
                  name="accountNo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="pay-request-title">
                  <Translate contentKey="myTollApp.payRequest.title">Title</Translate>
                </Label>
                <AvField
                  id="pay-request-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobileNumberLabel" for="pay-request-mobileNumber">
                  <Translate contentKey="myTollApp.payRequest.mobileNumber">Mobile Number</Translate>
                </Label>
                <AvField
                  id="pay-request-mobileNumber"
                  type="text"
                  name="mobileNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="sendSmsLabel">
                  <AvInput id="pay-request-sendSms" type="checkbox" className="form-check-input" name="sendSms" />
                  <Translate contentKey="myTollApp.payRequest.sendSms">Send Sms</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="pay-request-amount">
                  <Translate contentKey="myTollApp.payRequest.amount">Amount</Translate>
                </Label>
                <AvField
                  id="pay-request-amount"
                  type="text"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="callBackServiceLabel" for="pay-request-callBackService">
                  <Translate contentKey="myTollApp.payRequest.callBackService">Call Back Service</Translate>
                </Label>
                <AvField
                  id="pay-request-callBackService"
                  type="text"
                  name="callBackService"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="pay-request-bills">
                  <Translate contentKey="myTollApp.payRequest.bills">Bills</Translate>
                </Label>
                <AvInput
                  id="pay-request-bills"
                  type="select"
                  multiple
                  className="form-control"
                  name="bills"
                  value={payRequestEntity.bills && payRequestEntity.bills.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {bills
                    ? bills.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pay-request" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bills: storeState.bill.entities,
  payRequestEntity: storeState.payRequest.entity,
  loading: storeState.payRequest.loading,
  updating: storeState.payRequest.updating,
  updateSuccess: storeState.payRequest.updateSuccess,
});

const mapDispatchToProps = {
  getBills,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayRequestUpdate);
