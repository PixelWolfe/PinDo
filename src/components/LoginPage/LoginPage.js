import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Grid, Button, TextField} from '@material-ui/core';
import Fade from 'react-reveal/Fade'

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
        <Grid container>
          <Grid item xs={12} align='center'>
            <div style={{backgroundColor: 'cyan'}}>
            {this.props.errors.loginMessage && (
              <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.loginMessage}
              </h2>
            )}
            <form onSubmit={this.login}>
              <h1>Login</h1>
              <div>
    
                <TextField
                  variant="filled"
                  label="username"
                  inputProps={{maxLength: 80}}
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </div>
              <div>
      
                  <TextField
                    variant="filled"
                    label="password"
                    inputProps={{maxLength: 1000}}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
        
              </div>
              <div>
                <Button type="submit" name="submit" variant="contained" color="primary">Log In</Button>
              </div>
              <br/>
              <br/>
            </form>
            
            <Button alignContent='right' size="small" variant="outlined" color="primary" onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}>Register</Button>

          </div>
          </Grid>
        </Grid>
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
