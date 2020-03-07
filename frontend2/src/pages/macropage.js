import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Radiobox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { render } from 'react-dom';
import { DropdownList } from 'react-widgets'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MacroResults from './results/macroresults.js'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

let country = ["US", "Singapore", "China"]

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


function MacroPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <CssBaseline />
            <div>
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                       <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Market Chronicles
                        </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            ABOUT US
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            ECONOMIC CALENDAR
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            SEARCH
                        </Link>
                    </nav>
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                        Login
                    </Button>
                    </Toolbar>
                </AppBar>

                <h2>&emsp; Market Chronicles</h2>
                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>
                <p>&emsp; Welcome to our macro page!</p>
                <div style={{height:5}}/>
                <h3>&emsp; Search for past economic surprises</h3>
                <form>
                    <label>
                        &emsp; Region:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                    <div style={{height:10}}/>
                    <label>
                        &emsp; Select a region:
                            <select>
                            <option value="US">US</option>
                            <option value="EMEA">EMEA</option>
                            <option value="APAC">APAC</option>
                            </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

              <div style={{height:50}}/>
              <h3>&emsp; Random test input boxes</h3>

                <DropdownList
                data={country}
                defaultValue={"US"}>
                </DropdownList>

                <hr></hr>
                <h3>&emsp; Results </h3>
                <MacroResults />
            </div>
    </React.Fragment>
  );
}

export default MacroPage;
