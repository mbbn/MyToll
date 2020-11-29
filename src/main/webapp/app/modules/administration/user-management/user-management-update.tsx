import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps } from 'react-router-dom';
import {Paper, Grid, Switch, MenuItem, Divider, Button} from '@material-ui/core';
import { Translate, translate } from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Formik} from 'formik';
import * as Yup from 'yup';

import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import TextField from "app/component/textField";
import Select from "app/component/select";

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementUpdate = (props: IUserManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.login);
  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getUser(props.match.params.login);
    }
    props.getRoles();
    return () => {
      props.reset();
    };
  }, []);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const UserSchema = Yup.object().shape({
    login: Yup.string()
      .matches('^09[0-9]{9}',translate('register.messages.validate.login.pattern'))
      .min(11, translate('register.messages.validate.login.minlength'))
      .max(11, translate('register.messages.validate.login.maxlength'))
      .required(translate('register.messages.validate.login.required')),
    firstName: Yup.string()
      .max(50, translate('settings.messages.validate.firstname.maxlength')),
    lastName: Yup.string()
      .max(50, translate('settings.messages.validate.lastname.maxlength')),
    email: Yup.string()
      .email(translate('global.messages.validate.email.invalid'))
      .min(5, translate('global.messages.validate.email.minlength'))
      .max(254,translate('global.messages.validate.email.maxlength'))
      .required(translate('global.messages.validate.email.required'))
  });

  const saveUser = (values) => {
    if (isNew) {
      props.createUser(values);
    } else {
      props.updateUser(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const { user, loading, updating, roles } = props;
  if(!isNew && !user.id){
    return null;
  }

  return (
    <div>
      <Grid container justify={"center"}>
        <Grid item md={4}>
          <Formik initialValues={user} validationSchema={UserSchema} onSubmit={values => saveUser(values)}>{({handleSubmit, errors, values, handleChange, handleBlur}) => (
            <form onSubmit={handleSubmit}>
              <Paper elevation={2} square={true}>
                <h1>
                  <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a User</Translate>
                </h1>
                {loading ? (
                  <p>Loading...</p>
                ) : (<Grid container spacing={2} justify={"center"}>
                  <Grid item xs={12}>
                    {values['id'] ? (<TextField id={'id'} name={'id'} disabled value={user.id} label={translate('global.field.id')}/>) : null}
                    <TextField id={'login'} name={'login'} onBlur={handleBlur} maxLength={11} required
                               autoComplete={'off'} value={values['login']}
                               error={errors['login'] !== undefined} helperText={errors['login']}
                               label={translate('userManagement.login')} onChange={event => {
                      const reg = /^\d+$/;
                      if(!reg.test(event.target.value) && event.target.value.length > 0){
                        event.target.value = values['login'] ? values['login'] :'';
                      }
                      handleChange(event);
                    }} placeholder={'09123456789'}/>
                    <TextField id={'firstName'} name={'firstName'} onBlur={handleBlur} maxLength={50}
                               autoComplete={'off'} value={values['firstName']}
                               error={errors['firstName'] !== undefined} helperText={errors['firstName']}
                               label={translate('userManagement.firstName')} onChange={handleChange}/>
                    <TextField id={'lastName'} name={'lastName'} onBlur={handleBlur} maxLength={50}
                               autoComplete={'off'} value={values['lastName']}
                               error={errors['lastName'] !== undefined} helperText={errors['firstName']}
                               label={translate('userManagement.lastName')} onChange={handleChange}/>
                    <TextField id={'email'} name={'email'} onBlur={handleBlur} maxLength={50}
                               autoComplete={'off'} value={values['email']}
                               error={errors['email'] !== undefined} helperText={errors['email']}
                               label={translate('global.form.email.label')} onChange={handleChange}
                               placeholder={translate('global.form.email.placeholder')}/>
                    <>
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                      <Switch id={'activated'} name={'activated'} onBlur={handleBlur} checked={values['activated']}
                              size={"small"} onChange={handleChange} disabled={!user.id}/>
                    </>
                    <Select id={'authorities'} name={'authorities'} onBlur={handleBlur} value={values['authorities']}
                            error={errors['authorities'] !== undefined} helperText={errors['authorities']} multiple={true}
                            label={translate('userManagement.profiles')} onChange={handleChange}>
                      {roles.map(role => (
                          <MenuItem value={role} key={role}>{role}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Divider variant={"fullWidth"} component={'div'}/>
                  <Grid item xs={6}>
                    <Button href={'/admin/user-management'} color={"default"} variant={"contained"} fullWidth={true}
                            style={{minHeight: 50, fontSize: 20}} startIcon={<FontAwesomeIcon icon="arrow-left" />}>
                      {translate('entity.action.back')}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true}
                            style={{minHeight: 50, fontSize: 20}} startIcon={<FontAwesomeIcon icon="save" />}>
                      {translate('entity.action.save')}
                    </Button>
                  </Grid>
                </Grid>)}
              </Paper>
            </form>
          )}</Formik>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementUpdate);
