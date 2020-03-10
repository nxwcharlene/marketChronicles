import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SecurityBox() {
  return (
    <Autocomplete
        id="size-small-outlined"
        size="small"
        options={securitylist}
        getOptionLabel={option => option.title}
        renderInput={params => (
          <TextField {...params} variant="outlined" placeholder="Security" />
        )}>
    </Autocomplete>
   )
}

// have to find the list of stocks from array
const securitylist = [
  { name: 'AAPL'},
  { name: 'GOOG'},
];