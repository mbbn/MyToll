import React, {useState, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Grid, Paper, Divider, Checkbox, Button} from '@material-ui/core'
import {connect} from 'react-redux';
import {translate} from 'react-jhipster';
import {IRootState} from "app/shared/reducers";
import {IBill} from "app/shared/model/bill.model";
import {getBills, pay} from 'app/entities/toll-request/toll-request.reducer';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Translate} from 'react-jhipster';
import {toast} from 'react-toastify';
import {Alert} from '@material-ui/lab';
import Plate from "app/component/plate";
import BillDisplay from "app/component/billDisplay";
import {Backdrop, CircularProgress} from '@material-ui/core'
import {defaultValue as defaultPayRequest} from "app/shared/model/pay-request.model";
import {defaultValue as defaultCustomer} from "app/shared/model/customer.model";
import {convertEnglishNumberToPersian} from "app/shared/util/persian-utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.snackbar + 1,
      color: '#fff',
    },
  }),
);

export interface IPlateBillsProps extends StateProps, DispatchProps, RouteComponentProps<{mobile:string, plate: string}> {
}

export const PlateBills = (props: IPlateBillsProps) => {
  const classes = useStyles();
  const plate = props.match.params.plate;
  const [bills, setBills] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
  useEffect(() => {
    setOpen(true);
    getBills(Number(plate)).payload.then(response => {
      if(200 === response.status){
        setSelectedBills(Object.assign([], response.data));
        setBills(response.data as IBill[]);
      }
    }).finally(()=>{setOpen(false)});
  }, []);
  let totalAmount = 0;
  selectedBills.forEach(bill => totalAmount += bill.amount);

  const handlePay = () => {
    const payRequest = {...defaultPayRequest};
    payRequest.bills = selectedBills;
    payRequest.customer = {...defaultCustomer};
    payRequest.customer.mobile = props.match.params.mobile;
    setOpen(true);
    pay(payRequest).payload.then(response => {
      if (typeof window !== 'undefined') {
        window.location.href = response.data;
      }
    }).catch(() => {
      toast.error(translate('global.messages.error.internalError'));
      setOpen(false);
    });
  };

  return (<>
    <Grid container spacing={1}>
      <Grid xs={12} sm={6} md={4} item>
        <Paper elevation={5}>
          <Plate editable={false} plateCode={String(plate)}/>
          {bills && bills.length > 0 ? (<>
            <Grid container alignItems={"flex-start"} spacing={1}>
              <Grid item xs={12} sm={6} md={4}>
                <Checkbox size={"medium"} checked={selectedBills.length === bills.length}
                          onChange={(event, checked) => {
                            if (checked) {
                              setSelectedBills(Object.assign([], bills));
                            } else {
                              setSelectedBills([]);
                            }
                          }}/>
                {translate('myTollApp.tollRequest.plateBills.selectAll')}
              </Grid>
            </Grid>
            {bills.map(bill => <Grid container key={"row-" + bill.billId} spacing={1} direction={"row"} alignContent={"flex-start"} alignItems={"flex-start"} justify={"flex-start"}>
              <Grid item xs={1} sm={2} md={1} key={"check-" + bill.billId}>
                <Checkbox size={"medium"}
                          checked={selectedBills.findIndex(selectedBill => bill.billId === selectedBill.billId) > -1}
                          onChange={(event, checked) => {
                            if (checked) {
                              const list = Object.assign([], selectedBills);
                              list.push(bill);
                              setSelectedBills(list);
                            } else {
                              setSelectedBills(selectedBills.filter(selectedBill => bill.billId !== selectedBill.billId));
                            }
                          }}/>
              </Grid>
              <Grid item xs={11} sm={10} md={11} key={"bill-" + bill.billId}>
                <BillDisplay key={bill.billId} bill={bill}
                             selected={selectedBills.findIndex(selectedBill => bill.billId === selectedBill.billId) > -1}/>
              </Grid>
            </Grid>)}
          </>) : (<Alert color={'warning'}>
            <Translate contentKey="myTollApp.tollRequest.home.notFound">No Plates found</Translate>
          </Alert>)}
          <Divider style={{marginTop: 5, marginBottom: 5}}/>
          {selectedBills ?
            <Translate contentKey={'home.payNotify'}
                       interpolate={{
                         billCount: convertEnglishNumberToPersian(selectedBills.length),
                         totalAmount: convertEnglishNumberToPersian(totalAmount)
                       }}/> : null}
          <Grid container justify={"center"}>
            <Button disabled={selectedBills.length === 0} type={'submit'} color={"primary"} variant={"contained"} fullWidth={true}
                    style={{minHeight: 50, fontSize: 20}} onClick={handlePay}>
              {translate('entity.action.pay')}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  </>);
};

const mapStateToProps = ({tollRequest}: IRootState) => ({
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateBills);

