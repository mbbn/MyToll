import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getBaseInfos } from 'app/entities/base-info/base-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './base-info.reducer';
import { IBaseInfo } from 'app/shared/model/base-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBaseInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BaseInfoUpdate = (props: IBaseInfoUpdateProps) => {
  const [groupId, setGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { baseInfoEntity, baseInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/base-info' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBaseInfos();
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
        ...baseInfoEntity,
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
          <h2 id="myTollApp.baseInfo.home.createOrEditLabel">
            <Translate contentKey="myTollApp.baseInfo.home.createOrEditLabel">Create or edit a BaseInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : baseInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="base-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="base-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="base-info-title">
                  <Translate contentKey="myTollApp.baseInfo.title">Title</Translate>
                </Label>
                <AvField
                  id="base-info-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="base-info-code">
                  <Translate contentKey="myTollApp.baseInfo.code">Code</Translate>
                </Label>
                <AvField
                  id="base-info-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="categoryLabel" for="base-info-category">
                  <Translate contentKey="myTollApp.baseInfo.category">Category</Translate>
                </Label>
                <AvInput
                  id="base-info-category"
                  type="select"
                  className="form-control"
                  name="category"
                  value={(!isNew && baseInfoEntity.category) || 'PLATE_MAP'}
                >
                  <option value="PLATE_MAP">{translate('myTollApp.BaseInfoCategory.PLATE_MAP')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="creationTimeLabel" for="base-info-creationTime">
                  <Translate contentKey="myTollApp.baseInfo.creationTime">Creation Time</Translate>
                </Label>
                <AvInput
                  id="base-info-creationTime"
                  type="datetime-local"
                  className="form-control"
                  name="creationTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.baseInfoEntity.creationTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="creationByLabel" for="base-info-creationBy">
                  <Translate contentKey="myTollApp.baseInfo.creationBy">Creation By</Translate>
                </Label>
                <AvField
                  id="base-info-creationBy"
                  type="text"
                  name="creationBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdateTimeLabel" for="base-info-lastUpdateTime">
                  <Translate contentKey="myTollApp.baseInfo.lastUpdateTime">Last Update Time</Translate>
                </Label>
                <AvInput
                  id="base-info-lastUpdateTime"
                  type="datetime-local"
                  className="form-control"
                  name="lastUpdateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.baseInfoEntity.lastUpdateTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastUpdatedByLabel" for="base-info-lastUpdatedBy">
                  <Translate contentKey="myTollApp.baseInfo.lastUpdatedBy">Last Updated By</Translate>
                </Label>
                <AvField
                  id="base-info-lastUpdatedBy"
                  type="text"
                  name="lastUpdatedBy"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="base-info-group">
                  <Translate contentKey="myTollApp.baseInfo.group">Group</Translate>
                </Label>
                <AvInput id="base-info-group" type="select" className="form-control" name="group.id">
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
              <Button tag={Link} id="cancel-save" to="/base-info" replace color="info">
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
  baseInfoEntity: storeState.baseInfo.entity,
  loading: storeState.baseInfo.loading,
  updating: storeState.baseInfo.updating,
  updateSuccess: storeState.baseInfo.updateSuccess,
});

const mapDispatchToProps = {
  getBaseInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoUpdate);
