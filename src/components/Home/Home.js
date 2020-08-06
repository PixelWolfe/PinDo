import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import NavHome from '../NavHome/NavHome';
import ProjectCard from '../ProjectCard/ProjectCard';
import Fade from 'react-reveal/Fade';

import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Popup from "reactjs-popup";

import InputAdornment from '@material-ui/core/InputAdornment';

import ReactCardFlip from 'react-card-flip';

import Swal from 'sweetalert2';

import CreateProjectButton from '../CreateProjectButton/CreateProjectButton';
import CreateProjectPopup from '../CreateProjectPopup/CreateProjectPopup';

class Home extends Component {

  state = {
    title: '',
    image_url: '',
    description: '',
    open: null,
  }

  componentDidMount(){
    this.getProjects();
    console.log(this.props.reduxState)
  }

  handleClose=()=>{
    console.log('this is the state before close:', this.state)
    this.setState({
      ...this.state,
      title: '',
      image_url: '',
      description: '',
      open: false,
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  createProject= ()=>{
    if(!this.state.title){
      Swal.fire('Please include a title for your project!');
      return;
    }
    else if(!this.state.image_url){
      Swal.fire('Please include an image for your project!');
      return;
    }
    let payload = {title:this.state.title, image_url: this.state.image_url, description: this.state.description};
    console.log('dispatching to POST_PROJECT with:', payload)
    this.props.dispatch({type: 'POST_PROJECT', payload});
    
    console.log('Setting state back to ""');
    this.handleClose();
  }

  getProjects = ()=>{
    this.props.dispatch({type: 'FETCH_PROJECTS'});
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <>
        <NavHome/>
        <div style={{minheight: '100vh', backgroundColor: 'green'}}>
          <Fade delay={200}>
            <CreateProjectButton/>  
            <Grid container justify='center' alignItems='center' alignContent='center'> 
              <CreateProjectPopup/>
              {
                  this.props.reduxState.project?
                    this.props.reduxState.project.map((project)=>
                      <Grid key={project.id} item align='center' xs={5} sm={4} md={3} style={{margin: '15px'}}>
                        <ProjectCard title={project.title} image_url={project.image_url} description={project.description}/>
                      </Grid>)
                  :
                  <>
                  </>
                }
            </Grid>
          </Fade>
        </div>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
