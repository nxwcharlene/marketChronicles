import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SecurityBox() {
  return (
    <Autocomplete
        id="indicator"
        size="small"
        options={securitylist}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField {...params} style={{width:500}} variant="outlined" placeholder="Security" />
        )}>
    </Autocomplete>
   )
}

// have to find the list of stocks from array
const securitylist = [
  { name: 'AAPL'},
  { name: 'GOOG'},
];
