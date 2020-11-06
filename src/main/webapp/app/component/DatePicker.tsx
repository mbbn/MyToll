import React, {useState} from 'react';
import {FormControl, FormHelperText} from '@material-ui/core'
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {DatePicker as MuiDatePicker, DatePickerProps, MuiPickersUtilsProvider} from "@material-ui/pickers";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export interface IDatePickerProps {
  name: string;
  label?:string;
  required?:boolean;
  error?: boolean;

  onChange?(date: any): void
  onBlur?(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

const DatePicker = (props: IDatePickerProps & DatePickerProps) => {
  const {name, label, value, required, error, helperText} = props;

  const [selectedDate, handleDateChange] = useState(!value ? null : moment(value));
  const OnChangeDate = (date: any)=>{
    handleDateChange(date);
    if(props.onChange){
      props.onChange(date);
    }
  };

  return (
    <FormControl>
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <MuiDatePicker
          clearable
          okLabel="تأیید"
          cancelLabel="لغو"
          clearLabel="پاک کردن"
          label={label}
          name={name}
          fullWidth={true}
          inputVariant={'outlined'}
          error={error}
          labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : '')}
          value={selectedDate}
          onBlur={props.onBlur}
          onChange={OnChangeDate} required={required}/>
      </MuiPickersUtilsProvider>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>);
};

export default DatePicker;
