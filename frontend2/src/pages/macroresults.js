//get output from backend via API
// display JSON, have to convert to Bokeh

import React, {component} from "react"

class MacroResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resultsList: null
        };
    }

    componentDidMount() {
        // Simple GET request using fetch, using random API as placeholder
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=0H3OLF9PWVUMK66F')
            .then(response => response.json())
            .then(data => this.setState({ resultsList: data.total }));
    }

    render() {
        const { resultsList } = this.state;
        return (
            <div className="card text-center m-3">
                <div className="card-body">
                    Past Instances: {resultsList}
                </div>
            </div>
        );
    }
}

export default MacroResult


// API with set headers at the back
//componentDidMount() {
//    // GET request using fetch with set headers
//    const headers = { 'Content-Type': 'application/json' }
//    fetch('https://api.npms.io/v2/search?q=react', { headers })
//        .then(response => response.json())
//        .then(data => this.setState({ totalReactPackages: data.total }));
//}