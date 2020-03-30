//get output from backend via API, display JSON, have to convert to Bokeh

import React, {component, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import demo from '../../images/demo_results.jpeg';
import ResultChart from './ResultChart.js';
// import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';

const newsapi = 'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=cb96aea22e024b5090f23187cec75f76'


// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state

// Using class components
class PriceMovementResults extends React.Component {
 constructor(props) {
     super(props);
     this.state = {
         items: [],
         isLoaded: false
     }
 }
 componentDidMount() {
     fetch("http://127.0.0.1:8000/pricemovement/")
         .then(res => res.json())
         .then(json => {
             this.setState({
                 items: json,
                 isLoaded: true,
             })
         }).catch((err) => {
             console.log(err);
         });
 }

     render() {
         const { isLoaded, items } = this.state;

         if (!isLoaded)
             return <div>Loading...</div>;

         return (
             <div>
                 {items.map(item => (
                       <Card style={{marginBottom:20}}>
                         <CardHeader
                             title={item.index}
                             titleTypographyProps={{ align: 'left', variant:'body1'}}
                             style={{
                             backgroundColor: 'grey',
                             height: 20}}
                         />

                         <CardContent>
                             <Grid container spacing={0} alignItems="flex-end">
                                 <Grid item key={item.id} xs={3} md={3} style ={{height: 120, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                   <ul>
                                         <div style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                         <li >
                                             <b><span>Price Movement </span></b>
                                         </li>
                                         <li >
                                             <span>Ticker: {item.data}</span>
                                         </li>
                                         <li >
                                             <span>Price change (%): {item.title}</span>
                                         </li>
                                         <li >
                                             <span>Period: {item.author}</span>
                                         </li>
                                         </div>
                                   </ul>
                                 </Grid>

                                 <Grid item key={item.id} xs={3} md={3}>
                                     <ul>
                                         <li >
                                             <b><span>Returns following large price movement </span></b>
                                         </li>
                                         <li >
                                             <span> 1 Day: {item.author}</span>
                                         </li>
                                         <li >
                                             <span> 1 Week: {item.author}</span>
                                         </li>
                                         <li >
                                             <span> 1 Month: {item.author}</span>
                                         </li>
                                         <li >
                                             <span> 3 Months: {item.title}</span>
                                         </li>
                                     </ul>
                                 </Grid>

                                 <Grid item key={item.id} xs={6} md={3}>
                                     <ResultChart />
                                 </Grid>
                             </Grid>
                         </CardContent>
                       </Card>
                 ))}
                 <div style={{height:50}}/>
             </div>
         );
     }
 }

export default PriceMovementResults;
