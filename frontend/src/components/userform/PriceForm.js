import React from 'react';
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


function PriceForm(){
    const classes = useStyles();

        return (
            <React.Fragment>
                <form>
                    <InputLabel>&emsp; Name of Security</InputLabel>
                    <FormControl className={classes.margin}>
                    <SecurityBox />
                    </FormControl>

                    <div style={{height:10}}/>

                    <FormControl className={classes.margin}>
                     <IncomeBox />
                     <FormHelperText>Income Statement Line Item</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <DirectionBox />
                    <FormHelperText>Surprise Direction </FormHelperText>
                    </FormControl>

                    <FormControl className={classes.margin}>
                    <MagnitudeBox />
                    <FormHelperText>Surprise Magnitude </FormHelperText>
                    </FormControl>

                    <Button className={classes.gobutton} size="medium" variant="contained" color="primary">
                        SEARCH
                    </Button>
                </form>
            </React.Fragment>
        );
}

export default PriceForm;