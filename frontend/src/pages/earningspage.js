import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
// for the user input form
import EarnAppBar from '../components/structure/navbar/EarnAppBar.js';
import Form from '../components/userform/formtest.js';
import EarnForm from '../components/userform/EarnForm.js';
import Footer from '../components/structure/footer/Footer.js';

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
                    <div style={{height:500}}/>
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
                <div style={{height:30}}/>
                </Container>

                <Footer />

            </div>
    </React.Fragment>
  );
}

export default EarningsPage;
