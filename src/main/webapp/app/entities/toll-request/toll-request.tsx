import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './toll-request.reducer';
import { ITollRequest } from 'app/shared/model/toll-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITollRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TollRequest = (props: ITollRequestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tollRequestList, match, loading } = props;
  return (
    <div>
      <h2 id="toll-request-heading">
        <Translate contentKey="myTollApp.tollRequest.home.title">Toll Requests</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myTollApp.tollRequest.home.createLabel">Create new Toll Request</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tollRequestList && tollRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.tollRequest.plate">Plate</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.tollRequest.mobile">Mobile</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.tollRequest.fromDate">From Date</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.tollRequest.toDate">To Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tollRequestList.map((tollRequest, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tollRequest.id}`} color="link" size="sm">
                      {tollRequest.id}
                    </Button>
                  </td>
                  <td>{tollRequest.plate}</td>
                  <td>{tollRequest.mobile}</td>
                  <td>
                    {tollRequest.fromDate ? <TextFormat type="date" value={tollRequest.fromDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {tollRequest.toDate ? <TextFormat type="date" value={tollRequest.toDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tollRequest.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tollRequest.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tollRequest.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myTollApp.tollRequest.home.notFound">No Toll Requests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tollRequest }: IRootState) => ({
  tollRequestList: tollRequest.entities,
  loading: tollRequest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TollRequest);
