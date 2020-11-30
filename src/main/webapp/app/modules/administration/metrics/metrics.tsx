import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Paper, Button, Grid} from '@material-ui/core';
import {
  CacheMetrics,
  DatasourceMetrics,
  GarbageCollectorMetrics,
  HttpRequestMetrics,
  JvmMemory,
  JvmThreads,
  EndpointsRequestsMetrics,
  SystemMetrics,
  Translate,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TIMESTAMP_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT, APP_WHOLE_NUMBER_FORMAT } from 'app/config/constants';
import { systemMetrics, systemThreadDump } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IMetricsPageProps extends StateProps, DispatchProps {}

export const MetricsPage = (props: IMetricsPageProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.systemMetrics();
    props.systemThreadDump();
  }, []);

  const getMetrics = () => {
    if (!props.isFetching) {
      props.systemMetrics();
      props.systemThreadDump();
    }
  };

  const { metrics, threadDump, isFetching } = props;

  return (
    <Paper dir={'ltr'} elevation={2}>
      <h2 id="metrics-page-heading">Application Metrics</h2>
      <p>
        <Button onClick={getMetrics} color={isFetching ? 'secondary' : 'primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>
      <hr />
      <Grid container>
        <h3>JVM Metrics</h3>
        <Grid container justify={"center"} spacing={2}>
          <Grid item md={4}>
            {metrics && metrics.jvm ? <JvmMemory jvmMetrics={metrics.jvm} wholeNumberFormat={'0'} /> : null}
          </Grid>
          <Grid item md={4}>
            {threadDump ? <JvmThreads jvmThreads={threadDump} wholeNumberFormat={'0'} /> : null}
          </Grid>
          <Grid item md={4}>
            {metrics && metrics.processMetrics ? <SystemMetrics systemMetrics={metrics.processMetrics} wholeNumberFormat={'0'} timestampFormat={APP_TIMESTAMP_FORMAT} />: null}
          </Grid>
          <Grid item md={4}>
            {/* {metrics && metrics.garbageCollector ?
        <GarbageCollectorMetrics garbageCollectorMetrics={metrics.garbageCollector} wholeNumberFormat={'0'}/> : null}*/}
          </Grid>
          <Grid item md={4}>
            {metrics && metrics['http.server.requests'] ?
              <HttpRequestMetrics requestMetrics={metrics['http.server.requests']} twoDigitAfterPointFormat={'0'}
                                  wholeNumberFormat={'0'}/> : null}
          </Grid>
          <Grid item md={4}>
            {metrics && metrics.services ?
              <EndpointsRequestsMetrics endpointsRequestsMetrics={metrics.services} wholeNumberFormat={'0'}/> : null}
          </Grid>
          <Grid item md={12}>
            {metrics.cache ? <CacheMetrics cacheMetrics={metrics.cache} twoDigitAfterPointFormat={'0'}/> : null}
          </Grid>
          <Grid item md={12}>
            {metrics.databases && JSON.stringify(metrics.databases) !== '{}' ?
              <DatasourceMetrics datasourceMetrics={metrics.databases} twoDigitAfterPointFormat={'0'}/> : null}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  metrics: storeState.administration.metrics,
  isFetching: storeState.administration.loading,
  threadDump: storeState.administration.threadDump,
});

const mapDispatchToProps = { systemMetrics, systemThreadDump };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MetricsPage);
