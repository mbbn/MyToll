import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="mobile">
              <Translate contentKey="myTollApp.customer.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{customerEntity.mobile}</dd>
          <dt>
            <span id="creationTime">
              <Translate contentKey="myTollApp.customer.creationTime">Creation Time</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.creationTime ? <TextFormat value={customerEntity.creationTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="creationBy">
              <Translate contentKey="myTollApp.customer.creationBy">Creation By</Translate>
            </span>
          </dt>
          <dd>{customerEntity.creationBy}</dd>
          <dt>
            <span id="lastUpdateTime">
              <Translate contentKey="myTollApp.customer.lastUpdateTime">Last Update Time</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.lastUpdateTime ? (
              <TextFormat value={customerEntity.lastUpdateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdatedBy">
              <Translate contentKey="myTollApp.customer.lastUpdatedBy">Last Updated By</Translate>
            </span>
          </dt>
          <dd>{customerEntity.lastUpdatedBy}</dd>
          <dt>
            <Translate contentKey="myTollApp.customer.bills">Bills</Translate>
          </dt>
          <dd>
            {customerEntity.bills
              ? customerEntity.bills.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {customerEntity.bills && i === customerEntity.bills.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
