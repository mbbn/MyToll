import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './toll-request.reducer';
import { ITollRequest } from 'app/shared/model/toll-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITollRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TollRequestDetail = (props: ITollRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tollRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.tollRequest.detail.title">TollRequest</Translate> [<b>{tollRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="plate">
              <Translate contentKey="myTollApp.tollRequest.plate">Plate</Translate>
            </span>
          </dt>
          <dd>{tollRequestEntity.plate}</dd>
          <dt>
            <span id="mobile">
              <Translate contentKey="myTollApp.tollRequest.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{tollRequestEntity.mobile}</dd>
          <dt>
            <span id="fromDate">
              <Translate contentKey="myTollApp.tollRequest.fromDate">From Date</Translate>
            </span>
          </dt>
          <dd>
            {tollRequestEntity.fromDate ? (
              <TextFormat value={tollRequestEntity.fromDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="toDate">
              <Translate contentKey="myTollApp.tollRequest.toDate">To Date</Translate>
            </span>
          </dt>
          <dd>
            {tollRequestEntity.toDate ? <TextFormat value={tollRequestEntity.toDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/toll-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/toll-request/${tollRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tollRequest }: IRootState) => ({
  tollRequestEntity: tollRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TollRequestDetail);
