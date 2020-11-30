import React from 'react';
import {Alert as MuiAlert, AlertProps, Color} from '@material-ui/lab';

export interface IAlertProps {
  color: Color;
  children: any;
}

const Alert = (props: IAlertProps & AlertProps) => {
  const {color, children} = props;

  return (
    <MuiAlert color={color} style={{marginTop: 5, marginBottom: 5}}>{children}</MuiAlert>);
};
export default Alert;
