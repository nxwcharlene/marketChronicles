import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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


function SelectDate() {
  const [startDate, setStartDate] = React.useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = React.useState(new Date("2014/02/10"));
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
}

export default SelectDate;