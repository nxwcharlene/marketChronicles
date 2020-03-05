import React, { Component } from 'react';
import ReactDOM from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import background from '../images/background_image.jpg';


function Copyright() {
  return (
    <div variant="body2" style={{ color:"grey" }} align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Market Chronicles
      </Link>{' '}
      {new Date().getFullYear()}
    </div>
  );
}

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
    backgroundImage: 'url(' + background + ')',
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
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type == 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundSize: 'cover',
    backgroundColor: theme.palette.type == 'dark' ? theme.palette.grey[900] : theme.palette.grey[900],
    borderTop: `0px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
//    [theme.breakpoints.up('sm')]: {
//      paddingTop: theme.spacing(0),
//      paddingBottom: theme.spacing(0),
//    },
  },
}));

const tiers = [
  {
    title: 'Economic Surprise',
    price: '',
    description: ['Find out how a stock', 'reacted to a macroeconomic', 'release in the past',],
    button: '/macro',
    buttonText: 'Start Search',
    buttonVariant: 'outlined',
  },
  {
    title: 'Earnings Surprise',
//    subheader: 'Most popular',
    price: '',
    description: [
      'Find out how a stock',
      'reacted to an earnings',
      'release in the past',
    ],
    button: '/earnings',
    buttonText: 'Start Search',
    buttonVariant: 'outlined', // instead of 'outlined' can also use 'contained' for a filled button
  },
  {
    title: 'Stock Price Movement',
    price: '',
    description: [
      'Find out what events',
      'occurred on days of large',
      'stock price movement',
    ],
    button: '/event',
    buttonText: 'Start Search',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function MainPage() {
  const classes = useStyles();
    return(
        <React.Fragment>
          <CssBaseline />
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                Market Chronicles
              </Typography>
              <nav>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                  ABOUT US
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                  ECONOMIC CALENDAR
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                  SEARCH
                </Link>
              </nav>
              <Button href="#" color="primary" variant="outlined" className={classes.link}>
                Login
              </Button>
            </Toolbar>
          </AppBar>

          {/* Hero unit */}
          <body className={classes.body}>
              <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <h1 component="h3" variant="h3" align="center" style={{color:"white"}} gutterBottom>
                      MARKET CHRONICLES
                    </h1>
                    <h3 variant="h6" align="center" style={{color:"white"}} component="p">
                      A simple tool for investors to explore how markets moved in reaction to economic and earnings surprises in the past
                    </h3>
              </Container>

          {/* End hero unit */}

              <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                  {tiers.map(tier => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                      <Card>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{ align: 'center' }}
                          className={classes.cardHeader}
                        />
                        <CardContent>
                          <div className={classes.cardPricing}>
                            <Typography component="h2" variant="h3" color="textPrimary">
                              {tier.price}
                            </Typography>
                          </div>
                          <ul>
                            {tier.description.map(line => (
                              <Typography variant="h6" color="textSecondary" component="li" variant="subtitle1" align="center" key={line}>
                                {line}
                              </Typography>
                            ))}
                            <div style={{height:10}}/>
                          </ul>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth variant={tier.buttonVariant} href={tier.button} color="primary">
                                {tier.buttonText}
                            </Button>
                       </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
          </body>

          {/* Footer */}
          <Container maxWidth="xl" component="footer" className={classes.footer}>
            <Box mt={0}>
              <Copyright />
            </Box>
          </Container>
          {/* End footer */}
        </React.Fragment>
    );
}

////This is for the footer
//            <Grid container spacing={4} justify="space-evenly">
//              {footers.map(footer => (
//                <Grid item xs={6} sm={3} key={footer.title}>
//                  <Typography variant="h6" color="textPrimary" gutterBottom>
//                    {footer.title}
//                  </Typography>
//                  <ul>
//                    {footer.description.map(item => (
//                      <li key={item}>
//                        <Link href="#" variant="subtitle1" color="textSecondary">
//                          {item}
//                        </Link>
//                      </li>
//                    ))}
//                  </ul>
//                </Grid>
//              ))}
//            </Grid>
