import React, { Fragment, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import EconAppBar from '../components/structure/navbar/EconAppBar.js';
import MacroForm from '../components/userform/MacroForm.js';
import MacroResults from '../components/results/macroresults.js';
import Footer from '../components/structure/footer/Footer.js';

function MacroPage() {

  return (
    <Fragment>
      <CssBaseline />
      <EconAppBar />
      <div style={{ height: 20, backgroundColor: "#375259" }} />
      <div style={{ height: 5, backgroundColor: "#cccecf" }} />
      <Container maxWidth="xl">
        <div style={{ height: 5 }} />
        <h3>&emsp;&emsp;Search for Past Economic Surprises</h3>
        <MacroForm />
        {/* <MacroResults /> */}
        <div style={{ height: 100 }} />
      </Container>
      <Footer />
    </Fragment>
  );
}

export default MacroPage;
