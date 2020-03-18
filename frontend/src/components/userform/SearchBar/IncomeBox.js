import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function IncomeBox() {
  return (
    <Autocomplete
      id="size-small-outlined"
      size="small"
      options={income_items_list}
      getOptionLabel={option => option.name}
      renderInput={params => <TextField {...params} style={{width:350}} placeholder="Income Statement Line Item" variant="outlined" />}
    />
  );
}

const income_items_list = [
  { name: 'Net Income'},
 ];
