import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PriceBox = (props) => {
  return (
    <Autocomplete
      id="size-small-outlined"
      size="small"
      onChange={(event, value) => {
        props.onChange('Price Change', value.name)
      }}
      options={pricechange_list}
      getOptionLabel={option => option.name}
      renderInput={params => <TextField {...params} style={{width:350}} placeholder="% change in stock price" variant="outlined" />}
    />
  );
}

const pricechange_list = [
  { name: '< 1%'},
  { name: '1% - 3%'},
  { name: '3% - 5%'},
  { name: '> 5%'},
 ];

export default PriceBox
