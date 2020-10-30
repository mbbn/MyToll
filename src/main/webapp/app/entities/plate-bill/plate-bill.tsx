import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './plate-bill.reducer';
import { IPlateBill } from 'app/shared/model/plate-bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlateBillProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PlateBill = (props: IPlateBillProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { plateBillList, match, loading } = props;
  return (
    <div>
      <h2 id="plate-bill-heading">
        <Translate contentKey="myTollApp.plateBill.home.title">Plate Bills</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myTollApp.plateBill.home.createLabel">Create new Plate Bill</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {plateBillList && plateBillList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.creationTime">Creation Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.creationBy">Creation By</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.lastUpdateTime">Last Update Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.lastUpdatedBy">Last Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.billType">Bill Type</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plateBill.plate">Plate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plateBillList.map((plateBill, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${plateBill.id}`} color="link" size="sm">
                      {plateBill.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`myTollApp.BillCategory.${plateBill.category}`} />
                  </td>
                  <td>
                    {plateBill.creationTime ? <TextFormat type="date" value={plateBill.creationTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{plateBill.creationBy}</td>
                  <td>
                    {plateBill.lastUpdateTime ? <TextFormat type="date" value={plateBill.lastUpdateTime} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{plateBill.lastUpdatedBy}</td>
                  <td>{plateBill.billType ? <Link to={`base-info/${plateBill.billType.id}`}>{plateBill.billType.id}</Link> : ''}</td>
                  <td>{plateBill.plate ? <Link to={`plate/${plateBill.plate.id}`}>{plateBill.plate.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${plateBill.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plateBill.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plateBill.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myTollApp.plateBill.home.notFound">No Plate Bills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ plateBill }: IRootState) => ({
  plateBillList: plateBill.entities,
  loading: plateBill.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateBill);
