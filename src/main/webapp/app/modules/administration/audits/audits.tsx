import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination} from '@material-ui/core';
import {translate, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TIMESTAMP_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

import { IRootState } from 'app/shared/reducers';
import { getAudits } from '../administration.reducer';
import Alert from "app/component/alert";
import DatePicker from "app/component/datePicker";

export interface IAuditsPageProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const previousMonth = (): string => {
  const now: Date = new Date();
  const fromDate =
    now.getMonth() === 0
      ? new Date(now.getFullYear() - 1, 11, now.getDate())
      : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return fromDate.toISOString().slice(0, 10);
};

const today = (): string => {
  // Today + 1 day - needed if the current day must be included
  const day: Date = new Date();
  day.setDate(day.getDate() + 1);
  const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  return toDate.toISOString().slice(0, 10);
};

export const AuditsPage = (props: IAuditsPageProps) => {
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [fromDate, setFromDate] = useState(previousMonth());
  const [toDate, setToDate] = useState(today());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getAllAudits();
  }, [fromDate, toDate, pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    transition();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  // const onChangeFromDate = evt => setFromDate(evt.target.value);
  const onChangeFromDate = (date) => setFromDate(date.locale('en-US').format('YYYY-MM-DD'));

  const onChangeToDate = (date) => setToDate(date.locale('en-US').format('YYYY-MM-DD'));

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const transition = () => {
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const getAllAudits = () => {
    props.getAudits(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`, fromDate, toDate);
  };

  const { audits, totalItems } = props;

  return (
    <Paper elevation={2}>
      <h2 id="audits-page-heading">Audits</h2>
      <DatePicker name="fromDate" id="fromDate" value={fromDate} label={translate('audits.filter.from')} onChange={date => onChangeFromDate(date)}/>
      <DatePicker name="toDate" id="toDate" value={toDate} label={translate('audits.filter.to')} onChange={date => onChangeToDate(date)}/>
      {audits && audits.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell onClick={sort('auditEventDate')}>
                <Translate contentKey="audits.table.header.date">Date</Translate>
                <FontAwesomeIcon icon="sort"/>
              </TableCell>
              <TableCell onClick={sort('principal')}>
                <Translate contentKey="audits.table.header.principal">User</Translate>
                <FontAwesomeIcon icon="sort"/>
              </TableCell>
              <TableCell onClick={sort('auditEventType')}>
                <Translate contentKey="audits.table.header.status">State</Translate>
                <FontAwesomeIcon icon="sort"/>
              </TableCell>
              <TableCell>
                <Translate contentKey="audits.table.header.data">Extra data</Translate>
              </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {audits.map((audit, i) => (
              <TableRow key={`audit-${i}`}>
                <TableCell>{<TextFormat value={audit.timestamp} type="date" format={APP_TIMESTAMP_FORMAT}/>}</TableCell>
                <TableCell>{audit.principal}</TableCell>
                <TableCell>{audit.type}</TableCell>
                <TableCell>
                  {audit.data ? audit.data.message : null}
                  {audit.data ? audit.data.remoteAddress : null}
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination rowsPerPageOptions={[5, 10, 20, 50]} variant={"footer"}
                                 labelDisplayedRows={paginationInfo => translate('global.item-count', {
                                   'first': paginationInfo.from,
                                   'second': paginationInfo.to,
                                   'total': paginationInfo.count
                                 })}
                                 labelRowsPerPage={translate('global.rows-per-page')} count={props.totalItems}
                                 rowsPerPage={pagination.itemsPerPage}
                                 page={pagination.activePage} onChangePage={(event, page) => handlePagination(page)}
                                 onChangeRowsPerPage={event => {
                                   setPagination({
                                     ...pagination,
                                     itemsPerPage: Number(event.target.value)
                                   });
                                 }}/>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
          <Alert color={"warning"}>
              <Translate contentKey="audits.notFound">No audit found</Translate>
          </Alert>
      )}
    </Paper>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  audits: storeState.administration.audits,
  totalItems: storeState.administration.totalItems,
});

const mapDispatchToProps = { getAudits };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuditsPage);
