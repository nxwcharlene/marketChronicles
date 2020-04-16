import React, { Fragment } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

function disableWeekends(date) {
  return date.day() === 0 | date.day() === 6;
}

function StartDatePicker(props) {
//    const [startDate, setStartDate] = React.useState(new Date("2020/01/01"));
//    const [endDate, setEndDate] = React.useState(new Date("2020/04/06"));
    const [selectedDate, handleDateChange] = React.useState(new Date("2015-01-01"));

      return (
       <Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
    //        label="Start Date"
            format="YYYY-MM-DD"
            style={{width:200}}
            shouldDisableDate={disableWeekends}
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