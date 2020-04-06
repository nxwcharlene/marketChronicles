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


function StartDatePicker(props) {
//    const [startDate, setStartDate] = React.useState(new Date("2020/01/01"));
//    const [endDate, setEndDate] = React.useState(new Date("2020/04/06"));
       let now = moment();
    const [selectedDate, handleDateChange] = React.useState(new Date("2020/01/01"));

      return (
       <Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
    //        label="Start Date"
            format="MM/DD/YYYY"
            style={{width:200}}
            value={selectedDate}
            InputAdornmentProps={{ position: "end" }}
            onChange={(event, value) => {
                props.onChange('startdate',value)
                handleDateChange(value)
            }}
          />
        </MuiPickersUtilsProvider>
       </Fragment>
    );
}

export default StartDatePicker;