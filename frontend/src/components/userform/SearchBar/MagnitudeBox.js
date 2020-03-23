import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

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

const MagnitudeBox = (props) => {
    // const [magnitude, setMagnitude] = React.useState('');
    // const handleChange = event => {
    // setMagnitude(event.target.value);
  
    return (
        <NativeSelect
          id="magnitude"
          //value={input.magnitude}
          input={<BootstrapInput />}
          // onChange={handleChange}
          onChange={(event) => {
            props.onChange('Magnitude', event.target.value)
          }}
          style = {{width: 200}}
        >
          <option value="" />
          <option value={"Large"}>Large</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Small"}>Small</option>
        </NativeSelect>
    );
}

export default MagnitudeBox