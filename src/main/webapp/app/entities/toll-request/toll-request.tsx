import React, {useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {connect} from 'react-redux';
import {useTheme} from '@material-ui/core/styles';
import {translate} from 'react-jhipster';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import {IRootState} from "app/shared/reducers";
import {IBill} from "app/shared/model/bill.model";
import {dateStrToJalali, dateStrToJalaliWithFormat} from "app/component/datePicker";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import {pay} from 'app/entities/toll-request/toll-request.reducer';
import {Translate} from 'react-jhipster';
import {Alert} from '@material-ui/lab';
import { toast } from 'react-toastify';

export interface ITollDataTableProps extends StateProps, DispatchProps {
  bills: IBill[];

  handleClose?(): void;
}

export const TollRequest = (props: ITollDataTableProps) => {
  const {bills} = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [showDialog, setShowDialog] = useState(true);
  const [selectedBills, setSelectedBills] = useState(Object.assign([], bills));
  let totalAmount = 0;
  selectedBills.forEach(bill => totalAmount += bill.amount);

  const handleClose = () => {
    if(props.handleClose){
      props.handleClose();
    } else {
      setShowDialog(false);
    }
  };

  const handlePay = () => {
    pay(selectedBills).payload.then(response => {
      /* eslint no-console: off */
      console.log(response);
    }).catch(() => {
      toast.error(translate('global.messages.error.internalError'));
    }).finally(() => handleClose());
  };

  return (<>
    <Dialog open={showDialog} maxWidth={matches?'xl':'xs'} onClose={handleClose}>
      <DialogTitle>{translate('myTollApp.tollRequest.home.title')}</DialogTitle>
      <DialogContent>
        {bills && bills.length > 0 ? (<TableContainer component={Card}>
          <Table size={"medium"} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" padding="checkbox">
                  <Checkbox size={"small"} style={{color: '#FFFFFF'}} inputProps={{'aria-label': 'select all desserts'}}
                            checked={selectedBills.length === bills.length} onChange={(event, checked) => {
                    if (checked) {
                      setSelectedBills(Object.assign([], bills));
                    } else {
                      setSelectedBills([]);
                    }
                  }}/>
                </TableCell>
                {matches ? <TableCell align="left">{translate('myTollApp.bill.billTypeTitle')}</TableCell>: null}
                <TableCell align="left">{translate('myTollApp.bill.street')}</TableCell>
                <TableCell align="left">{translate('myTollApp.bill.amount')}</TableCell>
                <TableCell align="left">{translate('myTollApp.bill.billDate')}</TableCell>
                {matches ? <TableCell align="left">{translate('myTollApp.bill.fromDate')}</TableCell> : null}
                {matches ? <TableCell align="left">{translate('myTollApp.bill.toDate')}</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map(bill => <TableRow key={bill.billId}>
                <TableCell align="left" padding="checkbox" key={'checked-' + bill.billId} scope="row">
                  <Checkbox size={"small"}
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
                </TableCell>
                {matches ? <TableCell align="left" key={'billTypeTitle-' + bill.billId}
                                      scope="row">{bill.billTypeTitle}</TableCell> : null}
                <TableCell align="left" key={'street-' + bill.billId} scope="row">{bill.street}</TableCell>
                <TableCell align="left" key={'amount-' + bill.billId} scope="row">{bill.amount}</TableCell>
                <TableCell align="left" key={'billDate-' + bill.billId}
                           scope="row">{dateStrToJalali(bill.billDate)}</TableCell>
                {matches ? <TableCell align="left" key={'fromDate-' + bill.billId}
                                      scope="row">{dateStrToJalaliWithFormat(bill.fromDate, 'HH:mm:ss')}</TableCell> : null}
                {matches ? <TableCell align="left" key={'toDate-' + bill.billId}
                                      scope="row">{dateStrToJalaliWithFormat(bill.toDate, 'HH:mm:ss')}</TableCell> : null}
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>) : (
          <Alert color={'warning'}>
            <Translate contentKey="myTollApp.tollRequest.home.notFound">No Plates found</Translate>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        {selectedBills ?
          <Translate contentKey={'home.payNotify'} interpolate={{billCount: selectedBills.length, totalAmount}}/> : null}
        <Button onClick={handleClose} color="default" variant={"contained"}>
          {translate('entity.action.back')}
        </Button>
        <Button onClick={handlePay} color="primary" autoFocus variant={"contained"}>
          {translate('entity.action.pay')}
        </Button>
      </DialogActions>
    </Dialog>
  </>);
};

const mapStateToProps = ({tollRequest}: IRootState) => ({
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TollRequest);

