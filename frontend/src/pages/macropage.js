import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { DropdownList } from 'react-widgets'
import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Radiobox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import MacroResults from './results/macroresults.js'
// for the user input form
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import IndicatorBox from './SearchBar/IndicatorBox.js'
import MagnitudeBox from './SearchBar/MagnitudeBox.js'
import DirectionBox from './SearchBar/DirectionBox.js'
import SecurityBox from './SearchBar/SecurityBox.js'
import EconAppBar from '../components/structure/navbar/EconAppBar.js'
import demo from '../images/demo_results.jpeg'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
//    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
    const [age, setAge] = React.useState('');
    const handleChange = event => {
    setAge(event.target.value);
    };

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
                        <img src={demo} style={{width: 500}} />
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} />
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} />
                        <div style={{height:10}}/>
                        <h3>Results from API</h3>
                        <MacroResults />

                    </Container>

                </div>
        </React.Fragment>
      );
}

export default MacroPage;
