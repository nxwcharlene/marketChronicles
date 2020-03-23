import React, { useState } from 'react';
import axios from 'react-axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import PriceBox from './SearchBar/PriceBox.js';
import PriceDayBox from './SearchBar/PriceDayBox.js';
import SecurityBox from './SearchBar/SecurityBox.js';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  gobutton: {
    margin: theme.spacing(1.5),
  },
}));


function PriceForm(){
    const classes = useStyles();
    const input = {}
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://127.0.0.1:8000/price";

    const saveInput = (e) => {
      setShowLoading(true);
      e.preventDefault();
      console.log(apiUrl)
      return axios.post(apiUrl, input)
        .then((result) => {
          console.log(input)
          setShowLoading(false);
          //props.history.push('/show/' + result.data._id)
        }).catch((error) => {
          console.log('error')
          setShowLoading(false)});
    };
  
    const onChange = (item, response) => {
      // e.persist();
      console.log(response)
      input[item] = response
      console.log(input)
      // setInput({ item: response.name, indicator: '', direction: '', magnitude: 0 })
    }

        return (
            <React.Fragment>
                <form onSubmit={saveInput}>
                    <InputLabel>&emsp; Name of Security</InputLabel>
                    <FormControl className={classes.margin}>
                    <SecurityBox onChange={onChange} />
                    </FormControl>

                    <div style={{height:10}}/>

                    <FormControl className={classes.margin}>
                     <PriceBox onChange={onChange}/>
                     <FormHelperText>% change in stock price</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <PriceDayBox onChange={onChange}/>
                    <FormHelperText>Within a period of </FormHelperText>
                    </FormControl>

                    <Button className={classes.gobutton} size="medium" variant="contained" color="primary">
                        SEARCH
                    </Button>
                </form>
            </React.Fragment>
        );
}

export default withRouter (PriceForm);