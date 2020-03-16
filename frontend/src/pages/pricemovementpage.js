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

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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
                    <h3>Search for large historical stock price movement</h3>
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



                  <div style={{height:30}}/>
                  <Typography variant="h6" gutterBottom>
                    Shipping address
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="billing address-line1"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="billing address-line2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="billing address-level2"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="billing postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="billing country"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                      />
                    </Grid>
                  </Grid>


                </Container>

            </div>
        </React.Fragment>
  );
}

export default PriceMovementPage;
