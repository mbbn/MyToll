import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BillDetail = (props: IBillDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { billEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.bill.detail.title">Bill</Translate> [<b>{billEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="category">
              <Translate contentKey="myTollApp.bill.category">Category</Translate>
            </span>
          </dt>
          <dd>{billEntity.category}</dd>
          <dt>
            <span id="plate">
              <Translate contentKey="myTollApp.bill.plate">Plate</Translate>
            </span>
          </dt>
          <dd>{billEntity.plate}</dd>
          <dt>
            <span id="billType">
              <Translate contentKey="myTollApp.bill.billType">Bill Type</Translate>
            </span>
          </dt>
          <dd>{billEntity.billType}</dd>
          <dt>
            <span id="billTypeTitle">
              <Translate contentKey="myTollApp.bill.billTypeTitle">Bill Type Title</Translate>
            </span>
          </dt>
          <dd>{billEntity.billTypeTitle}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="myTollApp.bill.street">Street</Translate>
            </span>
          </dt>
          <dd>{billEntity.street}</dd>
          <dt>
            <span id="fromDate">
              <Translate contentKey="myTollApp.bill.fromDate">From Date</Translate>
            </span>
          </dt>
          <dd>{billEntity.fromDate ? <TextFormat value={billEntity.fromDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="toDate">
              <Translate contentKey="myTollApp.bill.toDate">To Date</Translate>
            </span>
          </dt>
          <dd>{billEntity.toDate ? <TextFormat value={billEntity.toDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="billId">
              <Translate contentKey="myTollApp.bill.billId">Bill Id</Translate>
            </span>
          </dt>
          <dd>{billEntity.billId}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="myTollApp.bill.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{billEntity.amount}</dd>
          <dt>
            <span id="externalNumber">
              <Translate contentKey="myTollApp.bill.externalNumber">External Number</Translate>
            </span>
          </dt>
          <dd>{billEntity.externalNumber}</dd>
          <dt>
            <span id="billDate">
              <Translate contentKey="myTollApp.bill.billDate">Bill Date</Translate>
            </span>
          </dt>
          <dd>{billEntity.billDate ? <TextFormat value={billEntity.billDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/bill" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bill/${billEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bill }: IRootState) => ({
  billEntity: bill.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BillDetail);
