import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Paper,Grid, Divider, Button } from '@material-ui/core';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import {dateToJalaliStrWithFormat, JALALI_DATE_TIME_FORMAT} from "app/component/datePicker";

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementDetail = (props: IUserManagementDetailProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const { user } = props;

  return (
      <Grid container justify={"center"}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2}>
              <h2>
                <Translate contentKey="userManagement.detail.title">User</Translate> [<b>{user.login}</b>]
              </h2>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.login">Login</Translate>
                </Grid>
                <Grid item xs={8}>
                  <span>{user.login}</span>&nbsp;
                  {user.activated ? (
                    <Button color="primary">
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                    </Button>
                  ) : (
                    <Button color="default">
                      <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.firstName">First Name</Translate>
                </Grid>
                <Grid item xs={8}>{user.firstName}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.lastName">Last Name</Translate>
                </Grid>
                <Grid item xs={8}>{user.lastName}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.email">Email</Translate>
                </Grid>
                <Grid item xs={8}>{user.email}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.createdBy">Created By</Translate>
                </Grid>
                <Grid item xs={8}>{user.createdBy}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                </Grid>
                <Grid item xs={8}>{user.createdDate ? dateToJalaliStrWithFormat(user.createdDate, JALALI_DATE_TIME_FORMAT) : null}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>{translate('userManagement.lastModifiedBy')}</Grid>
                <Grid item xs={8}>{user.lastModifiedBy}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                </Grid>
                <Grid item xs={8}>{user.lastModifiedDate ? dateToJalaliStrWithFormat(user.lastModifiedDate, JALALI_DATE_TIME_FORMAT) : null}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Translate contentKey="userManagement.profiles">Profiles</Translate>
                </Grid>
                <Grid item xs={8}>
                  <ul className="list-unstyled">
                    {user.authorities
                      ? user.authorities.map((authority, i) => (
                        <li key={`user-auth-${i}`}>
                          <Button color="default">{authority}</Button>
                        </li>
                      ))
                      : null}
                  </ul>
                </Grid>
              </Grid>
              <Button href={"/admin/user-management"} color={"default"} variant={"contained"} fullWidth={true}
                      style={{minHeight: 50, fontSize: 20}} startIcon={<FontAwesomeIcon icon="arrow-left"/>}>
                {translate('entity.action.back')}
              </Button>
            </Paper>
          </Grid>
      </Grid>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
});

const mapDispatchToProps = { getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDetail);
