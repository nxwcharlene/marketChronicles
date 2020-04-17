//change name to pricemovementchart.js after changing refs in other files//

import React, {Component} from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';

var Chart1 = CanvasJSReact.CanvasJS;
var StockChart1 = CanvasJSReact.CanvasJSChart;

class ResultChart extends Component {

    constructor(props) {
      super(props);
      this.state = {dataPoints: []};
    }

    render() {

        const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled: true,
            height: 150,
            title: {
                text: "Stock Price of ".concat(this.props.ticker),
                horizontalAlign:"center"
            },
            axisX:{
                valueFormatString: "DD MMM YYYY",
                crosshair: {
                    enabled: false,
                    snapToDataPoint: true,
                }
            },
            axisY: {
                title: "Close Price (USD)", // to change
                includeZero: false,
                valueFormatString: "$##0.00",
                crosshair: {
                    enabled: false,
                    snapToDataPoint: true,
                    labelFormatter: function(e) {
                        return "$" + Chart1.formatNumber(e.value, "##0.00"); // to change
                    }
                }
            },
            data: [{
                type: "line",
                markerType:"none",
                lineColor:"DarkCyan",
                xValueFormatString: "DD MMM YYYY",
                yValueFormatString: "$##0.00", // to change
                dataPoints: this.state.dataPoints
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
//        const baseurl="https://www.quandl.com/api/v3/datasets/WIKI/"
//        const ticker=this.props.ticker
//        const proxyurl = "https://cors-anywhere.herokuapp.com/"; //to avoid CORS error
        var date=new Date(this.props.date);
        console.log(this.props.date)
//        var start_date_year=''+(date.getFullYear()-1); //to provide data starting 1 year ago
//        var start_date_month=''+ (date.getMonth()+1); //gives one month before so need to +1
//        var start_date_day=''+date.getDate();
//        if (start_date_month.length < 2)
//            start_date_month = '0' + start_date_month;
//        if (start_date_day.length < 2)
//            start_date_day = '0' + start_date_day;
//        var start_date_formatted=[start_date_year,start_date_month,start_date_day].join('-');
//        var end_date_year=''+(date.getFullYear()+1);
//        var end_date_month=start_date_month;
//        var end_date_day=start_date_day;
//        var end_date_formatted=""
//        if (parseInt(end_date_year)>2018)
//            end_date_formatted="2018-03-27";
//        if (parseInt(end_date_year)<=2018)
//            end_date_formatted=[end_date_year,end_date_month,end_date_day].join('-');
//        var fullurl=baseurl.concat(ticker,"/data.json?order=asc&column_index=4&","start_date=",start_date_formatted,"&end_date=",end_date_formatted,"&api_key=dFvSTC2myD1ts7eJq8VD");
        var self=this;
        var chartdata = JSON.parse(this.props.chartprices);
        var temp = []
        for (var i = 0; i < chartdata.length; i++) {
            temp.push({
                x: new Date(chartdata[i][0]),
                y: chartdata[i][1]
            })
        self.setState({dataPoints: temp});
        chart.render();
        }
//        fetch(fullurl)
//        .then(function(response) {
//            return response.json();
//        })
//        .then(function(data) {
//            var temp = []
//            for (var i = 0; i < data.dataset_data.data.length; i++) {
//                temp.push({
//                    x: new Date(data.dataset_data.data[i][0]),
//                    y: data.dataset_data.data[i][1]
//                });
//            }
//            self.setState({dataPoints: temp});
//            chart.render();
//            console.log(fullurl)
//        });
    }
}
export default ResultChart;

