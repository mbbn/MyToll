import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './toll-request.reducer';
import { ITollRequest } from 'app/shared/model/toll-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITollRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TollRequestUpdate = (props: ITollRequestUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tollRequestEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/toll-request');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...tollRequestEntity,
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
          <h2 id="myTollApp.tollRequest.home.createOrEditLabel">
            <Translate contentKey="myTollApp.tollRequest.home.createOrEditLabel">Create or edit a TollRequest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tollRequestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="toll-request-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="toll-request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="plateLabel" for="toll-request-plate">
                  <Translate contentKey="myTollApp.tollRequest.plate">Plate</Translate>
                </Label>
                <AvField
                  id="toll-request-plate"
                  type="string"
                  className="form-control"
                  name="plate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mobileLabel" for="toll-request-mobile">
                  <Translate contentKey="myTollApp.tollRequest.mobile">Mobile</Translate>
                </Label>
                <AvField
                  id="toll-request-mobile"
                  type="text"
                  name="mobile"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fromDateLabel" for="toll-request-fromDate">
                  <Translate contentKey="myTollApp.tollRequest.fromDate">From Date</Translate>
                </Label>
                <AvField
                  id="toll-request-fromDate"
                  type="date"
                  className="form-control"
                  name="fromDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="toDateLabel" for="toll-request-toDate">
                  <Translate contentKey="myTollApp.tollRequest.toDate">To Date</Translate>
                </Label>
                <AvField
                  id="toll-request-toDate"
                  type="date"
                  className="form-control"
                  name="toDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/toll-request" replace color="info">
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
  tollRequestEntity: storeState.tollRequest.entity,
  loading: storeState.tollRequest.loading,
  updating: storeState.tollRequest.updating,
  updateSuccess: storeState.tollRequest.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TollRequestUpdate);
