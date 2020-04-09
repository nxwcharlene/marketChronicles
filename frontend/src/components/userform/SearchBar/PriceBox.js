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

const PriceBox = (props) => {
    // const [direction, setDirection] = React.useState('');
    // const handleChange = event => {
    // setDirection(event.target.value);
    return (
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          defaultValue={"1-3"}
          onChange={(event) => {
            props.onChange('pricechange', event.target.value)
          }}
          style = {{width: 180}}
        >
          <option value="" />
          <option value={"1-3"}>1 - 3%</option>
          <option value={"3-5"}>3 - 5%</option>
          <option value={"5-10"}>5 - 10%</option>
          <option value={"10-200"}>> 10%</option>
        </NativeSelect>
        );
}

export default PriceBox