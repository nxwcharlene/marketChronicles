import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from './pages/mainpage';
import MacroPage from './pages/macropage';
import EarningsPage from './pages/earningspage';
import PriceMovementPage from './pages/pricemovementpage';

class App extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage} />
                    <Route path ="/economic" component={MacroPage} />
                    <Route path ="/earnings" component={EarningsPage} />
                    <Route path ="/price_movement" component={PriceMovementPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;
