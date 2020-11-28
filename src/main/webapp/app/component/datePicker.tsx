import React, {useState} from 'react';
import {FormControl, FormHelperText} from '@material-ui/core'
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {DatePicker as MuiDatePicker, DatePickerProps, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {convertDateTimeFromServer} from "app/shared/util/date-utils";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
export const JALALI_DATE_FORMAT = 'jYYYY/jMM/jDD';
export const JALALI_DATE_TIME_FORMAT = 'jYYYY/jMM/jDD-HH:mm';

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
          labelFunc={date => (date ? date.format(JALALI_DATE_FORMAT) : '')}
          value={selectedDate}
          onBlur={props.onBlur}
          onChange={OnChangeDate} required={required}/>
      </MuiPickersUtilsProvider>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>);
};

export const dateStrToJalaliWithFormat:(dateStr: string, dateFormat: string)=>string = (dateStr, dateFormat) => {
  if(!dateStr || dateStr.length === 0){
    return null;
  }
  return jMoment(dateStr).format(dateFormat);
};

export const dateStrToJalali:(dateStr: string)=>string = (dateStr) => {
  return dateStrToJalaliWithFormat(dateStr, JALALI_DATE_FORMAT);
};

export const dateToJalaliStr: (date: Date) => string = (date) => {
  const dateStr = convertDateTimeFromServer(date);
  return dateStrToJalaliWithFormat(dateStr, JALALI_DATE_FORMAT);
};

export const dateToJalaliStrWithFormat: (date: Date, dateFormat: string) => string = (date, dateFormat) => {
  const dateStr = convertDateTimeFromServer(date);
  return dateStrToJalaliWithFormat(dateStr, dateFormat);
};

export default DatePicker;
