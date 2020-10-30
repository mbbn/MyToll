import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plate.reducer';
import { IPlate } from 'app/shared/model/plate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlateDetail = (props: IPlateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { plateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.plate.detail.title">Plate</Translate> [<b>{plateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="plain">
              <Translate contentKey="myTollApp.plate.plain">Plain</Translate>
            </span>
          </dt>
          <dd>{plateEntity.plain}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="myTollApp.plate.code">Code</Translate>
            </span>
          </dt>
          <dd>{plateEntity.code}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="myTollApp.plate.type">Type</Translate>
            </span>
          </dt>
          <dd>{plateEntity.type}</dd>
          <dt>
            <span id="creationTime">
              <Translate contentKey="myTollApp.plate.creationTime">Creation Time</Translate>
            </span>
          </dt>
          <dd>{plateEntity.creationTime ? <TextFormat value={plateEntity.creationTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="creationBy">
              <Translate contentKey="myTollApp.plate.creationBy">Creation By</Translate>
            </span>
          </dt>
          <dd>{plateEntity.creationBy}</dd>
          <dt>
            <span id="lastUpdateTime">
              <Translate contentKey="myTollApp.plate.lastUpdateTime">Last Update Time</Translate>
            </span>
          </dt>
          <dd>
            {plateEntity.lastUpdateTime ? <TextFormat value={plateEntity.lastUpdateTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastUpdatedBy">
              <Translate contentKey="myTollApp.plate.lastUpdatedBy">Last Updated By</Translate>
            </span>
          </dt>
          <dd>{plateEntity.lastUpdatedBy}</dd>
          <dt>
            <Translate contentKey="myTollApp.plate.customer">Customer</Translate>
          </dt>
          <dd>{plateEntity.customer ? plateEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/plate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plate/${plateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plate }: IRootState) => ({
  plateEntity: plate.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateDetail);
