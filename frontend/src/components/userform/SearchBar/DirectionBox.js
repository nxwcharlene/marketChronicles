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

const DirectionBox = (props) => {
    // const [direction, setDirection] = React.useState('');
    // const handleChange = event => {
    //setDirection(event.target.value);
  
    return (
        <NativeSelect
          id="direction"
          // value={direction}
          input={<BootstrapInput />}
          defaultValue={"Exceed"}
          onChange={(event) => {
            props.onChange('direction', event.target.value)
          }}
          style = {{width: 200}}
        >
          <option value="" />
          <option value={"Exceed"}>Exceed Expectations</option>
          <option value={"Meet"}>Meet Expectations</option>
          <option value={"Below"}>Below Expectations</option>
        </NativeSelect>
        );
}

export default DirectionBox