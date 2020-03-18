import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import background from '../images/background_image.jpg';
import MainAppBar from '../components/structure/navbar/MainAppBar.js';
import footer from '../components/structure/footer/footer.js';


function Copyright() {
  return (
    <div variant="body2" style={{ color:"grey" }} align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
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
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    backgroundSize: 'cover',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[900],
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
    button: '/economic',
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
    button: '/price_movement',
    buttonText: 'Start Search',
    buttonVariant: 'outlined',
  },
];

export default function MainPage() {
  const classes = useStyles();
    return(
        <React.Fragment>
          <CssBaseline />
          <MainAppBar />

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
                              <Typography variant="subtitle1" color="textSecondary" component="li" align="center" key={line}>
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
              <footer />
          {/* End footer */}
        </React.Fragment>
    );
}
