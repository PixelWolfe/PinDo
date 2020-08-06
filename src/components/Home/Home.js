import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import NavHome from '../NavHome/NavHome';
import Fade from 'react-reveal/Fade';

import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Popup from "reactjs-popup";

import InputAdornment from '@material-ui/core/InputAdornment';


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
      open: false
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  createProject= ()=>{

    if(!this.state.title){
      alert('Please include a title for your project!');
      return;
    }
    else if(!this.state.image_url){
      alert('Please include an image for your project!');
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
        <br/>
        <br/>
   
        <div style={{minheight: '100vh', backgroundColor: 'green'}}>
        <Fade delay={200}>
        <Grid container justify='center' alignItems='center' alignContent='center'>

          <Grid item xs={5} sm={4} md={3} lg={2} align='center'>
          <div>
            {JSON.stringify(this.state)}
          </div>
          <Button 
            startIcon={<AddBoxTwoToneIcon/>}
            variant='contained' 
            color='primary' 
            style={{ marginTop: '0px'}}
            onClick={()=>{
              this.setState({
                ...this.state,
                open: true
              })
              console.log("modal closed ");
            }}
            >
            Create a Project
          </Button> 
          </Grid>
        </Grid>
            
        <Grid container justify='center' alignItems='center' alignContent='center'> 
        <Popup open={this.state.open} 
            position="bottom center"
            modal
            isOpen={this.state.open}
            onClose={()=>this.handleClose()}
            >

          <Grid item align='center' xs={10}>
            <div>
              <h1>It's happening!</h1>
              <h4 style={{margin: 0}}>Let's get this project started!</h4>
                <br/>
              <TextField 
              style={{width: '60%'}}
              size='small'
              variant="filled"
              label="Title"
              onChange={this.handleInputChangeFor('title')}
              inputProps={{maxLength: 80}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleTwoToneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <br/>
            <TextField
              style={{width: '60%', marginTop: '10px'}}
              size='small'
              variant="filled"
              label="Image Url"
              type='text'
              onChange={this.handleInputChangeFor('image_url')}
              inputProps={{maxLength: 1000}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddPhotoAlternateTwoToneIcon/>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
                style={{width: '60%', marginTop: '10px'}}
                size='small'
                variant="filled"
                label="Description (optional)"
                type='text'
                onChange={this.handleInputChangeFor('description')}
                multiline
                rows={5}
                inputProps={{maxLength: 250}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionTwoToneIcon/>
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
              onClick={()=>{
                this.createProject();
              }}
            >    
              Create Project
            </Button>

          </div>
          </Grid>
          
      </Popup>



         {this.props.reduxState.project?
          this.props.reduxState.project.map((project)=>
          
          <Grid key={project.id} item align='center' xs={5} sm={4} md={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <Grid item align='right'>
              <Button
                  startIcon={<MoreTwoToneIcon/>}
                  variant="outlined"
                  color="primary"
                  style={{backgroundColor:'rgb(247, 242, 171)'}}
               >
                  Description
                </Button>
            </Grid>
            <div>
              <h1>{project.title}</h1>
                <img 
                  style={{width:'100%'}}
                  src={project.image_url}
                />
            </div>
          </Grid>
         
         ):
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
