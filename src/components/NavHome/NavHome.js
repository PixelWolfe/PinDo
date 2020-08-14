import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {Grid} from '@material-ui/core';
import './NavHome.css';
import PinDoIcon from '../../images/PinDo.png';

const NavHome = (props) => (
  <Grid item xs={12}>
  <div className="nav">
 
  <Link to="/home" style={{textDecoration: 'none', color: 'black', paddingLeft: '15px'}}>
  <span style={{display: 'inline-flex', width: '10%'}}>
      <h2 >PinDo</h2>
      <img src={PinDoIcon} style={{height: '50px', paddingTop: '5px'}}></img>
  </span>
  </Link>
    <div className="nav-right">
      {
        props.user.id ? 
          <LogOutButton className="nav-link"/>
          :
          <Link className="nav-link" to="/home">
            Login / Register
          </Link>
          
      }
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
  </Grid>
  
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavHome);
