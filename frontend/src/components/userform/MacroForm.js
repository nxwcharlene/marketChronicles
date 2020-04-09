import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import IndicatorBox from './SearchBar/IndicatorBox.js';
import MagnitudeBox from './SearchBar/MagnitudeBox.js';
import DirectionBox from './SearchBar/DirectionBox.js';
import SecurityBox from './SearchBar/SecurityBox.js';
import StartDatePicker from './SearchBar/StartDatePicker.js';
import EndDatePicker from './SearchBar/EndDatePicker.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import MacroResults from '../results/macroresults';

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


function MacroForm() {
  const classes = useStyles();
  const [input, setInput] = useState({security: "", indicator: "", direction: "Exceed", magnitude: "Large", startdate: "2020-01-01", enddate: "2020-04-18"});
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const apiUrl = "http://localhost:8000/macro/macro-get/";
  const saveInput = (e) => {
    e.preventDefault();
    console.log(input)
    return axios.post(apiUrl, input)
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setResults(response.data);
        setIsLoaded(true);

      }).catch((error) => {
        console.log(error)
      });
  }

  const onChange = (item, response) => {
    input[item] = response
    console.log(input)
  }

  return (
    <React.Fragment>
      {isLoaded ? (
        <Fragment>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <form onSubmit={saveInput}>
              <FormControl className={classes.margin}>
                <SecurityBox onChange={onChange} />
                <FormHelperText>Name of Security </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <IndicatorBox onChange={onChange} />
                <FormHelperText>Economic Indicator </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <DirectionBox onChange={onChange} />
                <FormHelperText>Surprise Direction </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <MagnitudeBox onChange={onChange} />
                <FormHelperText>Surprise Magnitude </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <div style={{ height: 5 }} />
                <StartDatePicker utils={MomentUtils} onChange={onChange} />
                <FormHelperText>Start Date </FormHelperText>
              </FormControl>

              <FormControl className={classes.margin}>
                <div style={{ height: 5 }} />
                <EndDatePicker utils={MomentUtils} onChange={onChange} />
                <FormHelperText>End Date </FormHelperText>
              </FormControl>

              <Button className={classes.gobutton} size="large" variant="contained" color="primary" type="submit">
                SEARCH
          </Button>
            </form>
          </MuiPickersUtilsProvider>
          <div style={{ height: 10 }} />
          <hr></hr>
          <h3>Sample Results Output</h3>
          <MacroResults results={results} />
        </Fragment>
      ) : (
          <Fragment>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <form onSubmit={saveInput}>
                <FormControl className={classes.margin}>
                  <SecurityBox onChange={onChange} />
                  <FormHelperText>Name of Security </FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                  <IndicatorBox onChange={onChange} />
                  <FormHelperText>Economic Indicator </FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                  <DirectionBox onChange={onChange} />
                  <FormHelperText>Surprise Direction </FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                  <MagnitudeBox onChange={onChange} />
                  <FormHelperText>Surprise Magnitude </FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                  <div style={{ height: 5 }} />
                  <StartDatePicker utils={MomentUtils} onChange={onChange} />
                  <FormHelperText>Start Date </FormHelperText>
                </FormControl>

                <FormControl className={classes.margin}>
                  <div style={{ height: 5 }} />
                  <EndDatePicker utils={MomentUtils} onChange={onChange} />
                  <FormHelperText>End Date </FormHelperText>
                </FormControl>

                <Button className={classes.gobutton} size="large" variant="contained" color="primary" type="submit">
                  SEARCH
                </Button>
              </form>
            </MuiPickersUtilsProvider>
            <div style={{ height: 10 }} />
            <hr></hr>
            <h3>Results</h3>
            <div>Loading...</div>
          </Fragment>
        )}
    </React.Fragment>
  );
}

export default withRouter(MacroForm);