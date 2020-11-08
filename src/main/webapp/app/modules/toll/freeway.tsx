import React, {useEffect} from 'react';
import {Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {Formik} from 'formik';
import {translate} from 'react-jhipster';
import Plate from "app/component/plate";
import TextField from "app/component/TextField";
import DatePicker from "app/component/DatePicker";
import {connect} from 'react-redux';
import {createEntity} from 'app/entities/toll-request/toll-request.reducer';
import {convertDateTimeToServer} from "app/shared/util/date-utils";
import {IRootState} from "app/shared/reducers";

export interface IFreewayProps extends StateProps, DispatchProps {}

export const Freeway = (props: IFreewayProps) => {
  const { tollRequestEntity } = props;

  const isValid = (values: any) => {
    const errors = {};
    if (!values['plate']) {
      errors['plate'] = translate('myTollApp.plateBill.error.plateIsNull');
    } else if(!(/^[0-9]{9}$/g).test(values['plate'])){
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

  const save = (values: any) => {
    values.fromDate = convertDateTimeToServer(values.fromDate);
    values.toDate = convertDateTimeToServer(values.toDate);

    const entity = {
      ...tollRequestEntity,
      ...values
    };
    props.createEntity(entity);
  };

  return (<>
    <Formik initialValues={{}} validate={values => isValid(values)} onSubmit={save}>{({handleSubmit, errors, values, handleChange, handleBlur, setFieldValue}) => (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Plate name={'plate'} error={errors['plate'] !== undefined}
                 helperText={errors['plate'] ? String(errors['plate']) : ''}
                 onBlurPlate={handleBlur} onChangePlate={plateCode => setFieldValue('plate', plateCode)}/>
          <TextField name={'mobile'} onBlur={handleBlur} maxLength={11} required
                     error={errors['mobile'] !== undefined} helperText={errors['mobile']}
                     label={translate('myTollApp.customer.mobile')} onChange={event => {
                       if(isNaN(Number(event.target.value))){
                         event.target.value = values['mobile'];
                       }
            handleChange(event);
          }}/>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <DatePicker name={'fromDate'} value={null} error={errors['fromDate'] !== undefined} helperText={errors['fromDate']}
                        onBlur={handleBlur} onChange={date => {setFieldValue('fromDate', date)}} label={translate('myTollApp.plateBill.fromDate')} required/>
          </Grid>
          <Grid item xs={6}>
            <DatePicker name={'toDate'} value={null} error={errors['toDate'] !== undefined} helperText={errors['toDate']}
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

const mapStateToProps = (storeState: IRootState) => ({
  tollRequestEntity: storeState.tollRequest.entity,
});

const mapDispatchToProps = {
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Freeway);
