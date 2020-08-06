import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import Popup from "reactjs-popup";
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';

class CreateProjectPopup extends Component{
    state = {
        title: '',
        image_url: '',
        description: '',
        open: this.props.reduxState.popupReducer.createProject.open,
      }

      componentDidUpdate(previousProps){
        if(previousProps.reduxState.popupReducer.createProject.open !== this.props.reduxState.popupReducer.createProject.open){
          this.setState({
            ...this.state,
            open: this.props.reduxState.popupReducer.createProject.open
          })
        }
      }

      handleClose=()=>{
        console.log('this is the state before close:', this.state)
        this.setState({
          ...this.state,
          title: '',
          image_url: '',
          description: ''
        })
        this.props.dispatch({type: 'SET_CREATE_PROJECT_POPUP_BOOLEAN', payload: {open: false}});
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
    
      handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }

    render(){
        return(
            <>
            
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
            </>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(CreateProjectPopup);