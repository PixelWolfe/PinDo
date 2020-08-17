import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class LogOutButton extends Component{

  clearActiveProject = ()=>{
    console.log('Clearing active Project!');
    this.props.dispatch({type: 'SET_ACTIVE_PROJECT', payload : {project:[], notes:[], checklists:[], images:[], tasks:[]}})
  }   

  logout = ()=>{
    this.clearActiveProject();
    this.props.dispatch({type: 'LOGOUT'});
    this.props.dispatch({type: 'SET_ZOOM_VALUE', payload: {zoomValue: '.64'}})
  }

  render(){
    return(
      <Link className="nav-link" to="/home" onClick={this.logout}>
      Log Out
      </Link>
    )
  }

}

const mapStateToProps = (reduxState)=>({
  reduxState
})
// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect(mapStateToProps)(LogOutButton);
