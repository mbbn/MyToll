import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Button, Col, Row, Table, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './base-info.reducer';
import { IBaseInfo } from 'app/shared/model/base-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IBaseInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BaseInfo = (props: IBaseInfoProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { baseInfoList, match, loading, totalItems } = props;
  return (
    <Card>
      <CardHeader>
        <h2 id="base-info-heading">
          <Translate contentKey="myTollApp.baseInfo.home.title">Base Infos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="myTollApp.baseInfo.home.createLabel">Create new Base Info</Translate>
          </Link>
        </h2>
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          {baseInfoList && baseInfoList.length > 0 ? (
            <Table responsive striped>
              <thead className="thead-dark">
              <tr>
                <th className="hand" onclick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onclick={sort('title')}>
                  <Translate contentKey="myTollApp.baseInfo.title">Title</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onclick={sort('code')}>
                  <Translate contentKey="myTollApp.baseInfo.code">Code</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onclick={sort('category')}>
                  <Translate contentKey="myTollApp.baseInfo.category">Category</Translate> <FontAwesomeIcon
                  icon="sort"/>
                </th>
                <th className="hand" onclick={sort('creationTime')}>
                  <Translate contentKey="myTollApp.baseInfo.creationTime">Creation Time</Translate> <FontAwesomeIcon
                  icon="sort"/>
                </th>
                <th className="hand" onclick={sort('creationBy')}>
                  <Translate contentKey="myTollApp.baseInfo.creationBy">Creation By</Translate> <FontAwesomeIcon
                  icon="sort"/>
                </th>
                <th className="hand" onclick={sort('lastUpdateTime')}>
                  <Translate contentKey="myTollApp.baseInfo.lastUpdateTime">Last Update Time</Translate>
                  <FontAwesomeIcon icon="sort"/>
                </th>
                <th className="hand" onclick={sort('lastUpdatedBy')}>
                  <Translate contentKey="myTollApp.baseInfo.lastUpdatedBy">Last Updated By</Translate> <FontAwesomeIcon
                  icon="sort"/>
                </th>
                <th>
                  <Translate contentKey="myTollApp.baseInfo.group">Group</Translate> <FontAwesomeIcon icon="sort"/>
                </th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {baseInfoList.map((baseInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${baseInfo.id}`} color="link" size="sm">
                      {baseInfo.id}
                    </Button>
                  </td>
                  <td>{baseInfo.title}</td>
                  <td>{baseInfo.code}</td>
                  <td>
                    <Translate contentKey={`myTollApp.BaseInfoCategory.${baseInfo.category}`}/>
                  </td>
                  <td>
                    {baseInfo.creationTime ?
                      <TextFormat type="date" value={baseInfo.creationTime} format={APP_DATE_FORMAT}/> : null}
                  </td>
                  <td>{baseInfo.creationBy}</td>
                  <td>
                    {baseInfo.lastUpdateTime ?
                      <TextFormat type="date" value={baseInfo.lastUpdateTime} format={APP_DATE_FORMAT}/> : null}
                  </td>
                  <td>{baseInfo.lastUpdatedBy}</td>
                  <td>{baseInfo.group ?
                    <Link to={`base-info/${baseInfo.group.id}`}>{baseInfo.group.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${baseInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${baseInfo.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt"/>{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${baseInfo.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash"/>{' '}
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
                <Translate contentKey="myTollApp.baseInfo.home.notFound">No Base Infos found</Translate>
              </div>
            )
          )}
        </div>
      </CardBody>
      <CardFooter>
        {props.totalItems ? (
          <div className={baseInfoList && baseInfoList.length > 0 ? '' : 'd-none'}>
            <Row className="justify-content-center">
              <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
            </Row>
            <Row className="justify-content-center">
              <JhiPagination
                activePage={paginationState.activePage}
                onSelect={handlePagination}
                maxButtons={5}
                itemsPerPage={paginationState.itemsPerPage}
                totalItems={props.totalItems}
              />
            </Row>
          </div>
        ) : (
          ''
        )}
      </CardFooter>

    </Card>
  );
};

const mapStateToProps = ({ baseInfo }: IRootState) => ({
  baseInfoList: baseInfo.entities,
  loading: baseInfo.loading,
  totalItems: baseInfo.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfo);
