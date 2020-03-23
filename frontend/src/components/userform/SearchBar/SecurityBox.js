import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SecurityBox = (props) => {
  return (
    <Autocomplete
        id="Security"
        size="small"
        options={securitylist}
        onChange={(event, value) => {
          props.onChange('Security', value.name)
        }}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField {...params} style={{width:500}} id="Security" variant="outlined" placeholder="Security" />
        )}>
    </Autocomplete>
   )
}

// have to find the list of stocks from array
const securitylist = [
  { name: 'AAPL'},
  { name: 'GOOG'},
];

export default SecurityBox
