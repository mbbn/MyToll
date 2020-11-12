import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {translate} from 'react-jhipster';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';
import {IRootState} from "app/shared/reducers";
import {IBill} from "app/shared/model/bill.model";
import {dateStrToJalali, dateStrToJalaliWithFormat} from "app/component/datePicker";
import {Translate} from 'react-jhipster';
import {Alert} from '@material-ui/lab';

const useStyles = makeStyles({
  table: {
  },
});

export interface ITollDataTableProps extends StateProps, DispatchProps {}

export const TollRequest = (props: ITollDataTableProps) => {
  const classes = useStyles();

  const location = useLocation();
  const bills = location.state as IBill[];
  const [selectedBills, setSelectedBills] = useState(Object.assign([], bills));

  const history = useHistory();

  const handleClose = ()=>{
    history.goBack()
  };

  return (<Dialog open={true} fullWidth={true} onClose={handleClose}>
    <DialogTitle>{translate('myTollApp.tollRequest.home.title')}</DialogTitle>
    <DialogContent>
      {bills && bills.length > 0 ? (<TableContainer component={Card}>
        <Table className={classes.table} size={"small"} aria-label="simple table">
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
              <TableCell align="left">{translate('myTollApp.bill.billTypeTitle')}</TableCell>
              <TableCell align="left">{translate('myTollApp.bill.street')}</TableCell>
              <TableCell align="left">{translate('myTollApp.bill.amount')}</TableCell>
              <TableCell align="left">{translate('myTollApp.bill.billDate')}</TableCell>
              <TableCell align="left">{translate('myTollApp.bill.fromDate')}</TableCell>
              <TableCell align="left">{translate('myTollApp.bill.toDate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map(bill => <TableRow key={bill.id}>
              <TableCell align="left" padding="checkbox" key={'checked-' + bill.id} scope="row"><Checkbox size={"small"}
                                                                                                          checked={selectedBills.findIndex(selectedBill => bill.id === selectedBill.id) > -1}
                                                                                                          onChange={(event, checked) => {
                                                                                                            if (checked) {
                                                                                                              let list = Object.assign([], selectedBills);
                                                                                                              list.push(bill);
                                                                                                              setSelectedBills(list);
                                                                                                            } else {
                                                                                                              setSelectedBills(selectedBills.filter(selectedBill => bill.id !== selectedBill.id));
                                                                                                            }
                                                                                                          }}/></TableCell>
              <TableCell align="left" key={'billTypeTitle-' + bill.id} scope="row">{bill.billTypeTitle}</TableCell>
              <TableCell align="left" key={'street-' + bill.id} scope="row">{bill.street}</TableCell>
              <TableCell align="left" key={'amount-' + bill.id} scope="row">{bill.amount}</TableCell>
              <TableCell align="left" key={'billDate-' + bill.id} scope="row">{dateStrToJalali(bill.billDate)}</TableCell>
              <TableCell align="left" key={'fromDate-' + bill.id}
                         scope="row">{dateStrToJalaliWithFormat(bill.fromDate, 'HH:mm:ss')}</TableCell>
              <TableCell align="left" key={'toDate-' + bill.id}
                         scope="row">{dateStrToJalaliWithFormat(bill.toDate, 'HH:mm:ss')}</TableCell>
            </TableRow>)}
          </TableBody>
          <TableFooter>
            <TableRow>

            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>) : (
        <Alert color={'warning'}>
          <Translate contentKey="myTollApp.tollRequest.home.notFound">No Plates found</Translate>
        </Alert>
      )}
    </DialogContent>
    <DialogActions>

      <Button onClick={handleClose} color="default" variant={"contained"}>
        {translate('entity.action.back')}
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus variant={"contained"}>
        {translate('entity.action.pay')}
      </Button>
    </DialogActions>
  </Dialog>);
};

const mapStateToProps = ({ tollRequest }: IRootState) => ({
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TollRequest);
