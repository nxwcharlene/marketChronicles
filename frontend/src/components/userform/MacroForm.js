import React, { useState } from 'react';
import axios from 'react-axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import IndicatorBox from './SearchBar/IndicatorBox.js';
import MagnitudeBox from './SearchBar/MagnitudeBox.js';
import DirectionBox from './SearchBar/DirectionBox.js';
import SecurityBox from './SearchBar/SecurityBox.js';

import StartDatePicker from './SearchBar/StartDatePicker.js';
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
    margin: theme.spacing(1.5),
  },
}));


function MacroForm(){
    const classes = useStyles();
    const [input, setInput] = useState({ security: '', indicator: '', direction: '', magnitude: 0 });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://127.0.0.1:8000/macro/";

    const saveInput = (e) => {
      setShowLoading(true);
      e.preventDefault();
      const data = { security: input.security, indicator: input.indicator, direction: input.direction, magnitude: input.magnitude };
      axios.post(apiUrl, data)
        .then((result) => {
          setShowLoading(false);
          //props.history.push('/show/' + result.data._id)
        }).catch((error) => setShowLoading(false));
    };
  
    const onChange = (e) => {
      e.persist();
      setInput({...input, [e.target.name]: e.target.value});
    }

        return (
            <React.Fragment>
             <MuiPickersUtilsProvider utils={MomentUtils}>
                <form onSubmit={saveInput}>
                    <FormControl className={classes.margin}>
                    <SecurityBox name="security" value={input.security} onChange={onChange}/>
                    <FormHelperText>Name of Security </FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                     <IndicatorBox name="indicator" value={input.indicator} onChange={onChange}/>
                     <FormHelperText>Economic Indicator </FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <DirectionBox name="direction" value={input.direction} onChange={onChange}/>
                    <FormHelperText>Surprise Direction </FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <MagnitudeBox name="magnitude" value={input.magnitude} onChange={onChange}/>
                    <FormHelperText>Surprise Magnitude </FormHelperText>
                    </FormControl>

                    <div style={{height:30}}/>
                    <StartDatePicker className={classes.margin} utils={MomentUtils} />

                    <Button className={classes.gobutton} size="medium" variant="contained" color="primary" type="submit">
                        SEARCH
                    </Button>
                </form>
             </MuiPickersUtilsProvider>
            </React.Fragment>
        );
}

export default withRouter(MacroForm);