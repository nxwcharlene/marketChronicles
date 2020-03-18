import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '9px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function PriceDayBox() {
    const [direction, setDirection] = React.useState('');
    const handleChange = event => {
    setDirection(event.target.value);
  };
    return (
        <NativeSelect
          id="demo-customized-select-native"
          value={direction}
          input={<BootstrapInput />}
          onChange={handleChange}
          style = {{width: 200}}
        >
          <option value="" />
          <option value={"1D"}>1 Day</option>
          <option value={"3D"}>3 Days</option>
          <option value={"1W"}>1 Week</option>
          <option value={"1M"}>1 Month</option>
          <option value={"3M"}>3 Months</option>
          <option value={"6M"}>6 Months</option>
          <option value={"1Y"}>1 Year</option>
          <option value={"3Y"}>3 Years</option>
        </NativeSelect>
        );
}