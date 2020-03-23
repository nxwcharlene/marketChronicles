import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import IncomeBox from './SearchBar/IncomeBox.js';
import MagnitudeBox from './SearchBar/MagnitudeBox.js';
import DirectionBox from './SearchBar/DirectionBox.js';
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


function EarnForm(){
  const classes = useStyles();
  // const [input, setInput] = useState({ security: '', indicator: '', direction: '', magnitude: 0 });
  const input = {}
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://127.0.0.1:8000/earnings";

  const saveInput = (e) => {
    setShowLoading(true);
    e.preventDefault();
    console.log(apiUrl)
    return axios.post(apiUrl, {input})
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
                <form>
                    <InputLabel>&emsp; Name of Security</InputLabel>
                    <FormControl className={classes.margin}>
                    <SecurityBox onChange={onChange}/>
                    </FormControl>

                    <div style={{height:10}}/>

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

                    <Button className={classes.gobutton} size="medium" variant="contained" color="primary">
                        SEARCH
                    </Button>
                </form>
            </React.Fragment>
        );
}

export default withRouter(EarnForm);