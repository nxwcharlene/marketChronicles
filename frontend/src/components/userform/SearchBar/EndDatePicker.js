import React from 'react';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { Fragment, useState } from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

//class Example extends React.Component {
//
//  state = {
//    startDate: new Date()
//  };
//
//  handleChange = date => {
//    this.setState({
//      startDate: date
//    });
//  };
//
//  render() {
//
//    return (
//    <>
//    </>
//    );
//  }
//}


function EndDatePicker(props) {
//  const [startDate, setStartDate] = React.useState(new Date("2020/04/01"));
const [endDate, setEndDate] = React.useState(new Date("2020/04/06"));
//    let now = moment();
const [selectedDate, handleDateChange] = useState(new Date());

  return (
   <Fragment>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
//        label="End Date"
        format="DD/MM/YYYY"
        style={{width:200}}
        value={endDate}
        InputAdornmentProps={{ position: "end" }}
        onChange={(event) => props.onChange('End Date', endDate)}
      />
    </MuiPickersUtilsProvider>
   </Fragment>
);
}

export default EndDatePicker;