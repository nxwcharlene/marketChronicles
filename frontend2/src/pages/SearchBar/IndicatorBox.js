import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function IndicatorBox() {
  return (
    <Autocomplete
      id="size-small-outlined"
      size="small"
      options={indicatorlist}
      getOptionLabel={option => option.name}
      defaultValue={indicator[1]}
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} style={{width:600}} label="Indicator" placeholder="Economic Indicator" variant="outlined" />}
    />
  );
}

const indicatorlist = [
  { name: 'Non-Farm Payroll'},
  { name: 'ISM Manufacturing PMI'},
  { name: 'ISM Non-Manufacturing PMI'},
  { name: 'GDP Growth Rate'},
  { name: 'Retail Sales MoM'},
  { name: 'Initial Jobless Claims'},
  { name: 'Unemployment Rate'},
  { name: 'CPI MoM'},
  { name: 'NAHB Housing Market Index'},
  { name: 'FOMC Rate Decision (Upper Bound)'},
 ];
