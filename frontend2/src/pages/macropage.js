import React from 'react';
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
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Radiobox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import MacroResults from './results/macroresults.js'
// for the user input form
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


let country = ["US", "Singapore", "China"]


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
    margin: theme.spacing(0),
  },
}));

const indicator = [
  { indicator_name: 'Unemployment rate', year: 1994 },
  { indicator_name: 'Inflation rate', year: 2012 },
]


function MacroPage() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
        <CssBaseline />
            <div>
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Economic Surprise
                        </Typography>
                        <nav>
                            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                                HOME
                            </Link>
                            <Link variant="button" color="textPrimary" href="/earnings" className={classes.link}>
                                EARNINGS SURPRISE
                            </Link>
                            <Link variant="button" color="textPrimary" href="/price_movement" className={classes.link}>
                                PRICE MOVEMENT
                            </Link>
                        </nav>
                        <Button href="#" color="primary" variant="outlined" className={classes.link}>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>

                <Container maxWidth="xl">
                    <div style={{height:5}}/>
                    <h3>Search for Past Economic Surprises</h3>

                    <div>
                        <InputLabel>Name of Security</InputLabel>
                         <SecurityBox />

                        <div style={{height:20}}/>

                        <InputLabel>Economic Indicator</InputLabel>
                        <FormControl className={classes.margin}>
                          <Autocomplete
                            id="size-small-outlined"
                            size="small"
                            options={indicator}
                            getOptionLabel={option => option.title}
                            defaultValue={indicator[1]}
                            renderInput={params => (
                              <TextField {...params} style={{width:600}} variant="outlined" placeholder="Economic Indicator" />
                            )}>
                          </Autocomplete>
                        </FormControl>

                      <FormControl className={classes.margin}>
                        <InputLabel htmlFor="demo-customized-select-native">Surprise Direction</InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={age}
                          onChange={handleChange}
                          input={<BootstrapInput />}
                          style = {{width: 100}}
                        >
                          <option value="" />
                          <option value={10}>Ten</option>
                          <option value={20}>Twenty</option>
                          <option value={30}>Thirty</option>
                        </NativeSelect>
                      </FormControl>
                    </div>



                    <div style={{height:50}}/>
                    <h3>Random test input boxes</h3>
                    <div style={{height:50}}/>

                    <form>
                        <div style={{height:10}}/>
                        <label>
                            Select a region: &emsp;
                                <select>
                                <option value="US">US</option>
                                <option value="EMEA">EMEA</option>
                                <option value="APAC">APAC</option>
                                </select>
                        </label>
                        <input type="submit" value="Submit" />
                        <div style={{height:10}}/>
                        <label>
                            Region: &emsp;
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>










                    <DropdownList
                    data={country}
                    defaultValue={"US"}>
                    </DropdownList>

                    <hr></hr>
                    <h3>Results </h3>
                    <MacroResults />




                </Container>

            </div>
    </React.Fragment>
  );
}

export default MacroPage;
