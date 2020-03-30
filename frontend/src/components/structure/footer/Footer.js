import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
//import StickyFooter from 'react-sticky-footer';

function Copyright() {
  return (
    <div variant="body2" style={{ color:"grey" }} align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Market Chronicles
      </Link>{' '}
      {new Date().getFullYear()}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundSize: 'cover',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[900],
    borderTop: `0px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    position: "fixed",
    bottom: 0,
  },
}));


function Footer(){
  const classes = useStyles();
      return (
          <Container maxWidth="xl" component="footer" className={classes.footer}>
            <Box mt={0}>
              <Copyright />
            </Box>
          </Container>
      );
}

export default Footer;
