import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';


const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    height: 20
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));


const tiers = [
  {
    title: '01/01/2020',
    description: ['Find out how a stock', 'reacted to a macroeconomic', 'release in the past',],
  },
];


export default function ResultsCard() {
  const classes = useStyles();
    return(
        <Container maxWidth='xl'>

            <Grid container spacing={12} alignItems="flex-end">
              {tiers.map(tier => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} xl={tier.title === 'Enterprise' ? 12 : 6} xl={0}>
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: 'left', variant:'body1'}}
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
                          <Typography variant="subtitle1" color="textSecondary" component="li" align="left" key={line}>
                            {line}
                          </Typography>
                        ))}
                        <div style={{height:10}}/>
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div style={{height:20}}/>
        </Container>

    );
}
