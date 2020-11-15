import React, {useState} from 'react';
import {Button, Backdrop, CircularProgress} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {Formik} from 'formik';
import {translate} from 'react-jhipster';
import Plate from "app/component/plate";
import TextField from "app/component/textField";
import {connect} from 'react-redux';
import {IRootState} from "app/shared/reducers";
import {convertDateTimeToServer} from "app/shared/util/date-utils";
import {getBills} from 'app/entities/toll-request/toll-request.reducer';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {IBill} from "app/shared/model/bill.model";
import { toast } from 'react-toastify';
import TollRequest from "app/entities/toll-request/toll-request";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export interface IMarginalProps extends StateProps, DispatchProps {
  afterLoadBills?(bills: IBill[]): void;
}

export const Marginal = (props: IMarginalProps) => {
  const {afterLoadBills} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [bills, setBills] = useState([]);
  const [showTollRequest, setShowTollRequest] = useState(false);

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
    values.fromDate = convertDateTimeToServer(values.fromDate);
    values.toDate = convertDateTimeToServer(values.toDate);

    const entity = {
      ...values
    };
    setOpen(true);
    getBills(entity).payload.then(response => {
      setBills(response.data as IBill[]);
      setShowTollRequest(true);
      if(afterLoadBills){
        afterLoadBills(response.data as IBill[]);
      }
    }).catch(reason => {
      toast.error(translate('global.messages.error.internalError'));
    }).finally(()=>{
      setOpen(false);
    });
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClose = ()=>{
    setShowTollRequest(false);
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
            const reg = /^\d+$/;
            if(!reg.test(event.target.value) && event.target.value.length > 0){
              event.target.value = values['mobile'] ? values['mobile'] :'';
            }
            handleChange(event);
          }}/>
        </Grid>
        <Grid container justify={"center"}>
          <Button type={'submit'} color={"primary"} variant={"contained"} fullWidth={true} style={{minHeight: 50, fontSize: 20}}>
            {translate('entity.action.inquiry')}
          </Button>
        </Grid>
      </form>
    )}</Formik>
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Dialog open={showTollRequest} maxWidth={matches?'xl':'xs'} onClose={handleClose}>
      <DialogTitle>{translate('myTollApp.tollRequest.home.title')}</DialogTitle>
      <DialogContent>
        <TollRequest bills={bills}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant={"contained"}>
          {translate('entity.action.back')}
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus variant={"contained"}>
          {translate('entity.action.pay')}
        </Button>
      </DialogActions>
    </Dialog>
  </>);
};

const mapStateToProps = (storeState: IRootState) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Marginal);
