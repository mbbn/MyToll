import React from 'react';
import {TextField as MuiTextField, TextFieldProps, FormControl} from '@material-ui/core'

export interface ITextFieldProps {
  name: string;
  maxLength?: number;
}

const TextField = (props: ITextFieldProps & TextFieldProps) => {
  const {name, variant, maxLength, onChange} = props;

  return (
    <MuiTextField fullWidth={true} name={name} variant={variant ? variant : "outlined"} {...props}
                  onChange={event => {
                    if (maxLength) {
                      event.target.value = event.target.value.substr(0, maxLength)
                    }
                    if(onChange){
                      onChange(event);
                    }
                  }}/>);
};
export default TextField;
