import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
//import { makeStyles } from '@material-ui/core/styles';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
// for the user input form
import EarnAppBar from '../components/structure/navbar/EarnAppBar.js';
import Form from '../components/userform/formtest.js';
import EarnForm from '../components/userform/EarnForm.js';


//const useStyles = makeStyles(theme => ({
//  '@global': {
//    ul: {
//      margin: 0,
//      padding: 0,
//      listStyle: 'none',
//    },
//  },
//  body:{
//    margin: 0,
//    padding: 0,
//    backgroundColor: 'blue',
//    backgroundSize: 'cover',
//    paddingTop: theme.spacing(6),
//    paddingBottom: theme.spacing(20),
//  },
//  appBar: {
//    borderBottom: `1px solid ${theme.palette.divider}`,
//  },
//  toolbar: {
//    flexWrap: 'wrap',
//  },
//  toolbarTitle: {
//    flexGrow: 1,
//  },
//  link: {
//    margin: theme.spacing(1, 1.5),
//  },
//}));


function EarningsPage() {
//  const classes = useStyles();
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

                </Container>

            </div>
    </React.Fragment>
  );
}

export default EarningsPage;
