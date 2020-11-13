import React, { useState } from 'react';
import {FormControl, FormHelperText} from '@material-ui/core'
import { translate} from 'react-jhipster';
import Grid from '@material-ui/core/Grid';
import {Theme} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "app/component/textField";
import Select from "app/component/select";
import myTollTheme from "app/ContextManager";
import {persianNumber} from "app/shared/util/persian-utils";

export interface IPlateProps {
  name: string;
  plateCode?: number;
  error?: boolean;
  helperText?: string;

  onChangePlate?(plateCode: number): void
  onBlurPlate?(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

const Plate = (props: IPlateProps) => {
  const {plateCode, error, helperText} = props;

  const myTheme: Theme = myTollTheme;
  const [bColor, setBColor] = useState(!error ? myTheme.palette.grey["500"] : myTheme.palette.error.main);

  const [part1, setPart1] = useState(null);
  const [part2, setPart2] = useState('');
  const [part3, setPart3] = useState(null);
  const [part4, setPart4] = useState(null);

  const OnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBColor(!error ? myTheme.palette.grey["500"]:myTheme.palette.error.main);
    event.target.name = props.name;
    props.onBlurPlate(event);
  };

  const OnFocused = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBColor(!error ? myTheme.palette.primary.main:myTheme.palette.error.main);
  };

  const OnChange = (event: any, part: 'part1' | 'part2' | 'part3' | 'part4') => {
    let valueStr;
    switch (part) {
      case "part1":
        valueStr = String(event.target.value + part2 + part3 + part4)
          .replace('null','')
          .replace('null','')
          .replace('null','');
        setPart1(event.target.value);
        break;
      case "part2":
        valueStr = String(part1 + event.target.value + part3 + part4)
          .replace('null','')
          .replace('null','')
          .replace('null','');
        setPart2(event.target.value);
        break;
      case "part3":
        valueStr = String(part1 + part2 + event.target.value + part4)
          .replace('null','')
          .replace('null','')
          .replace('null','');
        setPart3(event.target.value);
        break;
      case "part4":
        valueStr = String(part1 + part2 + part3 + event.target.value)
          .replace('null','')
          .replace('null','')
          .replace('null','');
        setPart4(event.target.value);
        break;
      default:
        break;
    }

    const value = !isNaN(Number(valueStr)) ? Number(valueStr) : null;
    if (props.onChangePlate && value !== null) {
      props.onChangePlate(value);
    }
  };

