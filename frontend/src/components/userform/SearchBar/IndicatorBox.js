import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const IndicatorBox = (props) => {
  return (
    <Autocomplete
      id="indicator"
      size="small"
      onChange={(event, value) => {
        props.onChange('Indicator', value.name)
      }}
      options={indicatorlist}
      getOptionLabel={option => option.name}
      renderInput={params => <TextField {...params} style={{width:350}} placeholder="Economic Indicator" variant="outlined" />}
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

 export default IndicatorBox