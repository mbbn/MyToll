import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Grid, Paper, Divider, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import TextField from "app/component/textField";

export type IPasswordResetInitProps = DispatchProps;

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {

  passwordResetSchema = Yup.object().shape({
    email: Yup.string()
      .min(5, translate('global.messages.validate.email.minlength'))
      .max(254, translate('global.messages.validate.email.maxlength'))
      .required(translate('global.messages.validate.email.required'))
  });

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (values) => {
    this.props.handlePasswordResetInit(values.email);
  };

  render() {
    return (
      <div>
        <Grid container justify={"center"}>
          <Grid item md={4}>
            <Formik initialValues={{}} validationSchema={this.passwordResetSchema}
                    onSubmit={values => this.handleValidSubmit(values)}>{({handleSubmit, errors, values, handleChange, handleBlur}) => (
              <form onSubmit={handleSubmit}>
                <Paper elevation={2} square={true}>
                  <h1>
                    <Translate contentKey="reset.request.title">Reset your password</Translate>
                  </h1>
                  <Alert color="warning">
                    <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
                  </Alert>
                  <Grid container spacing={2} justify={"center"}>
                    <Grid item xs={12}>
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
                        {translate('reset.request.form.button')}
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
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetInit);
