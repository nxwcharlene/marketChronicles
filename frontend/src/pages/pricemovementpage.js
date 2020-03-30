import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import PriceAppBar from '../components/structure/navbar/PriceAppBar.js';
import PriceForm from '../components/userform/PriceForm.js';
import PriceMovementResults from  '../components/results/pricemovementresults.js';
import Footer from '../components/structure/footer/Footer.js';

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
            <PriceAppBar />
                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>

            <div>
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
