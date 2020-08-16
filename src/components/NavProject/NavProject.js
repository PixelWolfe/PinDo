import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {Grid, Slider} from '@material-ui/core';
import '../NavHome/NavHome.css';
import PinDoIcon from '../../images/PinDo.png'

import ZoomInTwoToneIcon from '@material-ui/icons/ZoomInTwoTone';
import ZoomOutTwoToneIcon from '@material-ui/icons/ZoomOutTwoTone';

class NavProject extends Component{

  state={
    zoomValue: '1'
  }

  marks = [
    {
      value: 25,
    },
    {
      value: 64,
    },
    {
      value: 103,
    },
  ];

  handleZoomChange = (event, newValue) => {
    let zoomValue = newValue/100

    if(this.state.zoomValue !== zoomValue)
    this.setState({
      ...this.state,
      zoomValue: zoomValue
    })
    this.props.dispatch({type: 'SET_ZOOM_VALUE', payload: {zoomValue}})
  };

  clearActiveProject = ()=>{
    console.log('Clearing active Project!');
    this.props.dispatch({type: 'SET_ACTIVE_PROJECT', payload : {project:[], notes:[], checklists:[], images:[], tasks:[]}});
    this.props.dispatch({type: 'SET_ZOOM_VALUE', payload: {zoomValue: '.25'}})
  }   

  render(){
    return(
      <Grid item xs={12}>
      <div className="nav" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Grid container>
        <Grid item xs={4} sm={4}>
          <Link to="/home" onClick={this.clearActiveProject} style={{textDecoration: 'none', color: 'black', paddingLeft: '15px'}}>
            <span style={{display: 'inline-flex', width: '10%'}}>
                <h2 style={{display: 'inline-flex'}}>PinDo</h2>
                <img src={PinDoIcon} style={{height: '50px', paddingTop: '5px'}}></img>
            </span>
          </Link>
        </Grid>
        <Grid item xs={3} sm={4}>
          <div style={{textAlign: 'center', backgroundColor: 'rgb(243, 235, 219)', height: '30px',paddingTop: '4px', borderRadius: '5px', marginTop: '19px'}}>
              <span style={{maxWidth: '85%'}}>
              <ZoomOutTwoToneIcon /> 
              {'\u00A0'} 
                <Slider
                  style={{maxWidth: '50%'}}
                  defaultValue={25}
                  aria-labelledby="zoom-slider"
                  marks={this.marks}
                  steps={13}
                  min={25}
                  max={103}
                  onChange={this.handleZoomChange}
                />
                {'\u00A0'}
              <ZoomInTwoToneIcon/>
              </span>
              
              
          </div>
        </Grid>
        <Grid item xs={5} sm={4}>
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
        </Grid>
        </Grid>
      </div>
      </Grid>
    )
  }
}

const mapStateToProps = (reduxState)=>({
  reduxState
})
  
export default connect(mapStateToProps)(NavProject);
