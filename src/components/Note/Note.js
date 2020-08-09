import React, {Component} from 'react';
import {connect} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import Draggable from 'react-draggable';
import InputAdornment from '@material-ui/core/InputAdornment';

import './note.css';
import { TextField } from '@material-ui/core';



class Note extends Component{
    state={
        title: this.props.title,
        text: this.props.text,
        x: this.props.x,
        y: this.props.y,
        id: this.props.note_id,
        edit_mode: false
    }

    updatePosition = (e, data, id, type) => {
        console.log('In updatePosition for note for note:', id)
        console.log('x:', data.x, 'y:', data.y, 'id', id);
        console.log(e, data)
        this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: id, project_id: this.props.project_id, type: type}});
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
        
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    
    render(){
        return(
            <>
            <Draggable
                onStop={(e,data)=>this.updatePosition(e, data, this.props.note_id, "note")}
                defaultPosition={{x: this.props.x, y: this.props.y}}
                onStart={this.onStart}
                bounds='parent'
            >
            <div className='sticky-note green'> 
            {
                !this.state.edit_mode ? 
                <>
                    <span style={{float: 'right'}}>
                        <IconButton aria-label="edit" size="small"
                            onClick={this.makeEditable}>
                            <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                    </span>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.text}</p>
                </>
                    : 
                <>  
                
                    <IconButton aria-label="edit"  size="small">
                    <EditTwoToneIcon fontSize="small"
                        onClick={this.makeEditable}/>
                    </IconButton>
                    <IconButton aria-label="delete"  size="small">
                    <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                    <br/>
                    <br/>
                    <br/>
                <TextField
                    size='small'
                    variant="filled"
                    label="Title"
                    value={this.state.title}
                    type='text'
                    onChange={this.handleInputChangeFor('title')}
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
                    inputProps={{maxLength: 40}}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <DescriptionTwoToneIcon/>
                        </InputAdornment>
                    ),
                    }}
                />
                </>
            }   
        </div>
        </Draggable>
        </>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(Note);