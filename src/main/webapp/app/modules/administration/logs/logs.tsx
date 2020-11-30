import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {translate, Translate} from 'react-jhipster';
import {Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

import { getLoggers, changeLogLevel } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';
import TextField from "app/component/textField";

export interface ILogsPageProps extends StateProps, DispatchProps {}

export const LogsPage = (props: ILogsPageProps) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    props.getLoggers();
  }, []);

  const getLogs = () => {
    if (!props.isFetching) {
      props.getLoggers();
    }
  };

  const changeLevel = (loggerName, level) => () => props.changeLogLevel(loggerName, level);

  const changeFilter = evt => setFilter(evt.target.value);

  const getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light');

  const filterFn = l => l.name.toUpperCase().includes(filter.toUpperCase());

  const { logs, isFetching } = props;
  const loggers = logs ? Object.entries(logs.loggers).map(e => ({ name: e[0], level: e[1].effectiveLevel })) : [];

  return (
    <Paper elevation={2}>
      <h2 id="logs-page-heading">
        <Translate contentKey="logs.title">Logs</Translate>
      </h2>
      <p>
        <Translate contentKey="logs.nbloggers" interpolate={{ total: loggers.length }}>
          There are {loggers.length.toString()} loggers.
        </Translate>
      </p>

      <TextField name={''} label={translate('logs.filter')} value={filter} onChange={changeFilter} className="form-control" disabled={isFetching}/>
      <TableContainer>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>
              <span>
                <Translate contentKey="logs.table.name">Name</Translate>
              </span>
            </TableCell>
            <TableCell>
              <span>
                <Translate contentKey="logs.table.level">Level</Translate>
              </span>
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {loggers.filter(filterFn).map((logger, i) => (
            <TableRow key={`log-row-${i}`}>
              <TableCell>
                <small>{logger.name}</small>
              </TableCell>
              <TableCell>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'TRACE')}
                  className={getClassName(logger.level, 'TRACE', 'primary')}
                >
                  TRACE
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'DEBUG')}
                  className={getClassName(logger.level, 'DEBUG', 'success')}
                >
                  DEBUG
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'INFO')}
                  className={getClassName(logger.level, 'INFO', 'info')}
                >
                  INFO
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'WARN')}
                  className={getClassName(logger.level, 'WARN', 'warning')}
                >
                  WARN
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'ERROR')}
                  className={getClassName(logger.level, 'ERROR', 'danger')}
                >
                  ERROR
                </button>
                <button
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'OFF')}
                  className={getClassName(logger.level, 'OFF', 'secondary')}
                >
                  OFF
                </button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = ({ administration }: IRootState) => ({
  logs: administration.logs,
  isFetching: administration.loading,
});

const mapDispatchToProps = { getLoggers, changeLogLevel };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogsPage);
