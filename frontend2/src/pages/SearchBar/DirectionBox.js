import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function DirectionBox() {
  return (
    <NativeSelect
      id="demo-customized-select-native"
      value={age}
      onChange={handleChange}
      input={<BootstrapInput />}
      style = {{width: 100}}
    >
      <option value="" />
      <option value={"Exceed"}>Exceed Expectations</option>
      <option value={"Meet"}>Meet Expectations</option>
      <option value={"Below"}>Below Expectations</option>
    </NativeSelect>
  );
}