import React, { useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Grid, Paper, Divider, Button} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import TextField from "app/component/textField";

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (values) => {
    const account = {
      ...props.account,
      ...values,
    };

    props.saveAccountSettings(account);
  };

  const SettingsSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, translate('settings.messages.validate.firstname.minlength'))
      .max(50, translate('settings.messages.validate.firstname.maxlength'))
      .required(translate('settings.messages.validate.firstname.required')),
    lastName: Yup.string()
      .min(1, translate('settings.messages.validate.lastname.minlength'))
      .max(50, translate('settings.messages.validate.lastname.maxlength'))
      .required(translate('settings.messages.validate.lastname.required')),
    email: Yup.string()
      .min(5, translate('global.messages.validate.email.minlength'))
      .max(254,translate('global.messages.validate.email.maxlength'))
      .required(translate('global.messages.validate.email.required'))
  });

  return (
    <Grid container justify={"center"}>
      <Grid item md={4}>
        <Formik initialValues={props.account} validationSchema={SettingsSchema}
                onSubmit={values => handleValidSubmit(values)}>{({handleSubmit, errors, values, handleChange, handleBlur}) => (
          <form onSubmit={handleSubmit}>
            <Paper elevation={2} square={true}>
              <h2 id="settings-title">
                <Translate contentKey="settings.title" interpolate={{username: props.account.login}}>
                  User settings for {props.account.login}
                </Translate>
              </h2>
              <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12}>
                  <TextField id={'firstName'} name={'firstName'} onBlur={handleBlur} maxLength={50} required
                             autoComplete={'off'}
                             error={errors['firstName'] !== undefined} helperText={errors['firstName']}
                             value={values['firstName']}
                             label={translate('settings.form.firstname')} onChange={handleChange}
                             placeholder={translate('settings.form.firstname.placeholder')}/>
                  <TextField id={'lastName'} name={'lastName'} onBlur={handleBlur} maxLength={50} required
                             autoComplete={'off'}
                             error={errors['lastName'] !== undefined} helperText={errors['lastName']}
                             value={values['lastName']}
                             label={translate('settings.form.lastname')} onChange={handleChange}
                             placeholder={translate('settings.form.lastname.placeholder')}/>
                  <TextField id={'email'} name={'email'} onBlur={handleBlur} required autoComplete={'off'} type={'email'}
                             error={errors['email'] !== undefined} helperText={errors['email']} value={values['email']}
                             label={translate('global.form.email.label')} onChange={handleChange}
                             placeholder={translate('global.form.email.placeholder')}/>
                </Grid>
                <Divider variant={"fullWidth"} component={'div'}/>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                  <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true}
                          style={{minHeight: 50, fontSize: 20}} startIcon={<FontAwesomeIcon icon="save" />}>
                    {translate('settings.form.button')}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}</Formik>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
