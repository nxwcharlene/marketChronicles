import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import PriceAppBar from '../components/structure/navbar/PriceAppBar.js';
import PriceForm from '../components/userform/PriceForm.js';
import PriceMovementResults from  '../components/results/pricemovementresults.js';
import Footer from '../components/structure/footer/Footer.js';
import BokehChart from '../components/results/test_BokehChart.js';

function PriceMovementPage() {
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
                    <BokehChart />
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
