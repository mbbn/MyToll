import React, { useState, useEffect } from 'react';
import {Select as MuiSelect, SelectProps, FormControl, FormLabel, FormHelperText} from '@material-ui/core'

export interface ISelectProps {
  name: string;
  error?: boolean;
  helperText?: any;
}

const Select = (props: ISelectProps & SelectProps) => {
  const {name, error, helperText, style, variant, children, label} = props;
  return (
    <FormControl style={style} fullWidth={true} size={"small"}>
      <FormLabel>{label}</FormLabel>
      <MuiSelect name={name} variant={variant ? variant : "outlined"} {...props}>
        {children}
      </MuiSelect>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>);
};

export default Select;
