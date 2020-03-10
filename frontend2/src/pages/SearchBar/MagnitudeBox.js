//import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';
//
//const useStyles = makeStyles(theme => ({
//  formControl: {
//    margin: theme.spacing(1),
//    minWidth: 120,
//  },
//}));
//
//export default function MagnitudeBox() {
//  const classes = useStyles();
//  const [age, setAge] = React.useState('');
//  const [open, setOpen] = React.useState(false);
//
//  const handleChange = event => {
//    setAge(event.target.value);
//  };
//
//  const handleClose = () => {
//    setOpen(false);
//  };
//
//  const handleOpen = () => {
//    setOpen(true);
//  };
//
//  return (
//    <div>
//      <FormControl className={classes.formControl}>
//        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
//        <Select
//          labelId="demo-controlled-open-select-label"
//          id="demo-controlled-open-select"
//          open={open}
//          onClose={handleClose}
//          onOpen={handleOpen}
//          value={age}
//          onChange={handleChange}
//        >
//          <MenuItem value={"Large"}>Large</MenuItem>
//          <MenuItem value={"Medium"}>Medium</MenuItem>
//          <MenuItem value={"Small"}>Small</MenuItem>
//        </Select>
//      </FormControl>
//    </div>
//  );
//}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
//    padding: '10px 26px 10px 12px',
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

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function MagnitudeBox() {
    const classes = useStyles();
    const [magnitude, setMagnitude] = React.useState('');
    const handleChange = event => {
    setMagnitude(event.target.value);
  };
    return (
        <NativeSelect
          id="demo-customized-select-native"
          value={magnitude}
          input={<BootstrapInput />}
          onChange={handleChange}
          style = {{width: 400}}
        >
          <option value="" />
          <option value={"Large"}>Large</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Small"}>Small</option>
        </NativeSelect>
    );
}