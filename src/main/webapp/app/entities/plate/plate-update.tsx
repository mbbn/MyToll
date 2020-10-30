import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './plate.reducer';
import { IPlate } from 'app/shared/model/plate.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlateUpdate = (props: IPlateUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plateEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plate');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.creationTime = convertDateTimeToServer(values.creationTime);
    values.lastUpdateTime = convertDateTimeToServer(values.lastUpdateTime);

    if (errors.length === 0) {
      const entity = {
        ...plateEntity,
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
          <h2 id="myTollApp.plate.home.createOrEditLabel">
            <Translate contentKey="myTollApp.plate.home.createOrEditLabel">Create or edit a Plate</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plateEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plate-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="plate-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="plainLabel" for="plate-plain">
                  <Translate contentKey="myTollApp.plate.plain">Plain</Translate>
                </Label>
                <AvField
                  id="plate-plain"
                  type="text"
                  name="plain"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 8, errorMessage: translate('entity.validation.minlength', { min: 8 }) },
                    maxLength: { value: 8, errorMessage: translate('entity.validation.maxlength', { max: 8 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="plate-code">
                  <Translate contentKey="myTollApp.plate.code">Code</Translate>
                </Label>
                <AvField
                  id="plate-code"
                  type="string"
                  className="form-control"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="plate-type">
                  <Translate contentKey="myTollApp.plate.type">Type</Translate>
                </Label>
                <AvInput
                  id="plate-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && plateEntity.type) || 'NORMAL'}
                >
                  <option value="NORMAL">{translate('myTollApp.PlateType.NORMAL')}</option>
                  <option value="FORMAL">{translate('myTollApp.PlateType.FORMAL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="creationTimeLabel" for="plate-creationTime">
                  <Translate contentKey="myTollApp.plate.creationTime">Creation Time</Translate>
                </Label>
                <AvInput
                  id="plate-creationTime"
                  type="datetime-local"
                  className="form-control"
                  name="creationTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateEntity.creationTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="creationByLabel" for="plate-creationBy">
                  <Translate contentKey="myTollApp.plate.creationBy">Creation By</Translate>
                </Label>
                <AvField
                  id="plate-creationBy"
                  type="text"
                  name="creationBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdateTimeLabel" for="plate-lastUpdateTime">
                  <Translate contentKey="myTollApp.plate.lastUpdateTime">Last Update Time</Translate>
                </Label>
                <AvInput
                  id="plate-lastUpdateTime"
                  type="datetime-local"
                  className="form-control"
                  name="lastUpdateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateEntity.lastUpdateTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdatedByLabel" for="plate-lastUpdatedBy">
                  <Translate contentKey="myTollApp.plate.lastUpdatedBy">Last Updated By</Translate>
                </Label>
                <AvField
                  id="plate-lastUpdatedBy"
                  type="text"
                  name="lastUpdatedBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="plate-customer">
                  <Translate contentKey="myTollApp.plate.customer">Customer</Translate>
                </Label>
                <AvInput id="plate-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/plate" replace color="info">
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
  customers: storeState.customer.entities,
  plateEntity: storeState.plate.entity,
  loading: storeState.plate.loading,
  updating: storeState.plate.updating,
  updateSuccess: storeState.plate.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateUpdate);
