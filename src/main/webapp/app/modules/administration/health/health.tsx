import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Paper, Button, Badge, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { systemHealth } from '../administration.reducer';
import HealthModal from './health-modal';

export interface IHealthPageProps extends StateProps, DispatchProps {}

export const HealthPage = (props: IHealthPageProps) => {
  const [healthObject, setHealthObject] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.systemHealth();
  }, []);

  const getSystemHealth = () => {
    if (!props.isFetching) {
      props.systemHealth();
    }
  };

  const getSystemHealthInfo = (name, healthObj) => () => {
    setShowModal(true);
    setHealthObject({ ...healthObj, name });
  };

  const handleClose = () => setShowModal(false);

  const renderModal = () => <HealthModal healthObject={healthObject} handleClose={handleClose} showModal={showModal} />;

  const { health, isFetching } = props;
  const data = (health || {}).components || {};

  return (
    <Paper elevation={2} dir={'ltr'}>
      <h2 id="health-page-heading">Health Checks</h2>
      <p>
        <Button onClick={getSystemHealth} color={isFetching ? 'secondary' : 'primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>
      <TableContainer dir={'ltr'}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((configPropKey, configPropIndex) => 'status' !== configPropKey ? <TableRow>
              <TableCell>{configPropKey}</TableCell>
              <TableCell>
                <Badge
                  color={data[configPropKey].status !== 'UP' ? 'error' : 'primary'}>{data[configPropKey].status}</Badge>
              </TableCell>
              <TableCell>
                {data[configPropKey].details ? (
                  <a onClick={getSystemHealthInfo(configPropKey, data[configPropKey])}>
                    <FontAwesomeIcon icon="eye"/>
                  </a>
                ) : null}
              </TableCell>
            </TableRow> : null)}
          </TableBody>
        </Table>
      </TableContainer>
      {renderModal()}
    </Paper>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  health: storeState.administration.health,
  isFetching: storeState.administration.loading,
});

const mapDispatchToProps = { systemHealth };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HealthPage);
