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
import InputAdornment from '@material-ui/core/InputAdornment';

import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';



class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount(){

  }

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
      <Fade delay={200}>

 
            <div style={{backgroundColor: 'lightgreen', marginTop: '5%', borderRadius: '20px', minWidth: '100%', padding: '3%'}}>
              <Grid container justify='center' alignItems='center' alignContent='center' spacing={4}>
              
              <Grid xs={5} item align='center'>
                  <div style={{backgroundColor: 'lightblue', height: '80%', borderRadius: '20px'}}> 
                  {
                    this.props.errors.loginMessage && 
                    (<h2 className="alert" role="alert">{this.props.errors.loginMessage}</h2>)
                  }
                  <br/>
                  <h1>Login</h1>
  
                  <TextField 
                    style={{width: '60%'}}
                    size='small'
                    variant="filled"
                    label="Username"
                    
                    inputProps={{maxLength: 80}}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br/>
                  <TextField
                    style={{width: '60%', marginTop: '10px'}}
                    size='small'
                    variant="filled"
                    label="Password"
                    type='password'
                    inputProps={{maxLength: 1000}}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockTwoToneIcon/>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br/>
                  <Button 
                    style={{marginTop: '10px'}}
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
                    align='right'
                    size="small" 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
                  >
                    New User
                  </Button>
                  <br/>
                  <br/>
              </div>
                
              </Grid>
              
              <Grid xs={7} item align='center'>
                  <div>
                  
              
                    
                      <Fade>
                        <img
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          width: '100%',
                          borderRadius: '20px'
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Ailurus_fulgens_-_Syracuse_Zoo.jpg"
                        alt="Red Panda"
                        />
                      </Fade>
                      
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
