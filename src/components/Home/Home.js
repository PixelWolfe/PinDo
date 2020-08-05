import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import {Grid, Button, Icon} from "@material-ui/core";
import NavHome from '../NavHome/NavHome';
import Fade from 'react-reveal/Fade';

import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Popup from "reactjs-popup";

class Home extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <>
        <NavHome/>
        <body style={{height: '100vh', width: '100%', backgroundColor: 'green'}}>
        <Fade delay={200}>
        <Grid container justify='center' alignItems='center' alignContent='center'>
          <Grid item xs={5} sm={4} md={3} lg={2} align='center'>
            <Button startIcon={<AddBoxTwoToneIcon/>} variant='contained' color='primary' style={{ marginTop: '0px'}}>Create a Project</Button>
          </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center' alignContent='center'>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
        </Grid>
        </Fade>
      </body>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
