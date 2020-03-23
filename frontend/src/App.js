import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from './pages/mainpage';
import MacroPage from './pages/macropage';
import EarningsPage from './pages/earningspage';
import PriceMovementPage from './pages/pricemovementpage';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

class App extends Component{
    render() {
        return(
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage} />
                    <Route path ="/economic" component={MacroPage} />
                    <Route path ="/earnings" component={EarningsPage} />
                    <Route path ="/price_movement" component={PriceMovementPage} />
                </Switch>
            </Router>
        </MuiPickersUtilsProvider>
        );
    }
}

export default App;
