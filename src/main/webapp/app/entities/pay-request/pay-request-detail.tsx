import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pay-request.reducer';
import { IPayRequest } from 'app/shared/model/pay-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayRequestDetail = (props: IPayRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { payRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.payRequest.detail.title">PayRequest</Translate> [<b>{payRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="trackingId">
              <Translate contentKey="myTollApp.payRequest.trackingId">Tracking Id</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.trackingId}</dd>
          <dt>
            <span id="accountNo">
              <Translate contentKey="myTollApp.payRequest.accountNo">Account No</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.accountNo}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="myTollApp.payRequest.title">Title</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.title}</dd>
          <dt>
            <span id="sendSms">
              <Translate contentKey="myTollApp.payRequest.sendSms">Send Sms</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.sendSms ? 'true' : 'false'}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="myTollApp.payRequest.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.amount}</dd>
          <dt>
            <span id="callBackService">
              <Translate contentKey="myTollApp.payRequest.callBackService">Call Back Service</Translate>
            </span>
          </dt>
          <dd>{payRequestEntity.callBackService}</dd>
          <dt>
            <Translate contentKey="myTollApp.payRequest.customer">Customer</Translate>
          </dt>
          <dd>{payRequestEntity.customer ? payRequestEntity.customer.id : ''}</dd>
          <dt>
            <Translate contentKey="myTollApp.payRequest.bills">Bills</Translate>
          </dt>
          <dd>
            {payRequestEntity.bills
              ? payRequestEntity.bills.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {payRequestEntity.bills && i === payRequestEntity.bills.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/pay-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pay-request/${payRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
  payRequestEntity: payRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayRequestDetail);
