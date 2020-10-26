import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './base-info.reducer';
import { IBaseInfo } from 'app/shared/model/base-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBaseInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BaseInfoDetail = (props: IBaseInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { baseInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myTollApp.baseInfo.detail.title">BaseInfo</Translate> [<b>{baseInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="myTollApp.baseInfo.title">Title</Translate>
            </span>
          </dt>
          <dd>{baseInfoEntity.title}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="myTollApp.baseInfo.code">Code</Translate>
            </span>
          </dt>
          <dd>{baseInfoEntity.code}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="myTollApp.baseInfo.category">Category</Translate>
            </span>
          </dt>
          <dd>{baseInfoEntity.category}</dd>
          <dt>
            <span id="creationTime">
              <Translate contentKey="myTollApp.baseInfo.creationTime">Creation Time</Translate>
            </span>
          </dt>
          <dd>
            {baseInfoEntity.creationTime ? <TextFormat value={baseInfoEntity.creationTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="creationBy">
              <Translate contentKey="myTollApp.baseInfo.creationBy">Creation By</Translate>
            </span>
          </dt>
          <dd>{baseInfoEntity.creationBy}</dd>
          <dt>
            <span id="lastUpdateTime">
              <Translate contentKey="myTollApp.baseInfo.lastUpdateTime">Last Update Time</Translate>
            </span>
          </dt>
          <dd>
            {baseInfoEntity.lastUpdateTime ? (
              <TextFormat value={baseInfoEntity.lastUpdateTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastUpdatedBy">
              <Translate contentKey="myTollApp.baseInfo.lastUpdatedBy">Last Updated By</Translate>
            </span>
          </dt>
          <dd>{baseInfoEntity.lastUpdatedBy}</dd>
          <dt>
            <Translate contentKey="myTollApp.baseInfo.group">Group</Translate>
          </dt>
          <dd>{baseInfoEntity.group ? baseInfoEntity.group.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/base-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/base-info/${baseInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ baseInfo }: IRootState) => ({
  baseInfoEntity: baseInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoDetail);
