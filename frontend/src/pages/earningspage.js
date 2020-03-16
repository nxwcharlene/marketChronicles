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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Radiobox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
// for the user input form
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import EarnAppBar from '../components/structure/navbar/EarnAppBar.js'
import Form from '../components/userform/formtest.js'


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
}));


function EarningsPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <CssBaseline />
            <div>
                <EarnAppBar />

                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>

                <Container maxWidth="xl">
                    <h3>Search for past earnings surprises</h3>
                    <form>
                        <label>
                            Company:
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                        <div style={{height:10}}/>
                        <label>
                            Select a company:
                                <select>
                                <option value="AAPL">AAPL</option>
                                <option value="MSFT">MSFT</option>
                                <option value="GOOGL">GOOGL</option>
                                </select>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                <div style={{height:5}}/>
                <h1> Testing form submission </h1>
                <Form />

                </Container>

            </div>
    </React.Fragment>
  );
}

export default EarningsPage;
