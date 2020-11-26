import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, deleteUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IUserManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementDeleteDialog = (props: IUserManagementDeleteDialogProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/user-management');
  };

  const confirmDelete = event => {
    props.deleteUser(props.user.login);
    handleClose(event);
  };

  const { user } = props;

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{translate('entity.delete.title')}</DialogTitle>
      <DialogContent>{translate('userManagement.delete.question', {login: user.login})}</DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose} variant={"contained"} startIcon={<FontAwesomeIcon icon="ban" />}>
          {translate('entity.action.cancel')}
        </Button>
        <Button color="primary" onClick={confirmDelete} variant={"contained"} startIcon={<FontAwesomeIcon icon="trash" />}>
          {translate('entity.action.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
});

const mapDispatchToProps = { getUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
