import React, { useState, useEffect } from 'react';
import API from "./SecurityBox_api.js";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SecurityBox = (props) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchResult = await API.get('/');
      setResult(fetchResult.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const loadingMessage = () => {
    return <span>Loading...</span>
  }

  const data = () => {
    return result.map(item => (
        <li key={item.stock_id}>{item.tick_and_name}</li>
    ))
  }

  return (
   <div>
   {result.map((data) =>
        <Autocomplete
            id="Security"
            size="small"
            options={data}
//            items = {
//                [{options:data.tick_and_name,
//                  values:data.stock_id}]
//            }
            onInputChange={(event, value, reason) => {
            (reason === 'clear') ? props.onChange('security', '') : props.onChange('security', value)
            }}
            getOptionLabel={option => option.tick_and_name}
            renderInput={params => (
              <TextField {...params} style={{width:500}} id="Security" variant="outlined" placeholder="Security" />
            )}>
        </Autocomplete>
   )}
   </div>
   )
}

// have to find the list of stocks from array
//const securitylist = [
//  { name: 'AAPL'},
//  { name: 'GOOGL'},
//];

export default SecurityBox
