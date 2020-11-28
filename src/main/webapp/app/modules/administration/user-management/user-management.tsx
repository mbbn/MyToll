import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps } from 'react-router-dom';
import { Translate, getSortState } from 'react-jhipster';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  Button,
  Badge,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { translate } from 'react-jhipster';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getUsers, updateUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import {dateToJalaliStrWithFormat} from "app/component/datePicker";
import {green, red, blueGrey} from '@material-ui/core/colors';

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

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const UserManagement = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  useEffect(() => {
    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
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

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated,
    });

  const { users, account, match, totalItems } = props;
  const classes = useStyles();
  return (
    <Paper elevation={2}>
      <h2 id="user-management-page-heading">
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <Link href={`${match.url}/new`} className={'btn btn-primary float-right jh-create-entity'}>
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
        </Link>
      </h2>
      <TableContainer>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sort('id')}>
                <TableSortLabel active={pagination.sort === 'id'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="global.field.id">ID</Translate>
                  {pagination.sort === 'id' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('login')}>
                <TableSortLabel active={pagination.sort === 'login'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.login">Login</Translate>
                  {pagination.sort === 'login' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('email')}>
                <TableSortLabel active={pagination.sort === 'email'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.email">Email</Translate>
                  {pagination.sort === 'email' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('profiles')}>
                <TableSortLabel active={pagination.sort === 'profile'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  {pagination.sort === 'profiles' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell/>
              <TableCell onClick={() => sort('createdDate')}>
                <TableSortLabel active={pagination.sort === 'createDate'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                  {pagination.sort === 'createdDate' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('lastModifiedBy')}>
                <TableSortLabel active={pagination.sort === 'lastModifiedBy'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                  {pagination.sort === 'lastModifiedBy' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => sort('lastModifiedDate')}>
                <TableSortLabel active={pagination.sort === 'lastModifiedDate'} direction={pagination.order === 'asc' ? 'asc':'desc'}>
                  <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                  {pagination.sort === 'lastModifiedDate' ? (
                    <span className={classes.visuallyHidden}>
                    {pagination.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={'user_'+i}>
                <TableCell>
                  <Link href={`${match.url}/${user.login}`}>{user.id}</Link>
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.authorities
                    ? user.authorities.map((authority, j) => (
                      <div key={`user-auth-${i}-${j}`}>
                        <Badge>{authority}</Badge>
                      </div>
                    ))
                    : null}
                </TableCell>
                <TableCell>
                  {user.activated ? (
                    <Button color={"primary"} style={{color: green["500"]}} onClick={toggleActive(user)}>
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                    </Button>
                  ) : (
                    <Button color={"primary"} style={{color: red["500"]}} onClick={toggleActive(user)}>
                      <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {user.createdDate ? dateToJalaliStrWithFormat(user.createdDate, APP_DATE_FORMAT) : null}
                </TableCell>
                <TableCell>{user.lastModifiedBy}</TableCell>
                <TableCell>
                  {user.lastModifiedDate ? dateToJalaliStrWithFormat(user.lastModifiedDate, APP_DATE_FORMAT) : null}
                </TableCell>
                <TableCell>
                  <Button href={`${match.url}/${user.login}`} size={"small"} style={{color: blueGrey["500"]}} startIcon={<FontAwesomeIcon icon="eye" />}>
                    <Translate contentKey="entity.action.view">View</Translate>
                  </Button>
                  <Button href={`${match.url}/${user.login}/edit`} size={"small"} style={{color: green["500"]}} startIcon={<FontAwesomeIcon icon="pencil-alt" />}>
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </Button>
                  <Button href={`${match.url}/${user.login}/delete`} size={"small"} style={{color: red["500"]}} startIcon={<FontAwesomeIcon icon="trash" />}>
                    <Translate contentKey="entity.action.delete">Delete</Translate>
                  </Button>
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
    </Paper>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
