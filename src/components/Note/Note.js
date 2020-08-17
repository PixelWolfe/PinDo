import React, {Component} from 'react';

import {connect} from 'react-redux';
import { TextField, Checkbox, Button, IconButton, InputAdornment} from '@material-ui/core';
import Draggable from 'react-draggable';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

class Note extends Component{
    state={
        id: this.props.note_id,
        project_id: this.props.project_id,
        title: this.props.title,
        text: this.props.text,
        edit_mode: false,
        color_id: this.props.color_id,
        color: this.props.color,
        selected_value: this.props.color        
    }


    updatePosition = (e, data, id, type) => {
        this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: this.state.id, project_id: this.state.project_id, type: type}});
    }


    calculateZIndex(e) {
            const newIndex = this.props.reduxState.highestZIndex + 1
            e.currentTarget.style.zIndex = newIndex;
            this.props.dispatch({type: 'UPDATE_ZINDEX', 
                payload: {z_index: newIndex, type: 'note', id: this.state.id, project_id: this.state.project_id, color_id: this.state.color_id}});
            this.props.dispatch({type: 'SET_HIGHEST_ZINDEX', payload: newIndex});
          }
    
    makeEditable = ()=>{
        this.setState({
            ...this.state,
            edit_mode: !this.state.edit_mode,
            selected_value: this.state.color
        })
    }
        
    updateNote = ()=>{
        //check to see if old details match new, if not send update request
        if(this.props.text === this.state.text && this.props.title === this.state.title && this.state.color === this.state.selected_value){
            console.log('No update made, details were not changed.');
            this.makeEditable();
            return;
        }
        console.log('Updating Note!');
        this.props.dispatch({type: 'UPDATE_NOTE', payload: {id: this.props.note_id, project_id: this.props.project_id, title: this.state.title, text: this.state.text, color_id: this.state.color_id}});
        this.setState({
            ...this.state,
            color: this.state.selected_value,
            edit_mode: !this.state.edit_mode,
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    
    deleteNote = ()=>{
        this.props.dispatch({type: 'DELETE_NOTE', payload: {id: this.props.note_id, project_id: this.props.project_id}});
    }


    handleCheck = (event)=>{
        let color_id;
        switch(event.target.value){
            case 'yellow':
                color_id = '1';
                break;
            case 'blue':
                color_id = '2';
                break;
            case 'cyan':
                color_id = '3';
                break;
            case 'purple':
                color_id = '4';
                break;
            case 'red':
                color_id ='5';
                break;
            case 'green':
                color_id = '6';
                break;
            default:
                color_id = '1';
        }

        this.setState({
            ...this.state,
            selected_value: event.target.value,
            color_id: color_id
        })
    }
    render(){
        return(
            <Draggable
                handle='.handle'
                onStop={(e,data)=>this.updatePosition(e, data, this.state.id, "note")}
                defaultPosition={{x: this.props.x, y: this.props.y}}
                onStart={(e)=>this.calculateZIndex(e)}
                bounds='parent'
                scale={Number(this.props.reduxState.zoomReducer.zoomValue)}
            >
            {
                !this.state.edit_mode ? 
                <div className={`sticky-note handle ${this.state.color}`}>
                    <span style={{float: 'right'}}>
                        <IconButton aria-label="edit" size="small"
                            onClick={this.makeEditable}>
                            <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                    </span>
                    <br/>
                    <br/>
                    <h3 style={{margin:'0px', cursor: 'default'}}>
                        {
                            this.state.title === ''?
                            'Click the edit icon upper right!'
                            :
                            this.state.title
                        }
                    </h3>
                    <p className='note-text' style={{cursor: 'default'}}>
                    {
                        this.state.text === ''?
                        'Fill in the text and you\'re set!'
                        :
                        this.state.text
                    }
                    </p>
                </div>
                    : 
                <div className={`sticky-note ${this.state.selected_value}`}> 
                    <div style={{textAlign: 'left'}}>
                        <span>
                            <Button variant='contained' color='secondary' size='small' onClick={this.deleteNote} style={{borderRadius: '0px', fontSize: '10px', backgroundColor: '#b11f1f'}}>
                                Delete <DeleteForeverTwoToneIcon fontSize="small"/>
                            </Button>
                        </span>
                        <span style={{float: 'right'}}>
                            <Button size='small' onClick={this.makeEditable} style={{borderRadius: '0px 0px 0px 5px'}}>
                                Back
                                <ArrowForwardIcon fontSize="small"/>
                            </Button>
                        </span>
                    </div>
                    <br/>
                    <br/>
                <h4 style={{margin: 0, marginBottom: '5px'}}>Edit this note below</h4>
                <h5 style={{margin: 0, marginBottom: '5px'}}>Press SAVE CHANGES when finished</h5>
                <TextField
                    size='small'
                    variant="filled"
                    label="Title"
                    placeholder='Click the edit icon upper right!'
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
                    placeholder="Fill in the text and you're set!"
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
                <div style={{backgroundColor: 'rgb(243, 235, 219)', minHeight: '30px', display: 'flex',
                alignItems: 'center', width: '230px', margin: 'auto', borderRadius:'3px', marginTop: '10px'}}>
                <span style={{marginLeft: '5px'}}>Color:{'\u00A0'}</span>
                <Checkbox onChange={this.handleCheck} value='yellow' checked={this.state.selected_value === 'yellow'} 
                    style={{backgroundColor: '#ffff88', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
                <Checkbox onChange={this.handleCheck} value='blue' checked={this.state.selected_value === 'blue'} 
                    style={{backgroundColor: '#a2e5ff', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
                <Checkbox onChange={this.handleCheck} value='cyan' checked={this.state.selected_value === 'cyan'} 
                    style={{backgroundColor: '#88ffe1', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
                <Checkbox onChange={this.handleCheck} value='purple' checked={this.state.selected_value === 'purple'} 
                    style={{backgroundColor: '#d7beff', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
                <Checkbox onChange={this.handleCheck} value='red' checked={this.state.selected_value === 'red'} 
                    style={{backgroundColor: '#ff9c9c', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
                <Checkbox onChange={this.handleCheck} value='green' checked={this.state.selected_value === 'green'}
                    style={{backgroundColor: '#90ee90', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
            </div>
                <br/>
                <Button variant='contained' color='secondary' size='small' onClick={this.updateNote} 
                    style={{backgroundColor: '#3c4454'}}>
                    Save Changes<SaveTwoToneIcon fontSize="small"/>
                </Button>
                <br/>
                <br/>
                </div>
                
            }   
        </Draggable>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(Note);