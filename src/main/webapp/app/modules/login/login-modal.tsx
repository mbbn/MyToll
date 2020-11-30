import React from 'react';
import {Translate, translate} from 'react-jhipster';
import {Formik} from 'formik';
import {Paper, Grid, Divider, Link} from '@material-ui/core';
import {FormControlLabel, Checkbox, Button} from '@material-ui/core';
import TextField from "app/component/textField";
import Alert from "app/component/alert";

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

export const LoginModal = (props: ILoginModalProps) => {
  const {handleClose, loginError} = props;

  const isValid = (values: any) => {
    const errors = {};
    if (!values['username']) {
      errors['username'] = translate('login.messages.error.username');
    }
    if (!values['password']) {
      errors['password'] = translate('login.messages.error.password');
    }
    return errors;
  };

  const login = (values: any) => {
    const { handleLogin } = props;
    handleLogin(values['username'], values['password'], values['rememberMe']);
  };

  return (<Formik initialValues={{}} validate={values => isValid(values)} onSubmit={values => login(values)}>{({handleSubmit, errors, handleChange, handleBlur}) => (
    <form>
      <Grid container justify={"center"}>
        <Grid item xs={12} md={4}>
          <Paper square={true}>
            <h2>
              <Translate contentKey="login.title">Sign in</Translate>
            </h2>
            {loginError ? <Alert color="error">
              <Translate contentKey="login.messages.error.authentication">
                <strong>Failed to sign in!</strong> Please check your credentials and try again.
              </Translate>
            </Alert> : null}
            <TextField name={'username'} onBlur={handleBlur} required
                       placeholder={translate('global.form.username.placeholder')}
                       error={errors['username'] !== undefined} helperText={errors['username']}
                       label={translate('global.form.username.label')} onChange={event => {
              handleChange(event);
            }}/>
            <TextField name={'password'} type={'password'} onBlur={handleBlur} required
                       placeholder={translate('login.form.password.placeholder')}
                       error={errors['password'] !== undefined} helperText={errors['password']}
                       label={translate('login.form.password')} onChange={event => {handleChange(event);}}/>
            <FormControlLabel label={translate('login.form.rememberme')}
                              control={<Checkbox name={'rememberMe'} onChange={handleChange}/>}/>
            <Alert color={"warning"}>
              <Link href={"/account/reset/request"}>
                {translate('login.password.forgot')}
              </Link>
            </Alert>
            <Alert color={"warning"}>
              <span>
                <Translate contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
              </span>
              <Link href={"/account/register"}>
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
            <Divider style={{marginBottom: 5}}/>
            <Grid container justify={"flex-end"} spacing={1}>
              <Grid item>
                <Button color="default" variant={"contained"} onClick={() => handleClose()}>
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant={"contained"} onClick={()=>handleSubmit()}>
                  <Translate contentKey="login.form.button">Sign in</Translate>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  )}</Formik>);
};

export default LoginModal;
