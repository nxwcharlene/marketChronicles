import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import MacroResults from '../components/results/macroresults.js';
import EconAppBar from '../components/structure/navbar/EconAppBar.js';
import demo from '../images/demo_results.jpeg';
import MacroForm from '../components/userform/MacroForm.js';

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
                        </div>

                        <hr></hr>
                        <h3>Sample Results Output</h3>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <img src={demo} style={{width: 500}} alt=""/>
                        <div style={{height:10}}/>
                        <h3>Results from API</h3>
                        <MacroResults />

                    </Container>

                </div>
        </React.Fragment>
      );
}

export default MacroPage;
