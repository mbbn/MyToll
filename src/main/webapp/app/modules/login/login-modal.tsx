import React from 'react';
import { Translate, translate } from 'react-jhipster';
import {Formik} from 'formik';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {FormControlLabel, Checkbox, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import TextField from "app/component/textField";

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

  return (<>
    <Formik initialValues={{}} validate={values => isValid(values)} onSubmit={values => login(values)}>{({handleSubmit, errors, values, handleChange, handleBlur, setFieldValue}) => (
      <form>
        <Dialog id="login-page" open={props.showModal} maxWidth={"xs"} onClose={() => {handleClose()}}>
          <DialogTitle>
            <Translate contentKey="login.title">Sign in</Translate>
          </DialogTitle>
          <DialogContent>
            {loginError ? (
              <Alert color="error">
                <Translate contentKey="login.messages.error.authentication">
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Translate>
              </Alert>
            ) : null}
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
            {/* <Alert color="warning">
                <Link to="/account/reset/request">
                  <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
                </Link>
              </Alert>*/}
            {/* <Alert color="warning">
              <span>
                <Translate contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
              </span>{' '}
                <Link to="/account/register">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>*/}
          </DialogContent>
          <DialogActions>
            <Button color="default" variant={"contained"} onClick={() => handleClose()}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" variant={"contained"} onClick={()=>handleSubmit()}>
              <Translate contentKey="login.form.button">Sign in</Translate>
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    )}</Formik>
  </>);
};

export default LoginModal;
