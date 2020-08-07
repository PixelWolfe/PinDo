import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import Swal from 'sweetalert2';
import InputAdornment from '@material-ui/core/InputAdornment';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

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
  
    handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
    }

    render(){
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection='horizontal'>

              <Grid item style={{height: '400px'}}>
                <div style={{borderRadius:'20px', backgroundColor: 'white'}}>
                  <div style={{overflow: 'hidden', maxHeight: '80%'}}>
                    <h2 style={{paddingLeft: '10px', paddingRight: '10px'}}>{this.state.title}</h2>
                      <img 
                        
                        style={{cursor:'pointer',position: 'relative', height:'200px', maxWidth:'100%', overflow: 'hidden', borderRadius: '20px', paddingLeft: '10px', paddingRight: '10px'}}
                        src={this.state.image_url}
                      />
                  </div>
                  <p>{this.state.description}</p>
                  <Button
                      startIcon={<EditTwoToneIcon/>}
                      variant="outlined"
                      color="primary"
                      onClick={this.flipCard}
                  >
                    Edit Details
                  </Button>
                  <br/>
                  <br/>
                </div>
              </Grid> 

              <Grid item align='center' style={{backgroundColor: 'white', height: '400px', borderRadius: '20px'}}>
                  <div>
                  <br/>
                  <br/>
                  <br/>
                  <TextField 
                    style={{width: '80%'}}
                    size='small'
                    variant="filled"
                    label="Title"
                    value={this.state.title}
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
                    <Button
                      startIcon={<MoreTwoToneIcon/>}
                      variant="outlined"
                      color="primary"
                      style={{backgroundColor:'rgb(247, 242, 171)', bottom: 0}}
                      onClick={this.flipCard}
                    >
                     Project
                    </Button>
                    <br/>
                    <br/>
                </div>
              </Grid> 
            </ReactCardFlip>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(ProjectCard);