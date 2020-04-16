import React, { useState, Fragment } from 'react';
import axios from 'axios';
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
import PriceMovementResults from '../results/pricemovementresults.js';
import Skeleton from '@material-ui/lab/Skeleton';

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


function PriceForm() {
    const classes = useStyles();
    const [input, setInput] = useState({security: "", pricechange: "1-3", period: "1D", startdate: "2015-01-01", enddate: "2020-04-18"});
    const [results, setResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const apiUrl = "http://127.0.0.1:8000/pricemovement/get_date/";
    const saveInput = (e) => {
      setIsLoaded(null);
      e.preventDefault();
      console.log(input)

      return axios.post(apiUrl, input)
          .then((response) => {
            console.log(response);
            console.log(response.data);
            setResults(response.data);
            if (Object.keys(response.data).length == 0) {
                setIsLoaded(true);
                setIsEmpty(true);
                console.log(response.data);
            } else {
                setIsLoaded(true);
                setIsEmpty(false);
                console.log(response.data);
            }
          }).catch((error) => {
            console.log(error)
          });
    };



    const onChange = (item, response) => {
//      e.persist();
      console.log(response)
      input[item] = response
      console.log(input)
      // setInput({ item: response.name, indicator: '', direction: '', magnitude: 0 })
    };


    return (
       <React.Fragment>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <form onSubmit={saveInput}>
                <FormControl className={classes.margin}>
                <SecurityBox onChange={onChange}/>
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
                <StartDatePicker utils={MomentUtils} onChange={onChange}/>
                <FormHelperText>Start Date YYYY-MM-DD</FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                <div style={{height:5}}/>
                <EndDatePicker utils={MomentUtils} onChange={onChange}/>
                <FormHelperText>End Date YYYY-MM-DD</FormHelperText>
                </FormControl>

                <Button className={classes.gobutton} size="medium" variant="contained" color="primary" type="submit">
                    SEARCH
                </Button>
            </form>
          </MuiPickersUtilsProvider>

          {(isLoaded && !isEmpty) ? (

            <Fragment>
                <div style={{ height: 10 }} />
                <hr></hr>
                <h3>Search Results</h3>
                <h4>Number of instances found: {results[1].length} </h4>
                <PriceMovementResults results={results} />
            </Fragment>

          ) : (
                  (isLoaded && isEmpty) ? (
                    <Fragment>
                        <div style={{ height: 10 }} />
                        <hr></hr>
                        <h3>No results were found</h3>
                    </Fragment>
                  ) : (

                          ((isLoaded == null)) ? (
                            <Fragment>
                                <div style={{ height: 10 }} />
                                <hr></hr>
                                <div>
                                    <Skeleton animation="wave" variant="rect" width={"100%"} height={300} />
                                </div>
                            </Fragment>
                          ) : (
                            <Fragment>
                                <div style={{ height: 10 }} />
                                <hr></hr>
                                <h3>Please select inputs</h3>
                            </Fragment>
                          )
                  )
          )}
       </React.Fragment>
    );
}

export default withRouter(PriceForm);