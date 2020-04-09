import React, {useState, Fragment} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import IncomeBox from './SearchBar/IncomeBox.js';
import MagnitudeBox from './SearchBar/MagnitudeBox.js';
import DirectionBox from './SearchBar/DirectionBox.js';
import SecurityBox from './SearchBar/SecurityBox.js';
import StartDatePicker from './SearchBar/StartDatePicker.js';
import EndDatePicker from './SearchBar/EndDatePicker.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import EarningsResults from '../results/earningsresults.js';

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


function EarnForm(){
  const classes = useStyles();

  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const input = {}
  const apiUrl = "http://localhost:8000/earnings/earnings-get/";
  const saveInput = (e) => {
    e.preventDefault();
    console.log(apiUrl)
    return axios.post(apiUrl, input)
      .then((response) => {
        console.log(input)
        console.log(response)
        console.log(response.data);
        setResults(response.data);
        setIsLoaded(true);
      }).catch((error) => {
        console.log(error)
      });
  };

  const onChange = (item, response) => {
    input[item] = response
    console.log(input)
  }

  return (
    <React.Fragment>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <form onSubmit={saveInput}>
              <FormControl className={classes.margin}>
                <SecurityBox onChange={onChange}/>
                <FormHelperText>Name of Security</FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <IncomeBox onChange={onChange}/>
                <FormHelperText>Income Statement Line Item</FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <DirectionBox onChange={onChange}/>
                <FormHelperText>Surprise Direction </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <MagnitudeBox onChange={onChange}/>
                <FormHelperText>Surprise Magnitude </FormHelperText>
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

              <Button className={classes.gobutton} size="medium" variant="contained" color="primary" type="submit">
                  SEARCH
              </Button>
          </form>
        </MuiPickersUtilsProvider>

        {isLoaded ? (
            <Fragment>
                <div style={{ height: 10 }} />
                <hr></hr>
                <h3>Search Results</h3>
                <EarningsResults results={results} />
            </Fragment>
          ) : (
            <Fragment>
                <div style={{ height: 10 }} />
                <hr></hr>
                <h3> Search Results</h3>
                <h5>Loading...</h5>
            </Fragment>
          )}
     </React.Fragment>
  );
}

export default withRouter(EarnForm);