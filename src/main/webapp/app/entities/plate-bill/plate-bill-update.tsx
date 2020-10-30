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
import { getEntity, updateEntity, createEntity, reset } from './plate-bill.reducer';
import { IPlateBill } from 'app/shared/model/plate-bill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlateBillUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlateBillUpdate = (props: IPlateBillUpdateProps) => {
  const [billTypeId, setBillTypeId] = useState('0');
  const [plateId, setPlateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plateBillEntity, baseInfos, plates, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plate-bill');
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
    values.creationTime = convertDateTimeToServer(values.creationTime);
    values.lastUpdateTime = convertDateTimeToServer(values.lastUpdateTime);

    if (errors.length === 0) {
      const entity = {
        ...plateBillEntity,
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
          <h2 id="myTollApp.plateBill.home.createOrEditLabel">
            <Translate contentKey="myTollApp.plateBill.home.createOrEditLabel">Create or edit a PlateBill</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plateBillEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plate-bill-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="plate-bill-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categoryLabel" for="plate-bill-category">
                  <Translate contentKey="myTollApp.plateBill.category">Category</Translate>
                </Label>
                <AvInput
                  id="plate-bill-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && plateBillEntity.category) || 'SIDEPARK'}
                >
                  <option value="SIDEPARK">{translate('myTollApp.BillCategory.SIDEPARK')}</option>
                  <option value="HIGHWAY">{translate('myTollApp.BillCategory.HIGHWAY')}</option>
                  <option value="PARKING">{translate('myTollApp.BillCategory.PARKING')}</option>
                  <option value="CITYTAX">{translate('myTollApp.BillCategory.CITYTAX')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="creationTimeLabel" for="plate-bill-creationTime">
                  <Translate contentKey="myTollApp.plateBill.creationTime">Creation Time</Translate>
                </Label>
                <AvInput
                  id="plate-bill-creationTime"
                  type="datetime-local"
                  className="form-control"
                  name="creationTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateBillEntity.creationTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="creationByLabel" for="plate-bill-creationBy">
                  <Translate contentKey="myTollApp.plateBill.creationBy">Creation By</Translate>
                </Label>
                <AvField
                  id="plate-bill-creationBy"
                  type="text"
                  name="creationBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdateTimeLabel" for="plate-bill-lastUpdateTime">
                  <Translate contentKey="myTollApp.plateBill.lastUpdateTime">Last Update Time</Translate>
                </Label>
                <AvInput
                  id="plate-bill-lastUpdateTime"
                  type="datetime-local"
                  className="form-control"
                  name="lastUpdateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateBillEntity.lastUpdateTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdatedByLabel" for="plate-bill-lastUpdatedBy">
                  <Translate contentKey="myTollApp.plateBill.lastUpdatedBy">Last Updated By</Translate>
                </Label>
                <AvField
                  id="plate-bill-lastUpdatedBy"
                  type="text"
                  name="lastUpdatedBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="plate-bill-billType">
                  <Translate contentKey="myTollApp.plateBill.billType">Bill Type</Translate>
                </Label>
                <AvInput id="plate-bill-billType" type="select" className="form-control" name="billType.id">
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
                <Label for="plate-bill-plate">
                  <Translate contentKey="myTollApp.plateBill.plate">Plate</Translate>
                </Label>
                <AvInput id="plate-bill-plate" type="select" className="form-control" name="plate.id">
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
              <Button tag={Link} id="cancel-save" to="/plate-bill" replace color="info">
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
  plateBillEntity: storeState.plateBill.entity,
  loading: storeState.plateBill.loading,
  updating: storeState.plateBill.updating,
  updateSuccess: storeState.plateBill.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlateBillUpdate);
