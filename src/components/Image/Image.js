import React, {Component} from 'react';
import {connect} from 'react-redux';
import defaultImage from '../../images/GetCrafting.jpg';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import Draggable from 'react-draggable';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardTwoTone';

import './image.css';

import {Button} from '@material-ui/core'
import { TextField } from '@material-ui/core';


class Image extends Component{
    state={
        id: this.props.image_id,
        project_id: this.props.project_id,
        title: this.props.title,
        url: this.props.url,
        edit_mode: false
    }

    updatePosition = (e, data, id, type) => {
        console.log('In updatePosition for image', data);
        console.log('x:', data.x, 'y:', data.y, 'id', id);
        this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: this.state.id, project_id: this.state.project_id, type: type}});
    }


    calculateZIndex(e) {
            console.log('onstart zindex', e.currentTarget.style.zIndex);
            
            const newIndex = this.props.reduxState.highestZIndex + 1
            e.currentTarget.style.zIndex = newIndex;

            console.log('newIndex:', newIndex)
            this.props.dispatch({type: 'UPDATE_ZINDEX', payload: {z_index: newIndex, type: 'image', id: this.state.id, project_id: this.state.project_id}});
            this.props.dispatch({type: 'SET_HIGHEST_ZINDEX', payload: newIndex});
          }
    
    makeEditable = ()=>{
        this.setState({
            ...this.state,
            edit_mode: !this.state.edit_mode
        })
    }
        
    updateImage = ()=>{
        //check to see if old details match new, if not send update request
        if(this.props.title === this.state.title && this.props.url === this.state.url){
            console.log('No update made, details were not changed.');
            this.makeEditable();
            return;
        }
        console.log('Updating Note!');
        this.props.dispatch({type: 'UPDATE_IMAGE', payload: {id: this.state.id, project_id: this.state.project_id, title: this.state.title, url: this.state.url}});
        this.makeEditable();
    }





    //  onChange ={this.handleInputChangeFor('url')}

    
                            //url
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
      





    deleteImage = ()=>{
        this.props.dispatch({type: 'DELETE_IMAGE', payload: {id: this.state.id, project_id: this.state.project_id}});
    }

    render(){
        return(
            <>
                <Draggable
                handle='.handle'
                onStop={(e,data)=>this.updatePosition(e, data, this.state.id, "image")}
                defaultPosition={{x: this.props.x, y: this.props.y}}
                onStart={console.log('draggable this', this),(e)=>this.calculateZIndex(e)}
                bounds='parent'
                >
                    {
                        !this.state.edit_mode?
                            
                                <div className='image green handle'>
                                    <span style={{float: 'right'}}>
                                        <IconButton aria-label="edit" size="small"
                                            onClick={this.makeEditable}>
                                            <EditTwoToneIcon fontSize="small" />
                                        </IconButton>
                                    </span>
                                    <br/>
                                    <br/>
                                    <h4>{this.state.title}</h4>
                                    <img style={{height: '250px'}} src={(this.state.url || defaultImage)}/>
                                </div>
                            
                            :
                                <div className='image green'>
                                    <span style={{float: 'right'}}>
                                        <Button size='small' onClick={this.updateImage}>
                                            Back
                                            <ArrowForwardIcon fontSize="small"/>
                                        </Button>
                                    </span>
                                    <br/>
                                    <br/>
                                    <h4 style={{margin: 0, marginBottom: '5px'}}>Edit this Image below</h4>
                                    <h5 style={{margin: 0, marginBottom: '5px'}}>Press BACK when finished</h5>
                                    <TextField
                                        size='small'
                                        variant="filled"
                                        label="Title"
                                        value={this.state.title}
                                        type='text'
                                        onChange={this.handleInputChangeFor('title')}
                                        style={{width: '80%'}}
                                        inputProps={{maxLength: 40}}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TitleTwoToneIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    /> 
                                    <TextField
                                        size='small'
                                        variant="filled"
                                        label="Image URL"
                                        value={this.state.url}
                                        type='text'
                                        onChange={this.handleInputChangeFor('url')}
                                        multiline
                                        rows={3}
                                        style={{width: '80%', marginTop: '10px'}}
                                        inputProps={{maxLength: 15000}}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddPhotoAlternateTwoToneIcon/>
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h4 style={{margin: 0}}>Remove this Image?</h4>
                                    <Button variant='contained' color='secondary' size='small' onClick={this.deleteImage}>
                                        Delete <DeleteForeverTwoToneIcon fontSize="small"/>
                                    </Button>
                                </div>
                            
                    }
                </Draggable>
            </>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(Image);