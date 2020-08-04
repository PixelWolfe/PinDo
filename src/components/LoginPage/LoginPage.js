import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Grid, Button, TextField} from '@material-ui/core';
import Fade from 'react-reveal/Fade'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Fade>

 
            <div style={{backgroundColor: 'lightgreen'}}>
              <Grid container justify='center' alignItems='center' alignContent='center'>
              
              <Grid xs={6} item align='center'>
                  <div>
                  {
                    this.props.errors.loginMessage && 
                    (<h2 className="alert" role="alert">{this.props.errors.loginMessage}</h2>)
                  }
                  <h1>Login</h1>
  
                  <TextField
                    variant="filled"
                    label="username"
                    inputProps={{maxLength: 80}}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  />
                  <br/>
                  <TextField
                    variant="filled"
                    label="password"
                    type='password'
                    inputProps={{maxLength: 1000}}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                  <br/>
                  <Button 
                    name="submit" 
                    variant="contained" 
                    color="primary" 
                    onClick={this.login}
                  >
                      Log In
                  </Button>
              
                    <br/>
                    <br/>
                  <Button 
                    alignContent='right' 
                    size="small" 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
                  >
                    Register
                  </Button>
              </div>
                
              </Grid>

              <Grid xs={6} item align='center'>
                  <div>
                    <img 
                      style={{
                        height: "500px",
                      }} 
                      src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg' 
                      alt="flower picture"
                    />
                  </div>
              </Grid>
            
              </Grid>
            </div>
    
      </Fade>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
