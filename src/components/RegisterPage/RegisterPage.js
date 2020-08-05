import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TextField, Button, Grid} from '@material-ui/core'
import Fade from 'react-reveal/Fade'
import InputAdornment from '@material-ui/core/InputAdornment';

import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

import NavHome from '../NavHome/NavHome';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email_address: '',
    reenter_password: ''
  };

  registerUser = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.reenter_password){
      
    }
    if (this.state.username && this.state.password && this.state.email_address) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email_address: this.state.email_address
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
        <NavHome/>
        <Fade delay={200}>
      
      <Grid container justify='center'>
      <Grid item xs={0} md={1} lg={2}/>
      <Grid item xs={12} md={10} lg={8}>

      <div style={{backgroundColor: 'lightgreen', marginTop: '5%', borderRadius: '20px', minWidth: '80%', padding: '3%'}}>
        <Grid container justify='center' alignItems='center' alignContent='center' spacing={4}>
          <Grid item xs={5} align='center'>
            <div style={{backgroundColor: 'lightblue',  height: '80%', borderRadius: '20px'}}>
            {
              this.props.errors.registrationMessage && (<h2 className="alert" role="alert">{this.props.errors.registrationMessage}</h2>)
            }
              <br/>
              <h1>Register User</h1>
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
                <TextField
                  style={{width: '60%', marginTop: '10px'}}
                  size='small'
                  variant="filled"
                  label="Re-Enter Password"
                  type='password'
                  inputProps={{maxLength: 1000}}
                  value={this.state.reenter_password}
                  onChange={this.handleInputChangeFor('reenter_password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockTwoToneIcon/>
                      </InputAdornment>
                    ),
                }}/>
              <br/>
                <TextField
                  style={{width: '60%', marginTop: '10px'}}
                  size='small'
                  variant="filled"
                  label="Email Address"
                  type='text'
                  inputProps={{maxLength: 1000}}
                  value={this.state.email_address}
                  onChange={this.handleInputChangeFor('email_address')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailTwoToneIcon/>
                      </InputAdornment>
                    ),
                  }}
                />
              <br/>
              <br/>
                <Button 
                  style={{marginTop: '10px'}}
                  variant="contained" 
                  color="primary" 
                  onClick={this.registerUser}
                >
                  Register
                </Button>
              <br/>
              <br/>

              <Button 
                size="small" 
                variant="outlined" 
                color="primary" 
                onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
              >
                Log In
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
            </Grid>
          <Grid item xs={0} md={1} lg={2}/>
        </Grid>
      </Fade>
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

export default connect(mapStateToProps)(RegisterPage);

