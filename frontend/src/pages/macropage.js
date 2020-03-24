import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import EconAppBar from '../components/structure/navbar/EconAppBar.js';
import MacroForm from '../components/userform/MacroForm.js';
import MacroResults from '../components/results/macroresults.js';
//import ResultsCard from '../components/results/ResultsCard_Macro.js';
import Footer from '../components/structure/footer/Footer.js';

function MacroPage(){
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
                            <MacroForm />
                            <div style={{height:10}}/>
                        </div>

                        <hr></hr>
                        <h3>Sample Results Output</h3>
                        <MacroResults />
                        <div style={{height:100}}/>

                    </Container>

                    <Footer />

                </div>
        </React.Fragment>
      );
}

export default MacroPage;
