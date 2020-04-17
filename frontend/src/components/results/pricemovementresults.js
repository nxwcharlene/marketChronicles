//get output from backend via API, display JSON, have to convert to Bokeh

import React from 'react';
//import {component, useState, useEffect} from 'react';
//import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
//import { makeStyles } from '@material-ui/core/styles';
import ResultChart from './ResultChart.js';
//import Skeleton from '@material-ui/lab/Skeleton';

// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state

// Using class components
class PriceMovementResults extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//         isLoaded: false
//     }
// }
//
// componentDidMount() {
//     const newsapikey = "cb96aea22e024b5090f23187cec75f76"
//     var apiurl = "http://newsapi.org/v2/everything?q=apple&from=2020-04-12&to=2020-04-12&sortBy=popularity&apiKey=cb96aea22e024b5090f23187cec75f76"
//     fetch("http://127.0.0.1:8000/pricemovement/get_date")
//         .then(res => res.json())
//         .then(json => {
//             this.setState({
//                 newsitems: json,
////                 isLoaded: true,
//             })
//         }).catch((err) => {
//             console.log(err);
//         });
// }

     render() {
//         const { isLoaded } = this.state;
         const newsitems = this.props.results[1];
         const items = this.props.results[0];
         console.log(items)

         return (
             <div>
                 {items.map((item) => (
                       <Card style={{marginBottom:20}} key={item.date}>
                         <CardHeader
                             title={item.date}
                             titleTypographyProps={{ align: 'left', variant:'body1'}}
                             style={{
                             backgroundColor: 'grey',
                             height: 20}}
                         />

                         <CardContent>
                             <Grid container spacing={0} alignItems="flex-end">
                                 <Grid item key={item.ticker} xs={2} md={2} style ={{height: 140, flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 10}}>
                                   <ul>
                                         <div style={{flex: 1, flexDirection: 'column', justifyContent: 'top'}}>
                                         <li >
                                             <b><span>Price Movement </span></b>
                                         </li>
                                         <li >
                                             <div style={{height:10}} ><span> </span></div>
                                         </li>
                                         <li >
                                             <span>Ticker: {item.ticker}</span>
                                         </li>
                                         <li >
                                             <span>Price change: {item.returns}</span>
                                         </li>
                                         <li >
                                             <span>Period: {item.period}</span>
                                         </li>
                                         </div>
                                   </ul>
                                 </Grid>

                                 <Grid item key={item.stock_id} xs={3} md={3} style ={{height: 140, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                     <ul>
                                         <li >
                                             <b><span>Post-Movement Returns (%)</span></b>
                                         </li>
                                         <li >
                                             <span> 1 Day: {item.day_return}</span>
                                         </li>
                                         <li >
                                             <span> 1 Week: {item.wk_return}</span>
                                         </li>
                                         <li >
                                             <span> 1 Month: {item.mth_return}</span>
                                         </li>
                                         <li >
                                             <span> 3 Months: {item.threemth_return}</span>
                                         </li>
                                         <li >
                                             <span> 6 Months: {item.sixmth_return}</span>
                                         </li>
                                         <li >
                                             <span> 1 Year: {item.year_return}</span>
                                         </li>
                                     </ul>
                                 </Grid>

                                 <Grid item key={item.id} xs={4} md={4} style={{height: 140, paddingLeft: 10, paddingRight: 20}}>
                                     <ResultChart ticker={item.ticker} date={item.date} chartprices={item.chartprices}/>
                                 </Grid>


                                 <Grid item key={item.id} xs={4} md={4} style={{height: 140, paddingLeft: 30, paddingRight: 20}}>

                                     <b><span>Related News</span></b>
                                     <div style={{marginBottom:5}} />

                                     <ul>
                                     {newsitems.slice(0, 3).map((newsitem) => (
                                         <li style={{marginBottom: 5}}>
                                             <a href={newsitem.url} target="_blank"> <span> - {newsitem.title} </span> </a>
                                         </li>
                                     ))}
                                     </ul>
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
