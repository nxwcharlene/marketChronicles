import React from 'react';
import { Fragment, useState } from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

function disableWeekends(date) {
  return date.day() === 0 | date.day() === 6;
}

function EndDatePicker(props) {
    const [startDate, setStartDate] = React.useState(new Date("2020-04-01"));
    const [endDate, setEndDate] = React.useState(new Date("2020-04-18"));
        let now = moment();
    const [selectedDate, handleDateChange] = React.useState(new Date("2020-04-18"));

      return (
       <Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
    //        label="End Date"
            format="YYYY-MM-DD"
            style={{width:200}}
            shouldDisableDate={disableWeekends}
            value={selectedDate}
            InputAdornmentProps={{ position: "end" }}
            onChange={(event, value) => {
                props.onChange('enddate',value)
                handleDateChange(value)
            }}

          />
        </MuiPickersUtilsProvider>
       </Fragment>
    );
}

export default EndDatePicker;