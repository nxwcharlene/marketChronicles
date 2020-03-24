//get output from backend via API, display JSON, have to convert to Bokeh

import React, {component, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { useTable, useGroupBy, useFilters, useSortBy, useExpanded, usePagination } from 'react-table';

// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state


class MacroResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:8000/macro')
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

//render UI
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div>
                {items.map(item => (
                  <div style={{height:200}}>
                      <Card>
                        <CardHeader
                            title={item.date}
                            titleTypographyProps={{ align: 'left', variant:'body1'}}
                            style={{
                            backgroundColor: 'grey',
                            height: 20}}
                        />
                        <CardContent>
                          <ul>
                                <div key={item.id} style={{border:'0px solid'}}>
                                <li >
                                    <span>Ticker: {item.ticker}</span>
                                </li>
                                <li >
                                    <span>Date: {item.date}</span>
                                </li>
                                <li >
                                    <span>Event: {item.event}</span>
                                </li>
                                <li >
                                    <span>Surprise Sign : {item.surprise_sign}</span>
                                </li>
                                <li >
                                    <span>Surprise Magnitude: {item.surprise_magnitude}</span>
                                </li>
                                </div>

                          </ul>
                        </CardContent>
                      </Card>
                  </div>

                ))}
            </div>

        );
    }
}

export default MacroResults;




//const FunctionalComponent = () => {
//  const [result, setResult] = useState([]);
//  const [isLoading, setIsLoading] = useState(true);
//
//  useEffect(() => {
//    const fetchData = async () => {
//      const fetchResult = await API.get('/');
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
//  return (
//    <div>
//      <h1>This is rendered with a React Functional Component</h1>
//      <ul>{isLoading ? loadingMessage() : data()}</ul>
//    </div>
//  )
//}
//
//export default FunctionalComponent;






//ATTEMPT 1
//import React, {component} from "react"
//
//class MacroResult extends React.Component {
//    constructor(props) {
//        super(props);
//
//        this.state = {
//            resultsList: [],
//            isLoaded: false
//        };
//    }
//
//    componentDidMount() {
//        // Simple GET request using fetch, using random API as placeholder
//        fetch('https://jsonplaceholder.typicode.com/users')
//            .then(response => response.json())
//            .then(json =>
//                this.setState({
//                    resultsList: json,
//                    isLoaded: true,
//                })
//            }).catch((err) => {
//                console.log(err);
//            });
//    }
//
//    render() {
//
//        const { isLoaded, resultsList } = this.state;
//
//        if(!isLoaded)
//            return <div>Loading...</div>;
//
//        return (
//            <div className="card-body">
//                <ul>
//                    {resultsList.map(item => (
//                        <li key={item.id}>
//                            Name: {item.name}| Email: {item.email}
//                        </li>
//                    ))};
//                </ul>
//            </div>
//        );
//    }
//}
//


//export default MacroResult

// API with set headers at the back
//componentDidMount() {
//    // GET request using fetch with set headers
//    const headers = { 'Content-Type': 'application/json' }
//    fetch('https://api.npms.io/v2/search?q=react', { headers })
//        .then(response => response.json())
//        .then(data => this.setState({ totalReactPackages: data.total }));
//}