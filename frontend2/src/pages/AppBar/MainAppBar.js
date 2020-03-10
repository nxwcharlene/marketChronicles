import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  body:{
    margin: 0,
    padding: 0,
    backgroundColor: 'blue',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(20),
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function MainAppBar() {
const classes = useStyles();
    return(
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    Market Chronicles
                </Typography>
            <nav>
                <Link variant="button" color="textPrimary" href="/economic" className={classes.link}>
                    ECONOMIC SURPRISE
                </Link>
                <Link variant="button" color="textPrimary" href="/earnings" className={classes.link}>
                    EARNINGS SURPRISE
                </Link>
                <Link variant="button" color="textPrimary" href="/price_movement" className={classes.link}>
                    PRICE MOVEMENT
                </Link>
            </nav>
            <Button href="#" color="primary" variant="outlined" className={classes.link}>
                Login
            </Button>
        </Toolbar>
        </AppBar>
    )
}