import React from 'react';
import { Translate, translate } from 'react-jhipster';
import {Formik} from 'formik';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {Grid, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import TextField from "app/component/textField";

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;
    return (<Formik initialValues={{}} onSubmit={values => {}}>
          <Dialog id="login-page" open={this.props.showModal} onClose={() => {handleClose()}}>
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
              <TextField name={'username'} label={translate('global.form.username.label')}
                         placeholder={translate('global.form.username.placeholder')}
                         required/>
              <TextField name={'password'} type={'password'} label={translate('login.form.password')}
                         placeholder={translate('login.form.password.placeholder')}
                         required/>
              <FormControlLabel label={translate('login.form.rememberme')}
                                control={<Checkbox name={'rememberMe'}/>}/>
              <div className="mt-1">&nbsp;</div>
              <Alert color="warning">
                <Link to="/account/reset/request">
                  <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
                </Link>
              </Alert>
              <Alert color="warning">
              <span>
                <Translate contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
              </span>{' '}
                <Link to="/account/register">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" tabIndex="1" variant={"contained"} onClick={()=>{handleClose()}}>
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
              </Button>{' '}
              <Button color="primary" type="submit" variant={"contained"}>
                <Translate contentKey="login.form.button">Sign in</Translate>
              </Button>
            </DialogActions>
          </Dialog>
        </Formik>);
  }
}

export default LoginModal;
