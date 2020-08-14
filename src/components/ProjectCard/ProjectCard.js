import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import Swal from 'sweetalert2';
import InputAdornment from '@material-ui/core/InputAdornment';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import {withRouter} from 'react-router-dom';

class ProjectCard extends Component{
    state = {
        project_id: this.props.project_id,
        title: this.props.title,
        image_url: this.props.image_url,
        description: this.props.description,
        isFlipped: false
    }

    flipCard = ()=>{
        this.setState({
          ...this.state,
          isFlipped: !this.state.isFlipped
        })
      }

    backPressed = ()=>{
      this.props.dispatch({
        type: 'UPDATE_PROJECT', payload: {project_id: this.state.project_id,
        title: this.state.title, image_url: this.state.image_url, description: this.state.description}})
      this.flipCard();
    }

    deleteProject= ()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this project!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          )
          this.props.dispatch({type:'DELETE_PROJECT', payload:{project_id: this.state.project_id}});
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your project is safe :)',
            'error'
          )
        }
      })
    }

    updateProject= ()=>{
      if(!this.state.title){
        Swal.fire('Please include a title for your project!');
        return;
      }
      else if(!this.state.image_url){
        Swal.fire('Please include an image for your project!');
        return;
      }
      let payload = {title:this.state.title, image_url: this.state.image_url, description: this.state.description};
      console.log('dispatching to UPDATE_PROJECT with:', payload)
      this.props.dispatch({type: 'UPDATE_PROJECT', payload});
    }

    goToProject=()=>{
      this.props.history.push(`/info/${this.state.project_id}`);
    }
  
    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    }

    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection='horizontal'>

              <Grid item style={{borderRadius: '20px'}}>
                
                <div style={{borderRadius:'20px', backgroundColor: '#7ab2b3', border: '1px solid grey',boxShadow: '10px 6px 5px rgba(0, 0, 0, 0.153)', overflow: 'hidden'}}>
                    <Grid item align='right'>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.flipCard}
                      style={{borderRadius: '0 18px 0 0', backgroundColor:'lightgrey', borderWidth: '2px'}}
                    >
                      <EditTwoToneIcon/>
                    </Button>
                  </Grid>
                    <h2 style={{paddingLeft: '10px', paddingRight: '10px', marginTop: '5px', marginBottom: '5px'}}>{this.state.title}</h2>
                      <img 
                        
                        style={{cursor:'pointer',height: '250px', width:'250px', borderRadius: '20px', paddingLeft: '10px', paddingRight: '10px'}}
                        src={this.state.image_url}
                      />
                  <p style={{marginTop: '2px', marginBottom: '5px'}}>
                    {this.state.description}
                  </p>
                  <Button
                  startIcon={<MoreTwoToneIcon/>}
                  variant="contained"
                  color="primary"
                  style={{bottom: 0, backgroundColor: '#3c4454'}}
                  onClick={this.goToProject}
                >
                 Go To Project
                </Button>
                  <br/>
                  <br/>
                </div>
              </Grid> 

              <Grid item align='center' style={{backgroundColor: '#96c4c5', height: '400px', border: '1px solid grey',  borderRadius: '20px', boxShadow: '10px 6px 5px rgba(0, 0, 0, 0.143)'}}>
              
                  <Grid item align='right'>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.backPressed}
                      style={{borderRadius: '0 18px 0 0', backgroundColor:'lightgrey', borderWidth: '2px', boxShadow: 'inset 0 0 px #000000'}}
                    >
                      Back
                    </Button>
                  </Grid>
                  <h4 style={{marginBottom: '5px'}}>Update your project info below</h4>
                  <h5 style={{marginTop: '0px', marginBottom: '5px'}}>Press BACK when finished</h5>
                  <TextField 
                    style={{width: '80%'}}
                    size='small'
                    variant="filled"
                    label="Title"
                    value={this.state.title}
                    onChange={this.handleInputChangeFor('title')}
                    inputProps={{maxLength: 35}}
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
                  style={{width: '80%', marginTop: '10px'}}
                  size='small'
                  variant="filled"
                  label="Image Url"
                  value={this.state.image_url}
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
                    style={{width: '80%', marginTop: '10px'}}
                    size='small'
                    variant="filled"
                    label="Short Description (optional)"
                    value={this.state.description}
                    type='text'
                    onChange={this.handleInputChangeFor('description')}
                    multiline
                    rows={2}
                    inputProps={{maxLength: 100}}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionTwoToneIcon/>
                        </InputAdornment>
                      ),
                    }}
                  /> 
                  <br/>
                  <br/>
                  <h5 style={{marginTop: '8px', marginBottom: '5px'}}>Time to say goodbye?</h5>
            
                    <Button
                      startIcon={<DeleteForeverTwoToneIcon/>}
                      variant="contained"
                      color="secondary"
                      style={{backgroundColor: '#b11f1f'}}
                      onClick={this.deleteProject}
                    >
                      DELETE THIS PROJECT
                    </Button>
                    <br/>
                    <br/>
            
              </Grid> 
            </ReactCardFlip>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(withRouter(ProjectCard));