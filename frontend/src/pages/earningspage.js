import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
// for the user input form
import EarnAppBar from '../components/structure/navbar/EarnAppBar.js';
import EarnForm from '../components/userform/EarnForm.js';
import EarningsResults from '../components/results/earningsresults.js';
import Footer from '../components/structure/footer/Footer.js';
import ResultChart from '../components/results/ResultChart.js';

function EarningsPage() {
  return (
    <React.Fragment>
        <CssBaseline />
            <div>
                <EarnAppBar />

                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>

                <Container maxWidth="xl">
                    <div style={{height:5}}/>
                    <h3>&emsp;&emsp;Search for Past Earnings Surprises</h3>

                    <EarnForm />
                    <div style={{height:10}}/>
                    <hr></hr>
                    <h3>Sample Results Output</h3>
                    <EarningsResults />
                    <ResultChart />

                    <div style={{height:400}}/>

                </Container>

                <Footer />

            </div>
    </React.Fragment>
  );
}

export default EarningsPage;
