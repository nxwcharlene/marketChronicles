//get output from backend via API, display JSON, have to convert to Bokeh
// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state
//get output from backend via API, display JSON, have to convert to Bokeh

import React from 'react';
//import { component, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import EarningsChart from './earningschart.js';

class EarningsResults extends React.Component {

  render() {
    const items = this.props.results
    console.log(typeof items)
    return (
      <div>
        {console.log(items)}
        {items.map(item => (
          <Card style={{ marginBottom: 15 }} key={item.id}>
            <CardHeader
              title={item.quarter}
              titleTypographyProps={{ align: 'left', variant: 'body1' }}
              style={{
                backgroundColor: 'grey',
                height: 20
              }}
            />

            <CardContent>
              <Grid container spacing={0} alignItems="flex-end">
                <Grid key={item.id} item xs={3} md={3} style={{ height: 140, flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 30, paddingBottom: 30 }}>
                  <ul>
                    <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'top' }}>
                      <li >
                        <b><span>Earnings Release </span></b>
                      </li>
                      <li >
                        <div style={{height:10}} ><span> </span></div>
                      </li>
                      <li >
                        <span>Ticker: {item.Ticker}</span>
                      </li>
                      <li >
                        <span>Release Date: {item.date}</span>
                      </li>
                      <li >
                        <span>Actual: {item.actual}</span>
                      </li>
                      <li >
                        <span>Estimate: {item.median}</span>
                      </li>
                      <li >
                        <span>Surprise: {item.direction} Expectations</span>
                      </li>
                    </div>
                  </ul>
                </Grid>

                <Grid key={item.id} item xs={3} md={3} style={{ height:140, flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 30, paddingBottom: 30 }}>
                  <ul>
                    <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'top' }}>
                        <li >
                        <b><span>Post-release returns </span></b>
                        </li>
                        <li >
                            <div style={{height:10}} ><span> </span></div>
                        </li>
                        <li >
                        <span> 1 Day: {item.day_return}%</span>
                        </li>
                        <li >
                        <span> 1 Week: {item.wk_return}%</span>
                        </li>
                        <li >
                        <span> 1 Month: {item.mth_return}%</span>
                        </li>
                        <li >
                        <span> 3 Months: {item.threemth_return}%</span>
                        </li>
                        <li >
                        <span> 6 Months: {item.sixmth_return}%</span>
                        </li>
                        <li >
                        <span> 1 Year: {item.year_return}%</span>
                        </li>
                    </div>
                  </ul>
                </Grid>

                <Grid key={item.id} item xs={6} md={6}>
                  <EarningsChart style={{ height: 140 }} ticker={item.ticker} date={item.date}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default EarningsResults;

// import React, { component, useState, useEffect }from 'react';
// import Grid from '@material-ui/core/Grid';
// import ResultChart from './ResultChart.js';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';

// class EarningsResults extends React.Component {

    // render() {
    //     const items = JSON.parse(this.props.results)
    //     console.log(typeof items)
    //     return (
    //       <div>
    //         {console.log(items)}
    //         {items.map(item => (
    //           <Card style={{ marginBottom: 15 }} key={item.id}>
    //             <CardHeader
    //               title={item.date}
    //               titleTypographyProps={{ align: 'left', variant: 'body1' }}
    //               style={{
    //                 backgroundColor: 'grey',
    //                 height: 20
    //               }}
    //             />
    
    //             <CardContent>
    //               <Grid container spacing={0} alignItems="flex-end">
    //                 <Grid key={item.id} item xs={3} md={3} style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    //                   <ul>
    //                     <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    //                       <li >
    //                         <b><span>Earnings Release </span></b>
    //                       </li>
    //                       <li >
    //                         <span>Ticker: {item.ticker}</span>
    //                       </li>
    //                       <li >
    //                         <span>Quarter: {item.quarter}</span>
    //                       </li>
    //                       <li >
    //                         <span>Actual: {item.actual}</span>
    //                       </li>
    //                       <li >
    //                         <span>Estimate: {item.median}</span>
    //                       </li>
    //                       <li >
    //                         <span>Surprise: {item.magnitude}</span>
    //                       </li>
    //                     </div>
    //                   </ul>
    //                 </Grid>
    
    //                 <Grid key={item.id} item xs={3} md={3}>
    //                   <ul>
    //                     <li >
    //                       <b><span>Post-release returns </span></b>
    //                     </li>
    //                     <li >
    //                       <span> 1 Day: {item.price_t1}</span>
    //                     </li>
    //                     <li >
    //                       <span> 1 Week: {item.price_t7}</span>
    //                     </li>
    //                     <li >
    //                       <span> 1 Month: {item.date_t30}</span>
    //                     </li>
    //                     <li >
    //                       <span> 3 Months: {item.date_t90}</span>
    //                     </li>
    //                     <li >
    //                       <span> 6 Months: {item.date_t90}</span>
    //                     </li>
    //                   </ul>
    //                 </Grid>
    
    //                 <Grid key={item.id} item xs={6} md={6}>
    //                   <ResultChart style={{ height: 10 }} />
    //                 </Grid>
    //               </Grid>
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    
    //     );
    //   }
    // }

    // original
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             isLoaded: false
//         }
//     }
//     componentDidMount() {
//         fetch('http://localhost:8000/earnings/')
//             .then(res => res.json())
//             .then(json => {
//                 this.setState({
//                     items: json,
//                     isLoaded: true,
//                 })
//             }).catch((err) => {
//                 console.log(err);
//             });
//     }

// //render UI
//     render() {
//         const { isLoaded, items } = this.state;

//         if (!isLoaded)
//             return <div>Loading...</div>;

//         return (
//             <Grid container spacing={2} justify= "space-evenly" alignItems="center">
//                     <ul>
//                         {items.map(item => (
//                             <div key={item.id} style={{border:'1px solid'}}>
//                             <li>
//                                 <span>{item.id}</span>
//                             </li>
//                             <li >
//                                 <span>Ticker: {item.ticker}</span>
//                             </li>
//                             <li >
//                                 <span>Date: {item.date}</span>
//                             </li>
//                             <li >
//                                 <span>Event: {item.event}</span>
//                             </li>
//                             <li >
//                                 <span>Surprise Sign : {item.surprise_sign}</span>
//                             </li>
//                             <li >
//                                 <span>Surprise Magnitude: {item.surprise_magnitude}</span>
//                             </li>
//                             </div>

//                         ))}
//                     </ul>
//             </Grid>
//         );
//     }
// }
