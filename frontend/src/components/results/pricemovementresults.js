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
// import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';

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
     fetch('https://jsonplaceholder.typicode.com/users')
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
 //                  <div style={{height:210}}>
                       <Card style={{marginBottom:15}}>
                         <CardHeader
                             title={item.date}
                             titleTypographyProps={{ align: 'left', variant:'body1'}}
                             style={{
                             backgroundColor: 'grey',
                             height: 20}}
                         />

                         <CardContent>
                             <Grid container spacing={0} alignItems="flex-end">
                                 <Grid item key={item.id} xs={3} md={3} style ={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                   <ul>
                                         <div style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                         <li >
                                             <b><span>Economic Release </span></b>
                                         </li>
                                         <li >
                                             <span>Ticker: {item.ticker}</span>
                                         </li>
                                         <li >
                                             <span>Indicator: {item.event}</span>
                                         </li>
                                         <li >
                                             <span>Actual: {item.actual}</span>
                                         </li>
                                         <li >
                                             <span>Estimate: {item.survm}</span>
                                         </li>
                                         <li >
                                             <span>Surprise: {item.surprise}</span>
                                         </li>
                                         </div>
                                   </ul>
                                 </Grid>

                                 <Grid item key={item.id} xs={3} md={3}>
                                     <ul>
                                         <li >
                                             <b><span>Post-release returns </span></b>
                                         </li>
                                         <li >
                                             <span> 1 Day: {item.ticker}</span>
                                         </li>
                                         <li >
                                             <span> 1 Week: {item.event}</span>
                                         </li>
                                         <li >
                                             <span> 1 Month: {item.surprise_sign}</span>
                                         </li>
                                         <li >
                                             <span> 3 Months: {item.surprise_magnitude}</span>
                                         </li>
                                         <li >
                                             <span> 6 Months: {item.surprise_magnitude}</span>
                                         </li>
                                     </ul>
                                 </Grid>

                                 <Grid item key={item.id} xs={6} md={3}>
                                     <img src={demo} style={{height: 120}} alt=""/>
                                 </Grid>
                             </Grid>
                         </CardContent>
                       </Card>
 //                  </div>

                 ))}
             </div>
         );
     }
 }

export default PriceMovementResults;
