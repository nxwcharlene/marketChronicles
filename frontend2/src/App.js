import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
//import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//Pages
import MainPage from './pages/mainpage';
import MacroPage from './pages/macropage';
import EarningsPage from './pages/earningspage';
import EventsPage from './pages/eventspage';

class App extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage} />
                    <Route path ="/macro" component={MacroPage} />
                    <Route path ="/earnings" component={EarningsPage} />
                    <Route path ="/event" component={EventsPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;
