import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const IncomeBox = (props) => {
  return (
    <Autocomplete
      id="size-small-outlined"
      size="small"
      onInputChange={(event, value, reason) => {
        (reason === 'clear') ? props.onChange('Income', '') : props.onChange('Income', value)
      }}
      options={income_items_list}
      getOptionLabel={option => option.name}
      renderInput={params => <TextField {...params} style={{width:350}} placeholder="Income Statement Line Item" variant="outlined" />}
    />
  );
}

const income_items_list = [
  { name: 'Net Income'},
 ];

export default IncomeBox
