import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {Grid} from '@material-ui/core';
import '../NavHome/NavHome.css';
import PinDoIcon from '../../images/PinDo.png'

class NavProject extends Component{

  clearActiveProject = ()=>{
    console.log('Clearing active Project!');
    this.props.dispatch({type: 'SET_ACTIVE_PROJECT', payload : {project:[], notes:[], checklists:[], images:[], tasks:[]}})
  }   

  render(){
    return(
      <Grid item xs={12}>
      <div className="nav" >
        <Link to="/home" onClick={this.clearActiveProject} style={{textDecoration: 'none', color: 'black', paddingLeft: '15px'}}>
          <span style={{display: 'inline-flex', width: '10%'}}>
              <h2 style={{display: 'inline-flex'}}>PinDo</h2>
              <img src={PinDoIcon} style={{height: '50px', paddingTop: '5px'}}></img>
          </span>
        </Link>
        <div className="nav-right">
          <Link className="nav-link" to="/home" onClick={this.clearActiveProject}>
            {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
           Projects
          </Link>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {
            this.props.reduxState.user.id && (
            <>
              <LogOutButton className="nav-link"/>
            </>
            )
          }
        </div>
      </div>
      </Grid>
    )
  }
}

const mapStateToProps = (reduxState)=>({
  reduxState
})
  
export default connect(mapStateToProps)(NavProject);
