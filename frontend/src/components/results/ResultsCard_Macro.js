import React, {component, useState, useEffect} from 'react';
//import API from "../@utils/API";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';

//
//const useStyles = makeStyles(theme => ({
//  '@global': {
//    ul: {
//      margin: 0,
//      padding: 0,
//      listStyle: 'none',
//    },
//  },
//  cardHeader: {
//    backgroundColor:
//      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
//    height: 20
//  },
//  cardPricing: {
//    display: 'flex',
//    justifyContent: 'center',
//    alignItems: 'baseline',
//    marginBottom: theme.spacing(2),
//  },
//}));
//
//
//const tiers = [
//  {
//    title: 'Date: 01/01/2020',
//    description: ['Stock: Apple Inc.', 'Price change: 5.0%', 'Period: 1 Day'],
//  },
//];
//
//
//export default function ResultsCard() {
//  const classes = useStyles();
//  const [result, setResult] = useState([]);
//  const [isLoading, setIsLoading] = useState(true);
//
//  useEffect(() => {
//    const fetchData = async () => {
////      const fetchResult = await API.get('/');
//      setResult(fetchResult.data);
//      setIsLoading(false);
//    }
//
//    fetchData();
//  }, []);
//
//  const loadingMessage = () => {
//    return <span>Loading...</span>
//  }
//
//  const data = () => {
//    return result.map(item => (
//      <li key={item.id}>{item.name}</li>
//    ))
//  }
//
//
//
//    return(
//        <Container maxWidth='xl'>
//
//            <Grid container spacing={12} alignItems="flex-end">
//              {tiers.map(tier => (
//                // Enterprise card is full width at sm breakpoint
//                <Grid item key={tier.title} xs={12} xl={tier.title === 'Enterprise' ? 12 : 6}>
//                  <Card>
//                    <CardHeader
//                      title={tier.title}
//                      subheader={tier.subheader}
//                      titleTypographyProps={{ align: 'left', variant:'body1'}}
//                      className={classes.cardHeader}
//                    />
//                    <CardContent>
//                      <div className={classes.cardPricing}>
//                        <Typography component="h2" variant="h3" color="textPrimary">
//                          {tier.price}
//                        </Typography>
//                      </div>
//                      <ul>
//                        {tier.description.map(line => (
//                          <Typography variant="subtitle1" color="textSecondary" component="li" align="left" key={line}>
//                            {line}
//                          </Typography>
//                        ))}
//                        <div style={{height:10}}/>
//                      </ul>
//                    </CardContent>
//                  </Card>
//                </Grid>
//              ))}
//            </Grid>
//            <div style={{height:20}}/>
//
//            <div>
//              <h1>This is rendered with a React Functional Component</h1>
//              <ul>{isLoading ? loadingMessage() : data()}</ul>
//            </div>
//        </Container>
//
//    );
//}
