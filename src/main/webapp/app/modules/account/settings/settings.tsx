import React, { useEffect } from 'react';
import { Button, Col, Alert, Row} from 'reactstrap';
import {Grid, Paper, CardHeader, CardContent} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { locales, languages } from 'app/config/translation';
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

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values,
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  const isValid = (values: any) => {
    const errors = {};

    return errors;
  };

  const SettingSchema = Yup.object().shape({
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

  const save = (values: any) => {
  };

  return (
    <div>
      <Grid container justify={"center"}>
        <Paper elevation={4}>
          <h2 id="settings-title">
            <Translate contentKey="settings.title" interpolate={{username: props.account.login}}>
              User settings for {props.account.login}
            </Translate>
          </h2>
          <Formik initialValues={props.account} validationSchema={SettingSchema}
                  onSubmit={save}>{({handleSubmit, errors, values, handleChange, handleBlur, setFieldValue}) => (
            <form onSubmit={handleSubmit}>
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
            </form>
          )}</Formik>
        </Paper>
      </Grid>
      {/*<Row className="justify-content-center">
        <Col md="4">
          <Card>
            <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>

              <Button color="primary" type="submit">
                <Translate contentKey="settings.form.button">Save</Translate>
              </Button>
            </AvForm>
          </Card>
        </Col>
      </Row>*/}
    </div>
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
