import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Grid, Paper, Button} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import TextField from "app/component/textField";

export interface IRegisterProps extends StateProps, DispatchProps {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (values) => {
    props.handleRegister(values.username, values.email, values.firstPassword, props.currentLocale);
  };

  const updatePassword = event => setPassword(event.target.value);

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .matches('^09[0-9]{9}',translate('register.messages.validate.login.pattern'))
      .min(11, translate('register.messages.validate.login.minlength'))
      .max(11, translate('register.messages.validate.login.maxlength'))
      .required(translate('register.messages.validate.login.required')),
    email: Yup.string()
      .email(translate('global.messages.validate.email.invalid'))
      .min(5, translate('global.messages.validate.email.minlength'))
      .max(254,translate('global.messages.validate.email.maxlength'))
      .required(translate('global.messages.validate.email.required')),
    firstPassword: Yup.string()
      .min(4, translate('global.messages.validate.newpassword.minlength'))
      .max(50, translate('global.messages.validate.newpassword.maxlength'))
      .required(translate('global.messages.validate.newpassword.required')),
    secondPassword: Yup.mixed().test('match',translate('global.messages.error.dontmatch'), (secondPassword, src)=>{
      return secondPassword === src.parent.firstPassword;
    })
  });

  return (
    <div>
      <Grid container justify={"center"}>
        <Grid item md={4}>
          <Formik initialValues={{}} validationSchema={registerSchema}
                  onSubmit={values => handleValidSubmit(values)}>{({handleSubmit, errors, values, handleChange, handleBlur}) => (
            <form onSubmit={handleSubmit}>
              <Paper elevation={2} square={true}>
                <h1 id="register-title">
                  <Translate contentKey="register.title">Registration</Translate>
                </h1>
                <Grid container spacing={2} justify={"center"}>
                  <Grid item xs={12}>
                    <TextField id={'username'} name={'username'} onBlur={handleBlur} maxLength={11} required
                               autoComplete={'off'} value={values['username']}
                               error={errors['username'] !== undefined} helperText={errors['username']}
                               label={translate('global.form.username.label')} onChange={event => {
                      const reg = /^\d+$/;
                      if(!reg.test(event.target.value) && event.target.value.length > 0){
                        event.target.value = values['username'] ? values['username'] :'';
                      }
                      handleChange(event);
                    }} placeholder={'09123456789'}/>
                    <TextField id={'email'} name={'email'} onBlur={handleBlur}
                               autoComplete={'off'} value={values['email']}
                               error={errors['email'] !== undefined} helperText={errors['email']}
                               label={translate('global.form.email.label')} onChange={handleChange}
                               placeholder={translate('global.form.email.placeholder')}/>
                    <Grid container>
                      <Grid item xs={6}>
                        <TextField id={'firstPassword'} name={'firstPassword'} onBlur={handleBlur} maxLength={50}
                                   autoComplete={'off'} value={values['firstPassword']} type="password"
                                   error={errors['firstPassword'] !== undefined} helperText={errors['firstPassword']}
                                   label={translate('global.form.newpassword.label')} onChange={event => {updatePassword(event);handleChange(event);}}
                                   placeholder={translate('global.form.newpassword.placeholder')}/>
                      </Grid>
                      <Grid item xs={6}>
                        <PasswordStrengthBar password={password} />
                      </Grid>
                    </Grid>
                    <TextField id={'secondPassword'} name={'secondPassword'} onBlur={handleBlur} maxLength={50}
                               autoComplete={'off'} value={values['secondPassword']} type="password"
                               error={errors['secondPassword'] !== undefined} helperText={errors['secondPassword']}
                               label={translate('global.form.confirmpassword.label')} onChange={handleChange}
                               placeholder={translate('global.form.confirmpassword.placeholder')}/>
                  </Grid>
                  <Grid item xs={6}/>
                  <Grid item xs={6}>
                    <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true}
                            style={{minHeight: 50, fontSize: 20}} startIcon={<FontAwesomeIcon icon="save" />}>
                      {translate('register.form.button')}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          )}</Formik>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
