import React, { useState, useEffect } from 'react';
import {Select as MuiSelect, SelectProps, FormControl, FormHelperText} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';

export interface ISelectProps {
  name: string;
}

const Select = (props: ISelectProps & SelectProps) => {
  const {name, style, variant, children} = props;
  return (
    <FormControl style={style}>
      <MuiSelect fullWidth={true} name={name} variant={variant ? variant : "outlined"} {...props}>
        {children}
      </MuiSelect>
    </FormControl>);
};

export default Select;
