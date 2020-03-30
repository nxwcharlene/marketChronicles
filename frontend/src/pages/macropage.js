import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import EconAppBar from '../components/structure/navbar/EconAppBar.js';
import MacroForm from '../components/userform/MacroForm.js';
import MacroResults from '../components/results/macroresults.js';
import Footer from '../components/structure/footer/Footer.js';

function MacroPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);


      return (
        <React.Fragment>
            <CssBaseline />
                <EconAppBar />
                <div style={{height:20, backgroundColor: "#375259"}}/>
                <div style={{height:5, backgroundColor: "#cccecf"}}/>

                <div>
                    <Container maxWidth="xl">
                        <div style={{height:5}}/>
                        <h3>&emsp;&emsp;Search for Past Economic Surprises</h3>

                        <div>
                            <MacroForm setIsLoading={setIsLoading} setResults={setResults} />
                            <div style={{height:10}}/>
                        </div>

                        <hr></hr>
                        <h3>Sample Results Output</h3>
                        <MacroResults isLoading={isLoading} results={results}/>
                        {/* <MacroResults /> */}
                        <div style={{height:100}}/>

                    </Container>
                </div>
                <Footer />
        </React.Fragment>
      );
}

export default MacroPage;
