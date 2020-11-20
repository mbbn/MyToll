import React from 'react';
import {Grid} from '@material-ui/core'
import {IBill} from "app/shared/model/bill.model";
import {translate} from 'react-jhipster';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {grey, common, green, red} from '@material-ui/core/colors';
import {dateStrToJalali, dateStrToJalaliWithFormat} from "app/component/datePicker";
import {convertEnglishNumberToPersian} from "app/shared/util/persian-utils";
import {convertDateTimeToServer} from "app/shared/util/date-utils";
import {BillStatus} from "app/shared/model/enumerations/bill-status.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      borderStyle: "solid",
      borderColor: theme.palette.primary.main,
      borderRadius: 5,
      padding: 5,
      marginLeft: 3,
      marginBottom: 10
    },
    rightCol:{},
    leftCol:{
      textAlign: 'end'
    }
  }),
);

export interface IBillDisplayProps {
  bill: IBill;
  selected?:boolean;
}

const BillDisplay = (props: IBillDisplayProps) => {
  const {selected = false, bill} = props;
  const classes = useStyles();

  const fromDate: Date = convertDateTimeToServer(bill.fromDate);
  const toDate: Date = convertDateTimeToServer(bill.toDate);
  const durationTime = Math.abs(Math.round((((toDate.getTime() - fromDate.getTime())/1000)/60)));

  return (<Grid container className={classes.root} style={{
    backgroundColor: selected ? grey["200"] : common.white,
  }}>
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={12}>
          {dateStrToJalali(bill.billDate)}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {dateStrToJalaliWithFormat(bill.billDate, 'hh:mm:ss')}
        </Grid>
        <Grid item xs={12}>
          {BillStatus.UNPAID === bill.billStatus ?
            <div style={{color: red["500"]}}>{translate('myTollApp.tollRequest.billDisplay.unpaid')}</div>
            : <div style={{color: green["500"]}}>{translate('myTollApp.tollRequest.billDisplay.paid')}</div>}
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6} className={classes.leftCol}>
      <Grid container>
        <Grid item xs={12}>
          {translate('myTollApp.tollRequest.billDisplay.amount', {amount: (bill.amount)})}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {bill.street}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {translate('myTollApp.tollRequest.billDisplay.durationTime', {time: convertEnglishNumberToPersian(durationTime)})}
        </Grid>
      </Grid>
    </Grid>
  </Grid>);
};
export default BillDisplay;
