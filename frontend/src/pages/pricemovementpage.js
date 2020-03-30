import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import PriceForm from '../components/userform/PriceForm.js';
import PriceMovementResults from  '../components/results/pricemovementresults.js';
import Footer from '../components/structure/footer/Footer.js';

// const apiUrl = "http://127.0.0.1:8000/macro/macro-get";

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


function PriceMovementPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
                <div>
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Stock Price Movement
                        </Typography>
                        <nav>
                            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                                HOME
                            </Link>
                            <Link variant="button" color="textPrimary" href="/economic" className={classes.link}>
                                ECONOMIC SURPRISE
                            </Link>
                            <Link variant="button" color="textPrimary" href="/earnings" className={classes.link}>
                                EARNINGS SURPRISE
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
                    <h3>&emsp;&emsp;Search for large historical stock price movement</h3>
                    <PriceForm />
                    <div style={{height:10}}/>
                    <hr></hr>
                    <h3>Sample Results Output</h3>
                    <div style={{height:10}}/>
                    <PriceMovementResults />


                </Container>
                <div style={{height:30}}/>

                <Footer />

            </div>
        </React.Fragment>
  );
}

export default PriceMovementPage;
