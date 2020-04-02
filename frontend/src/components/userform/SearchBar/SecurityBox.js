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

  return (
   <div>
    {result.map((data) => (
        <div key={data.stock_id}>
            <Autocomplete
                id="Security"
                size="small"
                options={data}
//                items = {
//                    [{options:data.tick_and_name,
//                      values:data.stock_id}]
//                }
                getOptionLabel={option => option.tick_and_name}
                onInputChange={(event, value, reason, option) => {
                (reason === 'clear') ? props.onChange('security', '') : props.onChange('security', value)
                }}
                renderInput={params => (
                  <TextField {...params} style={{width:500}} id="Security" variant="outlined" placeholder="Security" />
                )}>
            </Autocomplete>
        </div>
    ))}
   </div>
   )
}

// have to find the list of stocks from array
//const securitylist = [
//  { name: 'AAPL'},
//  { name: 'GOOGL'},
//];

export default SecurityBox
