import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
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
      {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
      {
        props.user.id ? 
          <LogOutButton className="nav-link"/>
          :
          <Link className="nav-link" to="/home">
            Login / Register
          </Link>
          
      }
    </div>
  </div>
  </Grid>
  
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavHome);
