import React, {Component} from 'react';
import {connect} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import Draggable from 'react-draggable';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardTwoTone';

import {Button} from '@material-ui/core'
import './note.css';
import { TextField } from '@material-ui/core';



class Note extends Component{
    state={
        title: this.props.title,
        text: this.props.text,
        edit_mode: false
    }

    updatePosition = (e, data, id, type) => {
        console.log('In updatePosition for note for note:', id)
        console.log('x:', data.x, 'y:', data.y, 'id', id);
        this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: this.props.note_id, project_id: this.props.project_id, type: type}});
    }

    onStart(e) {
        console.log('onstart e event',e);
    }
    
    makeEditable = ()=>{
        this.setState({
            ...this.state,
            edit_mode: !this.state.edit_mode
        })
    }
        
    updateNote = ()=>{
        //check to see if old details match new, if not send update request
        if(this.props.text === this.state.text && this.props.title === this.state.title){
            console.log('No update made, details were not changed.');
            this.makeEditable();
            return;
        }
        console.log('Updating Note!');
        this.props.dispatch({type: 'UPDATE_NOTE', payload: {id: this.props.note_id, project_id: this.props.project_id, title: this.state.title, text: this.state.text}});
        this.makeEditable();
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    
    deleteNote = ()=>{
        this.props.dispatch({type: 'DELETE_NOTE', payload: {id: this.props.note_id, project_id: this.props.project_id}});
    }

    render(){
        return(
            <>
            <Draggable
                handle='.handle'
                onStop={(e,data)=>this.updatePosition(e, data, this.props.note_id, "note")}
                defaultPosition={{x: this.props.x, y: this.props.y}}
                onStart={this.onStart}
                bounds='parent'
            >
            {
                !this.state.edit_mode ? 
                <div className='sticky-note green handle'>
                    <span style={{float: 'right'}}>
                        <IconButton aria-label="edit" size="small"
                            onClick={this.makeEditable}>
                            <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                    </span>
                    <br/>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.text}</p>
                </div>
                    : 
                <div className='sticky-note green'> 
                    <span style={{float: 'right'}}>
                        <Button size='small' onClick={this.updateNote}>
                            Back
                            <ArrowForwardIcon fontSize="small"/>
                        </Button>
                    </span>
                    <br/>
                    <br/>
                <h4 style={{margin: 0, marginBottom: '5px'}}>Edit this note below</h4>
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
                    label="Text"
                    value={this.state.text}
                    type='text'
                    onChange={this.handleInputChangeFor('text')}
                    multiline
                    rows={3}
                    style={{width: '80%', marginTop: '10px'}}
                    inputProps={{maxLength: 1000}}
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
                <h4 style={{margin: 0}}>Remove this note?</h4>
                <Button variant='contained' color='secondary' size='small' onClick={this.deleteNote}>
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

export default connect(mapStateToProps)(Note);