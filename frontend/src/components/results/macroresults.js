//get output from backend via API, display JSON, have to convert to Bokeh

import React from 'react';
//import { component, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
//import macroresultsAPI from './macroresultsAPI';
import ResultChart from './macrochart.js';


class MacroResults extends React.Component {

  render() {
    const items = this.props.results
    console.log(typeof items)
    console.log(items)

    return (
      <div>
        {items.map(item => (
          <Card style={{ marginBottom: 15 }} key={item.id}>
            <CardHeader
              title={item.date}
              titleTypographyProps={{ align: 'left', variant: 'body1' }}
              style={{
                backgroundColor: 'grey',
                height: 20
              }}
            />

            <CardContent>
              <Grid container spacing={0} alignItems="flex-end">
                <Grid key={item.id} item xs={3} md={3} style={{ height:140, flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 30, paddingBottom: 30 }}>
                  <ul>
                    <div style={{ flex: 1, flexDirection: 'column', justifyContent: 'top' }}>
                      <li >
                        <b><span>Economic Release </span></b>
                      </li>
                      <li >
                        <div style={{height:10}} ><span> </span></div>
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

                <Grid key={item.id} item xs={3} md={3} style={{ height:140, flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 30, paddingBottom: 30 }}>
                  <ul>
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
                  </ul>
                </Grid>

                <Grid key={item.id} item xs={6} md={6}>
                  <ResultChart style={{ height: 10 }} ticker={item.ticker} date={item.date} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>

    );
  }
}

export default MacroResults;