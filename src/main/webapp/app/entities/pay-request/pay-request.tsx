import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Translate, translate, getSortState} from 'react-jhipster';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Link,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pay-request.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import {
  dateStrToJalali,
  dateStrToJalaliWithFormat,
  JALALI_DATE_TIME_FORMAT
} from "app/component/datePicker";
import {convertBooleanToYesNo} from "app/shared/util/persian-utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export interface IPayRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PayRequest = (props: IPayRequestProps) => {
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

  const { payRequestList, match, loading, totalItems } = props;
  /* eslint-disable no-console */
  console.log(loading, totalItems);
  const classes = useStyles();
  return (
    <Paper elevation={2}>
      <h2 id="pay-request-heading">
        <Translate contentKey="myTollApp.payRequest.home.title">Pay Requests</Translate>
      </h2>
      {payRequestList && payRequestList.length > 0 ? (<TableContainer>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sort('id')}>
                <TableSortLabel active={paginationState.sort === 'id'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="global.field.id">ID</Translate>
                  {paginationState.sort === 'id' ? (
                    <span className={classes.visuallyHidden}>
                    {paginationState.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('requestTime')}>
                <TableSortLabel active={paginationState.sort === 'requestTime'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.requestTime">Request Time</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('customer')}>
                <TableSortLabel active={paginationState.sort === 'customer'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.customer">Customer</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('title')}>
                <TableSortLabel active={paginationState.sort === 'title'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.title">Title</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('amount')}>
                <TableSortLabel active={paginationState.sort === 'amount'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.amount">Amount</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('expirationDate')}>
                <TableSortLabel active={paginationState.sort === 'expirationDate'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.expirationDate">Expiration Date</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('paid')}>
                <TableSortLabel active={paginationState.sort === 'paid'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.paid">Paid</Translate>
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('paymentDate')}>
                <TableSortLabel active={paginationState.sort === 'paymentDate'} direction={paginationState.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="myTollApp.payRequest.paymentDate">Payment Date</Translate>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payRequestList.map((payRequest, i)=>(<TableRow key={'payRequest_'+i}>
              <TableCell>
                <Link href={`${match.url}/${payRequest.id}`}>{payRequest.id}</Link>
              </TableCell>
              <TableCell>
                {payRequest.requestTime ? dateStrToJalaliWithFormat(payRequest.requestTime, JALALI_DATE_TIME_FORMAT) : null}
              </TableCell>
              <TableCell>
                {payRequest.customer ?  payRequest.customer.mobile: null}
              </TableCell>
              <TableCell>
                {payRequest.title}
              </TableCell>
              <TableCell>
                {payRequest.amount}
              </TableCell>
              <TableCell>
                {payRequest.expirationDate ? dateStrToJalali(payRequest.expirationDate) : null}
              </TableCell>
              <TableCell>
                {convertBooleanToYesNo(payRequest.paid)}
              </TableCell>
              <TableCell>
                {payRequest.paymentDate ? dateStrToJalali(payRequest.paymentDate) : null}
              </TableCell>
            </TableRow>))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination rowsPerPageOptions={[5, 10, 20, 50]} variant={"footer"}
                               labelDisplayedRows={paginationInfo => translate('global.item-count', {
                                 'first': 0,
                                 'second': 1,
                                 'total': props.totalItems
                               })}
                               labelRowsPerPage={translate('global.rows-per-page')} count={totalItems}
                               rowsPerPage={paginationState.itemsPerPage}
                               page={paginationState.activePage} onChangePage={(event, page) => handlePagination(page)}
                               onChangeRowsPerPage={event => {
                                 setPaginationState({
                                   ...paginationState,
                                   itemsPerPage: Number(event.target.value)
                                 });
                               }}/>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>):(
        !loading &&
        <Alert color={"warning"} elevation={2} square={true}>
            <Translate contentKey="myTollApp.payRequest.home.notFound">No Pay Requests found</Translate>
        </Alert>
      )}
    </Paper>
  );
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
  payRequestList: payRequest.entities,
  loading: payRequest.loading,
  totalItems: payRequest.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayRequest);
