import React from 'react';
import {useHistory} from 'react-router';
import {Grid, Divider, Button} from '@material-ui/core'
import {Formik} from 'formik';
import {translate} from 'react-jhipster';
import Plate from "app/component/plate";
import TextField from "app/component/textField";
import {connect} from 'react-redux';
import {IRootState} from "app/shared/reducers";

export interface IMarginalProps extends StateProps, DispatchProps {
}

export const Marginal = (props: IMarginalProps) => {
  const history = useHistory();

  const isValid = (values: any) => {
    const errors = {};
    if (!values['plate']) {
      errors['plate'] = translate('myTollApp.plateBill.error.plateIsNull');
    } else if (!(/^[0-9]{9}$/g).test(values['plate'])) {
      errors['plate'] = translate('myTollApp.plateBill.error.invalidPlate');
    }
    if (!values['mobile']) {
      errors['mobile'] = translate('myTollApp.plateBill.error.mobileIsNull');
    } else if (!/^09[0-9]{9}$/g.test(values['mobile'])) {
      errors['mobile'] = translate('myTollApp.plateBill.error.invalidMobile');
    }
    return errors;
  };

  const save = (values: any) => {
    history.push(values['mobile']+'/'+values['plate']+'/bills');
  };

  return (<>
    <Formik initialValues={{}} validate={values => isValid(values)} onSubmit={save}>{({handleSubmit, errors, values, handleChange, handleBlur, setFieldValue}) => (
      <form onSubmit={handleSubmit}>
        <Grid container justify={"center"}>
          <Plate name={'plate'} error={errors['plate'] !== undefined}
                 helperText={errors['plate'] ? String(errors['plate']) : ''}
                 onBlurPlate={handleBlur} onChangePlate={plateCode => setFieldValue('plate', plateCode)}/>
          <TextField name={'mobile'} onBlur={handleBlur} maxLength={11} required autoComplete={'off'}
                     error={errors['mobile'] !== undefined} helperText={errors['mobile']}
                     label={translate('myTollApp.customer.mobile')} onChange={event => {
            const reg = /^\d+$/;
            if(!reg.test(event.target.value) && event.target.value.length > 0){
              event.target.value = values['mobile'] ? values['mobile'] :'';
            }
            handleChange(event);
          }}/>
          <Divider variant={"fullWidth"} component={'div'}/>
          <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true} style={{minHeight: 50, fontSize: 20}}>
            {translate('entity.action.inquiry')}
          </Button>
        </Grid>
      </form>
    )}</Formik>
  </>);
};

const mapStateToProps = (storeState: IRootState) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Marginal);