  return (<FormControl>
    <Grid container spacing={0} justify="center"
          alignItems="center" style={{
      borderStyle: "solid",
      borderRadius: 10,
      borderColor: bColor,
      // color: myTheme.props.MuiTextField.InputProps.style.color,
      // backgroundColor: myTheme.props.MuiTextField.InputProps.style.backgroundColor,
      direction: 'ltr'
    }}>
      <Grid item xs={1} style={{
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        background: "url('./content/images/iran.png') 3px 5px / 80% no-repeat rgb(4, 111, 218)",
        minHeight : 70
      }}/>
      <Grid item xs={2}>
        <TextField name={'part1'} value={part1} error={error} autoComplete={'off'} onChange={event => {OnChange(event, "part1")}} onFocus={OnFocused} onBlur={OnBlur} style={{margin: 0}}
                   variant={"standard"} InputProps={{inputProps:{style:{textAlign: 'center'}},disableUnderline: true}} maxLength={2}/>
      </Grid>
      <Grid item xs={3}>
        <Select name={'part2'} value={part2} error={error} style={{margin: 0}} onChange={event => {
          OnChange(event, "part2")
        }} onFocus={OnFocused} onBlur={OnBlur}>
            <MenuItem value="">
              <em/>
            </MenuItem>
            <MenuItem value="10">{translate('myTollApp.PlateAlphabet.A10')}</MenuItem>
            <MenuItem value="11">{translate('myTollApp.PlateAlphabet.A11')}</MenuItem>
            <MenuItem value="12">{translate('myTollApp.PlateAlphabet.A12')}</MenuItem>
            <MenuItem value="13">{translate('myTollApp.PlateAlphabet.A13')}</MenuItem>
            <MenuItem value="14">{translate('myTollApp.PlateAlphabet.A14')}</MenuItem>
            <MenuItem value="15">{translate('myTollApp.PlateAlphabet.A15')}</MenuItem>
            <MenuItem value="16">{translate('myTollApp.PlateAlphabet.A16')}</MenuItem>
            <MenuItem value="17">{translate('myTollApp.PlateAlphabet.A17')}</MenuItem>
            <MenuItem value="18">{translate('myTollApp.PlateAlphabet.A18')}</MenuItem>
            <MenuItem value="19">{translate('myTollApp.PlateAlphabet.A19')}</MenuItem>
            <MenuItem value="20">{translate('myTollApp.PlateAlphabet.A20')}</MenuItem>
            <MenuItem value="21">{translate('myTollApp.PlateAlphabet.A21')}</MenuItem>
            <MenuItem value="22">{translate('myTollApp.PlateAlphabet.A22')}</MenuItem>
            <MenuItem value="23">{translate('myTollApp.PlateAlphabet.A23')}</MenuItem>
            <MenuItem value="24">{translate('myTollApp.PlateAlphabet.A24')}</MenuItem>
            <MenuItem value="25">{translate('myTollApp.PlateAlphabet.A25')}</MenuItem>
            <MenuItem value="26">{translate('myTollApp.PlateAlphabet.A26')}</MenuItem>
            <MenuItem value="27">{translate('myTollApp.PlateAlphabet.A27')}</MenuItem>
            <MenuItem value="28">{translate('myTollApp.PlateAlphabet.A28')}</MenuItem>
            <MenuItem value="29">{translate('myTollApp.PlateAlphabet.A29')}</MenuItem>
            <MenuItem value="30">{translate('myTollApp.PlateAlphabet.A30')}</MenuItem>
            <MenuItem value="31">{translate('myTollApp.PlateAlphabet.A31')}</MenuItem>
            <MenuItem value="32">{translate('myTollApp.PlateAlphabet.A32')}</MenuItem>
            <MenuItem value="33">{translate('myTollApp.PlateAlphabet.A33')}</MenuItem>
            <MenuItem value="34">{translate('myTollApp.PlateAlphabet.A34')}</MenuItem>
            <MenuItem value="35">{translate('myTollApp.PlateAlphabet.A35')}</MenuItem>
            <MenuItem value="36">{translate('myTollApp.PlateAlphabet.A36')}</MenuItem>
            <MenuItem value="37">{translate('myTollApp.PlateAlphabet.A37')}</MenuItem>
            <MenuItem value="38">{translate('myTollApp.PlateAlphabet.A38')}</MenuItem>
            <MenuItem value="39">{translate('myTollApp.PlateAlphabet.A39')}</MenuItem>
            <MenuItem value="40">{translate('myTollApp.PlateAlphabet.A40')}</MenuItem>
            <MenuItem value="41">{translate('myTollApp.PlateAlphabet.A41')}</MenuItem>
          </Select>
      </Grid>
      <Grid item xs={3}>
        <TextField name={'part3'} value={part3} autoComplete={'off'} error={error} style={{margin: 0}} onChange={event => {
          OnChange(event, "part3")
        }} onFocus={OnFocused} onBlur={OnBlur} type={'number'} variant={"standard"}
                   InputProps={{inputProps: {style: {textAlign: 'center'}}, disableUnderline: true}} maxLength={3}/>
      </Grid>
      <Grid item xs={3} style={{borderLeftStyle: "solid", borderColor: bColor}}>
        <div style={{fontSize: 25, textAlign: 'center'}}>
          {translate('myTollApp.plate.iran')}
        </div>
        <TextField name={'part4'} value={part4} autoComplete={'off'} error={error} style={{margin: 0}} onChange={event => {
          OnChange(event, "part4")
        }} onFocus={OnFocused} onBlur={OnBlur} type={'number'} variant={"standard"}
                   InputProps={{inputProps: {style: {textAlign: 'center'}}, disableUnderline: true}} maxLength={2}/>
      </Grid>
    </Grid>
    <FormHelperText error={error} style={{marginRight: 15}}>{helperText}</FormHelperText>
  </FormControl>);
};
export default Plate;
