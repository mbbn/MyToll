import './callback.scss';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getPayRequest, verifyPay} from 'app/entities/toll-request/toll-request.reducer';
import {IRootState} from "app/shared/reducers";
import {Grid, Paper} from '@material-ui/core'
import {Alert} from '@material-ui/lab';
import {Translate} from 'react-jhipster';
import Plate from "app/component/plate";
import {toast, Toast} from 'react-toastify';
import {translate} from 'react-jhipster';
import {Backdrop, CircularProgress} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import BillDisplay from "app/component/billDisplay";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.snackbar + 1,
      color: '#fff',
    },
  }),
);

export interface ICallbackProps extends StateProps, RouteComponentProps<{trackingId:string, paid:string}> {
}

export const Callback = (props: ICallbackProps) => {
  const paid = props.match.params.paid;
  const classes = useStyles();
  const [plate, setPlate] = useState(null);
  const [bills, setBills] = useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const trackingId = props.match.params.trackingId;
    setOpen(true);
    if ('1' === paid) {
      verifyPay(trackingId).payload.then(response => {
        const data = response.data;
        setPlate(data.bills[0].plate);
        setBills(data.bills);
      }).finally(()=>{
        setOpen(false);
      });
    } else {
      getPayRequest(trackingId).payload.then(response => {
        const data = response.data;
        setPlate(data.bills[0].plate);
        setBills(data.bills);
      }).finally(()=>{
        setOpen(false);
      });
    }
  }, []);

  if(!open && '1' === paid){
    toast.success(translate('myTollApp.payRequest.payStatus.paid'));
  }else {
    toast.error(translate('myTollApp.payRequest.payStatus.fail'));
  }

  return (<>
          <Grid container spacing={1}>
              <Grid xs={12} sm={6} md={4} item>
                  <Paper>
                    {plate ? <Plate editable={false} plateCode={plate}/>:null}
                    {bills && bills.length > 0 ? (<>
                      {bills.map(bill => <Grid container key={"row-" + bill.billId} spacing={1} direction={"row"} alignContent={"flex-start"} alignItems={"flex-start"} justify={"flex-start"}>
                        <Grid item xs={12} key={"bill-" + bill.billId}>
                          <BillDisplay key={bill.billId} bill={bill} selected={true}/>
                        </Grid>
                      </Grid>)}
                    </>) : (<Alert color={'warning'}>
                      <Translate contentKey="myTollApp.tollRequest.home.notFound">No Plates found</Translate>
                    </Alert>)}
                  </Paper>
              </Grid>
          </Grid>
          <Backdrop open={open} className={classes.backdrop}>
              <CircularProgress color="inherit"/>
          </Backdrop>
      </>);
};

const mapStateToProps = ({ payRequest }: IRootState) => ({
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Callback);
