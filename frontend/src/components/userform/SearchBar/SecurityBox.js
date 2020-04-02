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
    {result.map((items, i) => (
            <Autocomplete
                key={i}
                id="Security"
                size="small"
                options={items}
                autoHighlight
                getOptionLabel={(option) => option.tick_and_name}
                renderOption={(option) => (
                    <React.Fragment>
                      {option.ticker}: {option.security}
                    </React.Fragment>
                )}
                onInputChange={(event, value, reason) => {
                (reason === 'clear') ? props.onChange('security', '') : props.onChange('security', value.split(":")[0])
                }}
                renderInput={params => (
                  <TextField {...params} style={{width:500}} id="Security" variant="outlined" placeholder="Security" />
                )}>
            </Autocomplete>
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
