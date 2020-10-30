import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './plate.reducer';
import { IPlate } from 'app/shared/model/plate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Plate = (props: IPlateProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { plateList, match, loading } = props;
  return (
    <div>
      <h2 id="plate-heading">
        <Translate contentKey="myTollApp.plate.home.title">Plates</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myTollApp.plate.home.createLabel">Create new Plate</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {plateList && plateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.plain">Plain</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.creationTime">Creation Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.creationBy">Creation By</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.lastUpdateTime">Last Update Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.lastUpdatedBy">Last Updated By</Translate>
                </th>
                <th>
                  <Translate contentKey="myTollApp.plate.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plateList.map((plate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${plate.id}`} color="link" size="sm">
                      {plate.id}
                    </Button>
                  </td>
                  <td>{plate.plain}</td>
                  <td>{plate.code}</td>
                  <td>
                    <Translate contentKey={`myTollApp.PlateType.${plate.type}`} />
                  </td>
                  <td>{plate.creationTime ? <TextFormat type="date" value={plate.creationTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{plate.creationBy}</td>
                  <td>{plate.lastUpdateTime ? <TextFormat type="date" value={plate.lastUpdateTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{plate.lastUpdatedBy}</td>
                  <td>{plate.customer ? <Link to={`customer/${plate.customer.id}`}>{plate.customer.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${plate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${plate.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myTollApp.plate.home.notFound">No Plates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ plate }: IRootState) => ({
  plateList: plate.entities,
  loading: plate.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Plate);
