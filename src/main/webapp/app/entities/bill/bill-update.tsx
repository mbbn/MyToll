import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBaseInfo } from 'app/shared/model/base-info.model';
import { getEntities as getBaseInfos } from 'app/entities/base-info/base-info.reducer';
import { IPlate } from 'app/shared/model/plate.model';
import { getEntities as getPlates } from 'app/entities/plate/plate.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBillUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BillUpdate = (props: IBillUpdateProps) => {
  const [billTypeId, setBillTypeId] = useState('0');
  const [plateId, setPlateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { billEntity, baseInfos, plates, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bill');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBaseInfos();
    props.getPlates();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...billEntity,
        ...values,
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
          <h2 id="myTollApp.bill.home.createOrEditLabel">
            <Translate contentKey="myTollApp.bill.home.createOrEditLabel">Create or edit a Bill</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : billEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bill-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bill-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categoryLabel" for="bill-category">
                  <Translate contentKey="myTollApp.bill.category">Category</Translate>
                </Label>
                <AvInput
                  id="bill-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && billEntity.category) || 'SIDEPARK'}
                >
                  <option value="SIDEPARK">{translate('myTollApp.TaxCategory.SIDEPARK')}</option>
                  <option value="HIGHWAY">{translate('myTollApp.TaxCategory.HIGHWAY')}</option>
                  <option value="PARKING">{translate('myTollApp.TaxCategory.PARKING')}</option>
                  <option value="CITYTAX">{translate('myTollApp.TaxCategory.CITYTAX')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="billTypeLabel" for="bill-billType">
                  <Translate contentKey="myTollApp.bill.billType">Bill Type</Translate>
                </Label>
                <AvField
                  id="bill-billType"
                  type="text"
                  name="billType"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="billTypeTitleLabel" for="bill-billTypeTitle">
                  <Translate contentKey="myTollApp.bill.billTypeTitle">Bill Type Title</Translate>
                </Label>
                <AvField
                  id="bill-billTypeTitle"
                  type="text"
                  name="billTypeTitle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="bill-street">
                  <Translate contentKey="myTollApp.bill.street">Street</Translate>
                </Label>
                <AvField
                  id="bill-street"
                  type="text"
                  name="street"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fromDateLabel" for="bill-fromDate">
                  <Translate contentKey="myTollApp.bill.fromDate">From Date</Translate>
                </Label>
                <AvField
                  id="bill-fromDate"
                  type="date"
                  className="form-control"
                  name="fromDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="toDateLabel" for="bill-toDate">
                  <Translate contentKey="myTollApp.bill.toDate">To Date</Translate>
                </Label>
                <AvField
                  id="bill-toDate"
                  type="date"
                  className="form-control"
                  name="toDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="billIdLabel" for="bill-billId">
                  <Translate contentKey="myTollApp.bill.billId">Bill Id</Translate>
                </Label>
                <AvField
                  id="bill-billId"
                  type="text"
                  name="billId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="bill-amount">
                  <Translate contentKey="myTollApp.bill.amount">Amount</Translate>
                </Label>
                <AvField
                  id="bill-amount"
                  type="string"
                  className="form-control"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="externalNumberLabel" for="bill-externalNumber">
                  <Translate contentKey="myTollApp.bill.externalNumber">External Number</Translate>
                </Label>
                <AvField
                  id="bill-externalNumber"
                  type="text"
                  name="externalNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="billDateLabel" for="bill-billDate">
                  <Translate contentKey="myTollApp.bill.billDate">Bill Date</Translate>
                </Label>
                <AvField
                  id="bill-billDate"
                  type="date"
                  className="form-control"
                  name="billDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="bill-billType">
                  <Translate contentKey="myTollApp.bill.billType">Bill Type</Translate>
                </Label>
                <AvInput id="bill-billType" type="select" className="form-control" name="billTypeId">
                  <option value="" key="0" />
                  {baseInfos
                    ? baseInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bill-plate">
                  <Translate contentKey="myTollApp.bill.plate">Plate</Translate>
                </Label>
                <AvInput id="bill-plate" type="select" className="form-control" name="plateId">
                  <option value="" key="0" />
                  {plates
                    ? plates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bill" replace color="info">
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
  baseInfos: storeState.baseInfo.entities,
  plates: storeState.plate.entities,
  billEntity: storeState.bill.entity,
  loading: storeState.bill.loading,
  updating: storeState.bill.updating,
  updateSuccess: storeState.bill.updateSuccess,
});

const mapDispatchToProps = {
  getBaseInfos,
  getPlates,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BillUpdate);
