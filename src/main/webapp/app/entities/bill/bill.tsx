import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBillProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bill = (props: IBillProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { billList, match, loading } = props;
  return (
    <div>
      <h2 id="bill-heading">
        <Translate contentKey="myTollApp.bill.home.title">Bills</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myTollApp.bill.home.createLabel">Create new Bill</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {billList && billList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.plate">Plate</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.billType">Bill Type</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.billTypeTitle">Bill Type Title</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.fromDate">From Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.toDate">To Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.billId">Bill Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.amount">Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.externalNumber">External Number</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.billDate">Bill Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.billStatus">Bill Status</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.cpayTaxId">Cpay Tax Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.sepandarShare">Sepandar Share</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.bill.issuerShare">Issuer Share</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {billList.map((bill, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bill.id}`} color="link" size="sm">
                      {bill.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`myTollApp.TaxCategory.${bill.category}`} />
                  </td>
                  <td>{bill.plate}</td>
                  <td>{bill.billType}</td>
                  <td>{bill.billTypeTitle}</td>
                  <td>{bill.street}</td>
                  <td>{bill.fromDate ? <TextFormat type="date" value={bill.fromDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{bill.toDate ? <TextFormat type="date" value={bill.toDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{bill.billId}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.externalNumber}</td>
                  <td>{bill.billDate ? <TextFormat type="date" value={bill.billDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`myTollApp.BillStatus.${bill.billStatus}`} />
                  </td>
                  <td>{bill.cpayTaxId}</td>
                  <td>{bill.sepandarShare}</td>
                  <td>{bill.issuerShare}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bill.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bill.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bill.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myTollApp.bill.home.notFound">No Bills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bill }: IRootState) => ({
  billList: bill.entities,
  loading: bill.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
