//get output from backend via API, display JSON, have to convert to Bokeh
// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state
import React from 'react';
import Grid from '@material-ui/core/Grid';

class EarningsResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:8000/earnings')
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
            <Grid container spacing={2} justify= "space-evenly" alignItems="center">
                    <ul>
                        {items.map(item => (
                            <div key={item.id} style={{border:'1px solid'}}>
                            <li>
                                <span>{item.id}</span>
                            </li>
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

                        ))}
                    </ul>
            </Grid>
        );
    }
}

export default EarningsResults;
