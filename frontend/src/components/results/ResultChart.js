//change name to pricemovementchart.js after changing refs in other files//

import React, {Component} from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';

var Chart1 = CanvasJSReact.CanvasJS;
var StockChart1 = CanvasJSReact.CanvasJSChart;

var dataPoints = [];

class ResultChart extends Component {

	render() {

		const options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			height: 150,
			title: {
				text: "Stock Price of ".concat("test")// to change to TICKER
			},
            axisX:{
				valueFormatString: "DD MMM YYYY",
				crosshair: {
					enabled: true,
                    snapToDataPoint: true,
                }
            },
            axisY: {
				title: "Close Price (in USD)", // to change
				includeZero: false,
				valueFormatString: "$##0.00",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
                        return "$" + Chart1.formatNumber(e.value, "##0.00"); // to change
                    }
                }
			},
			data: [{
				type: "line",
				xValueFormatString: "DD MMM",
				yValueFormatString: "$##0.00", // to change
				dataPoints: dataPoints
			}]
        }

		return (
		<div>
			<StockChart1 options = {options}
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        );
    }

    componentDidMount(){
		var chart = this.chart;
		fetch('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?order=asc&column_index=4&api_key=dFvSTC2myD1ts7eJq8VD')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.dataset_data.data.length; i++) {
				dataPoints.push({
					x: new Date(data.dataset_data.data[i][0]),
					y: data.dataset_data.data[i][1]
				});
			}
			chart.render();
		});
	}
}
export default ResultChart;



// DUMMY DATA 1
//
//dataPoints = [
//  { x: new Date("2018-03-01"), y: 85.3},
//  { x: new Date("2018-03-02"), y: 83.97},
//  { x: new Date("2018-03-05"), y: 83.49},
//  { x: new Date("2018-03-06"), y: 84.16},
//  { x: new Date("2018-03-07"), y: 84.86},
//  { x: new Date("2018-03-08"), y: 84.97},
//  { x: new Date("2018-03-09"), y: 85.13},
//  { x: new Date("2018-03-12"), y: 85.71},
//  { x: new Date("2018-03-13"), y: 84.63},
//  { x: new Date("2018-03-14"), y: 84.17},
//  { x: new Date("2018-03-15"), y: 85.12},
//  { x: new Date("2018-03-16"), y: 85.86},
//  { x: new Date("2018-03-19"), y: 85.17},
//  { x: new Date("2018-03-20"), y: 85.99},
//  { x: new Date("2018-03-21"), y: 86.1},
//  { x: new Date("2018-03-22"), y: 85.33},
//  { x: new Date("2018-03-23"), y: 84.18},
//  { x: new Date("2018-03-26"), y: 85.21},
//  { x: new Date("2018-03-27"), y: 85.81},
//  { x: new Date("2018-03-28"), y: 85.56},
//  { x: new Date("2018-03-29"), y: 88.15}
//]

// DUMMY DATA 2: Random JSON API
// https://canvasjs.com/data/gallery/react/nifty-stock-price.json
