import React, { useState, useEffect } from 'react';
import {FormControl, FormLabel, Button} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red, blue, common } from '@material-ui/core/colors';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { translate} from 'react-jhipster';
import Plate from "app/shared/plate/plate";
import TextField from "app/component/TextField";
import DatePicker from "app/component/DatePicker";

export interface IFreewayProps {
  a ?: string;
}

const Freeway = (props: IFreewayProps) => {

  const isValid = (values: any) => {
    const errors = {};
    if (!values['plate']) {
      errors['plate'] = translate('myTollApp.plateBill.error.plateIsNull');
    } else if(!/^[0-9]{9}$/g.test(values['plate'])){
      errors['plate'] = translate('myTollApp.plateBill.error.invalidPlate');
    }
    if (!values['mobile']) {
      errors['mobile'] = translate('myTollApp.plateBill.error.mobileIsNull');
    } else if(!/^09[0-9]{9}$/g.test(values['mobile'])){
      errors['mobile'] = translate('myTollApp.plateBill.error.invalidMobile');
    }
    if(!values['fromDate']){
      errors['fromDate'] = translate('myTollApp.plateBill.error.fromDateIsNull');
    }
    if(!values['toDate']){
      errors['toDate'] = translate('myTollApp.plateBill.error.toDateIsNull');
    }
    return errors;
  };

  return (<>
    <Formik initialValues={{}} validate={values => isValid(values)} onSubmit={values => {
    }}>{({handleSubmit, errors, touched, handleChange, handleBlur, setFieldValue}) => (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Plate name={'plate'} error={touched['plate'] && errors['plate'] !== undefined} helperText={touched['plate'] ? errors['plate']:null}
                   onBlurPlate={handleBlur} onChangePlate={handleChange}/>
            <TextField name={'mobile'} onChange={handleChange} onBlur={handleBlur} maxLength={11} required
                       error={touched['mobile'] && errors['mobile'] !== undefined} helperText={touched['mobile'] ? errors['mobile']:null}
                       label={translate('myTollApp.customer.mobile')}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <DatePicker name={'fromDate'} value={null} error={touched['fromDate'] && errors['fromDate'] !== undefined} helperText={touched['fromDate'] ? errors['fromDate']:null}
                        onBlur={handleBlur} onChange={date => {setFieldValue('fromDate', date)}} label={translate('myTollApp.plateBill.fromDate')} required/>
          </Grid>
          <Grid item xs={6}>
            <DatePicker name={'toDate'} value={null} error={touched['toDate'] && errors['toDate'] !== undefined} helperText={touched['toDate'] ? errors['toDate']:null}
                        onBlur={handleBlur} onChange={date => {setFieldValue('toDate', date)}} label={translate('myTollApp.plateBill.toDate')} required/>
          </Grid>
        </Grid>
        <Grid container justify={"center"}>
          <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true} style={{minHeight: 50, fontSize: 20}}>
            {translate('entity.action.inquiry')}
          </Button>
        </Grid>
      </form>
    )}</Formik>
  </>);
};

export default Freeway;
