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


function InlineDatePicker(props) {
//  const [startDate, setStartDate] = React.useState(new Date("2014/02/08"));
//  const [endDate, setEndDate] = React.useState(new Date("2014/02/10"));
//    let now = moment();
    const [selectedDate, handleDateChange] = useState(new Date());

  return (
   <Fragment>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Start Date"
        format="MM/DD/YYYY"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
   </Fragment>
);
}

export default InlineDatePicker;