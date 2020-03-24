//get output from backend via API, display JSON, have to convert to Bokeh

import React from 'react';

// React js fetch: Use componentDidMount to fetch json array of objects from given url and update state

class EarningsResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:8000/earnings/earnings-get')
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
            </div>
        );

    }

}

export default MacroResults;
