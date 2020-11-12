import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {translate} from 'react-jhipster';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface ITollDataTableProps {
  a ?: string;
}

export const TollDataTable = (props: ITollDataTableProps) => {
  const classes = useStyles();

  return( <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">{translate('myTollApp.bill.billDate')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.plate')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.billTypeTitle')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.street')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.fromDate')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.toDate')}</TableCell>
          <TableCell align="center">{translate('myTollApp.bill.amount')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>);
};

export default TollDataTable;
