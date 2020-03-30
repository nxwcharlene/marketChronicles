import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const IndicatorBox = (props) => {
  return (
    <Autocomplete
      id="indicator"
      size="small"
      onInputChange={(event, value, reason) => {
        (reason === 'clear') ? props.onChange('Indicator', '') : props.onChange('Indicator', value)
      }}
      options={indicatorlist}
      getOptionLabel={option => option.name}
      renderInput={params => <TextField {...params} style={{width:350}} placeholder="Economic Indicator" variant="outlined" />}
    />
  );
}

const indicatorlist = [
  { name: 'Non-Farm Payroll'},
  { name: 'ISM Manufacturing'},
  { name: 'ISM Non-Manufacturing'},
  { name: 'GDP Annualized QoQ'},
  { name: 'Retail Sales MoM'},
  { name: 'Initial Jobless Claims'},
  { name: 'Unemployment Rate'},
  { name: 'CPI MoM'},
  { name: 'FOMC Rate Decision (Upper Bound)'},
 ];

 export default IndicatorBox