import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import MacroResults from '../components/results/macroresults.js';
// for the user input form
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IndicatorBox from '../components/userform/SearchBar/IndicatorBox.js';
import MagnitudeBox from '../components/userform/SearchBar/MagnitudeBox.js';
import DirectionBox from '../components/userform/SearchBar/DirectionBox.js';
import SecurityBox from '../components/userform/SearchBar/SecurityBox.js';
import EconAppBar from '../components/structure/navbar/EconAppBar.js';
import demo from '../images/demo_results.jpeg';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  body:{
    margin: 0,
    padding: 0,
    backgroundColor: 'blue',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(20),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  margin: {
    margin: theme.spacing(1),
  },
  gobutton: {
    margin: theme.spacing(1.5),
//    paddingBottom: theme.spacing(2),
//    '& > *': {
//      margin: theme.spacing(5),
//    },
  },
}));

function MacroPage(){
    const classes = useStyles();

      return (
        <React.Fragment>
            <CssBaseline />
                <div>
                    <EconAppBar />

                    <div style={{height:20, backgroundColor: "#375259"}}/>
                    <div style={{height:5, backgroundColor: "#cccecf"}}/>

                    <Container maxWidth="xl">
                        <div style={{height:5}}/>
                        <h3>&emsp;&emsp;Search for Past Economic Surprises</h3>


                        <div>
                            <form>
                                <InputLabel>&emsp; Name of Security</InputLabel>
                                <FormControl className={classes.margin}>
                                <SecurityBox />
                                </FormControl>

                                <div style={{height:10}}/>

                                <FormControl className={classes.margin}>
                                 <IndicatorBox />
                                 <FormHelperText>Economic Indicator </FormHelperText>
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
                        </div>

                        <hr></hr>
                        <h3>Sample Results Output</h3>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <h3>Results from API</h3>
                        <MacroResults />

                    </Container>

                </div>
        </React.Fragment>
      );
}

export default MacroPage;
