import React, { useState } from 'react';
import axios from 'react-axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import PriceBox from './SearchBar/PriceBox.js';
import PriceDayBox from './SearchBar/PriceDayBox.js';
import SecurityBox from './SearchBar/SecurityBox.js';
import StartDatePicker from './SearchBar/StartDatePicker.js';
import EndDatePicker from './SearchBar/EndDatePicker.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
    margin: theme.spacing(3),
  },
}));


function PriceForm(){
    const classes = useStyles();
    const input = {}
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://127.0.0.1:8000/price";
    console.log(showLoading)
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
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <form onSubmit={saveInput}>
                    <FormControl className={classes.margin}>
                    <SecurityBox onChange={onChange} />
                    <FormHelperText>Name of Security</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                     <PriceBox onChange={onChange}/>
                     <FormHelperText>% change in stock price</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <PriceDayBox onChange={onChange}/>
                    <FormHelperText>Within a period of </FormHelperText>
                    </FormControl>

                    <div style={{height:5}}/>

                    <FormControl className={classes.margin}>
                    <div style={{height:5}}/>
                    <StartDatePicker utils={MomentUtils} />
                    <FormHelperText>Start Date </FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <div style={{height:5}}/>
                    <EndDatePicker utils={MomentUtils} />
                    <FormHelperText>End Date </FormHelperText>
                    </FormControl>

                    <Button className={classes.gobutton} size="medium" variant="contained" color="primary">
                        SEARCH
                    </Button>
                </form>
              </MuiPickersUtilsProvider>
            </React.Fragment>
        );
}

export default withRouter (PriceForm);