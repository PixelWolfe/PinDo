import React, { Component } from 'react';

import { connect } from 'react-redux';
import {Grid, Button, TextField, InputAdornment} from '@material-ui/core';
import {Fade} from 'react-reveal';
import NavHome from '../NavHome/NavHome';

import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

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
      <>
      <div className='misty-forest'>
      <NavHome/>
      <Fade delay={200}>
        {/* Parent container */}
        <Grid container direction='row' justify='center'  alignItems='center' style={{minHeight: '65vh'}}>
            {/* Spacing for left of main container */}
            <Grid item md={1} lg={2}/>
            {/* Main container */}
            <Grid item xs={10} md={6} lg={5}>

            <div style={{backgroundColor: '#7ab2b3', marginTop: '5%', borderRadius: '20px',
             maxWidth:'100%', padding: '3%'}}>
              <Grid container justify='center' alignItems='center' alignContent='center' spacing={5}>

                {/* Login form grid 5/12 */}
                <Grid xs={12} item align='center'>
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
                      style={{marginTop: '10px', backgroundColor: '#3c4454'}}
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
                </Grid> {/* End Form Grid */}
              </Grid> {/* End content Grid */}
            </div>

            </Grid> {/* End main container  */}
            {/* Spacing on the */}
            <Grid item md={1} lg={2}/>
        </Grid>
      </Fade>
      </div>
      </>
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
