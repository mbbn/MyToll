import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plate-bill.reducer';
import { IPlateBill } from 'app/shared/model/plate-bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlateBillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlateBillDetail = (props: IPlateBillDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { plateBillEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.plateBill.detail.title">PlateBill</Translate> [<b>{plateBillEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="category">
              <Translate contentKey="myTollApp.plateBill.category">Category</Translate>
            </span>
          </dt>
          <dd>{plateBillEntity.category}</dd>
          <dt>
            <span id="creationTime">
              <Translate contentKey="myTollApp.plateBill.creationTime">Creation Time</Translate>
            </span>
          </dt>
          <dd>
            {plateBillEntity.creationTime ? <TextFormat value={plateBillEntity.creationTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="creationBy">
              <Translate contentKey="myTollApp.plateBill.creationBy">Creation By</Translate>
            </span>
          </dt>
          <dd>{plateBillEntity.creationBy}</dd>
          <dt>
            <span id="lastUpdateTime">
              <Translate contentKey="myTollApp.plateBill.lastUpdateTime">Last Update Time</Translate>
            </span>
          </dt>
          <dd>
            {plateBillEntity.lastUpdateTime ? (
              <TextFormat value={plateBillEntity.lastUpdateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdatedBy">
              <Translate contentKey="myTollApp.plateBill.lastUpdatedBy">Last Updated By</Translate>
            </span>
          </dt>
          <dd>{plateBillEntity.lastUpdatedBy}</dd>
          <dt>
            <Translate contentKey="myTollApp.plateBill.billType">Bill Type</Translate>
          </dt>
          <dd>{plateBillEntity.billTypeId ? plateBillEntity.billTypeId : ''}</dd>
          <dt>
            <Translate contentKey="myTollApp.plateBill.plate">Plate</Translate>
          </dt>
          <dd>{plateBillEntity.plateId ? plateBillEntity.plateId : ''}</dd>
        </dl>
        <Button tag={Link} to="/plate-bill" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plate-bill/${plateBillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plateBill }: IRootState) => ({
  plateBillEntity: plateBill.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateBillDetail);
