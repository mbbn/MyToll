import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pay-request.reducer';
import { IPayRequest } from 'app/shared/model/pay-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PayRequest = (props: IPayRequestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { payRequestList, match, loading } = props;
  return (
    <div>
      <h2 id="pay-request-heading">
        <Translate contentKey="myTollApp.payRequest.home.title">Pay Requests</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myTollApp.payRequest.home.createLabel">Create new Pay Request</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {payRequestList && payRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.requestTime">Request Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.trackingId">Tracking Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.shortId">Short Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.accountNo">Account No</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.expirationDate">Expiration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.sendSms">Send Sms</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.callBackService">Call Back Service</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.paid">Paid</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.paymentDate">Payment Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.bankTrackingId">Bank Tracking Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.paymentId">Payment Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.customer">Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.payRequest.bills">Bills</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payRequestList.map((payRequest, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payRequest.id}`} color="link" size="sm">
                      {payRequest.id}
                    </Button>
                  </td>
                  <td>
                    {payRequest.requestTime ? <TextFormat type="date" value={payRequest.requestTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{payRequest.trackingId}</td>
                  <td>{payRequest.shortId}</td>
                  <td>{payRequest.accountNo}</td>
                  <td>{payRequest.title}</td>
                  <td>
                    {payRequest.expirationDate ? (
                      <TextFormat type="date" value={payRequest.expirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{payRequest.sendSms ? 'true' : 'false'}</td>
                  <td>{payRequest.amount}</td>
                  <td>{payRequest.callBackService}</td>
                  <td>{payRequest.paid ? 'true' : 'false'}</td>
                  <td>
                    {payRequest.paymentDate ? <TextFormat type="date" value={payRequest.paymentDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{payRequest.bankTrackingId}</td>
                  <td>{payRequest.paymentId}</td>
                  <td>{payRequest.customer ? <Link to={`customer/${payRequest.customer.id}`}>{payRequest.customer.id}</Link> : ''}</td>
                  <td>
                    {payRequest.bills
                      ? payRequest.bills.map((val, j) => (
                          <span key={j}>
                            <Link to={`bill/${val.id}`}>{val.id}</Link>
                            {j === payRequest.bills.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payRequest.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payRequest.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payRequest.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myTollApp.payRequest.home.notFound">No Pay Requests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
  payRequestList: payRequest.entities,
  loading: payRequest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayRequest);
