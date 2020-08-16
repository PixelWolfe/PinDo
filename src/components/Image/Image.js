import React, {Component} from 'react';

import {connect} from 'react-redux';
import Draggable from 'react-draggable';
import {Button, Checkbox, TextField, InputAdornment, IconButton} from '@material-ui/core'
import defaultImage from '../../images/GetCrafting.jpg';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

class Image extends Component{
    state={
        id: this.props.image_id,
        project_id: this.props.project_id,
        title: this.props.title,
        url: this.props.url,
        edit_mode: false,
        color_id: this.props.color_id,
        color: this.props.color,
        selected_value: this.props.color 
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
            edit_mode: !this.state.edit_mode,
            selected_value: this.state.color
        })
    }
        
    updateImage = ()=>{
        //check to see if old details match new, if not send update request
        if(this.props.title === this.state.title && this.props.url === this.state.url && this.props.selected_value === this.state.color){
            console.log('No update made, details were not changed.');
            this.makeEditable();
            return;
        }
        console.log('Updating Note!');
        this.props.dispatch({type: 'UPDATE_IMAGE', payload: {id: this.state.id, color_id: this.state.color_id, project_id: this.state.project_id, title: this.state.title, url: this.state.url}});
        this.setState({
            ...this.state,
            color: this.state.selected_value,
            edit_mode: !this.state.edit_mode,
        })
    }





    //  onChange ={this.handleInputChangeFor('url')}

    
                            //url
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
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
                scale={Number(this.props.reduxState.zoomReducer.zoomValue)}
                >
                    {
                        !this.state.edit_mode?
                            
                                <div className={`sticky-note handle ${this.state.color}`}>
                                    <span style={{float: 'right'}}>
                                        <IconButton aria-label="edit" size="small"
                                            onClick={this.makeEditable}>
                                            <EditTwoToneIcon fontSize="small" />
                                        </IconButton>
                                    </span>
                                    <br/>
                                    <br/>
                                    <h3 style={{margin:'0px'}}>
                                    {
                                        this.state.title === ''?
                                        'Click the edit icon upper right!'
                                        :
                                        this.state.title
                                    }
                                    </h3>
                                    <img draggable='false' style={{height: '250px', userSelect: 'none'}} src={(this.state.url || defaultImage)}/>
                                </div>
                            
                            :
                                <div className={`sticky-note ${this.state.selected_value}`}>
                                <div style={{textAlign: 'left'}}>
                                    <span>
                                        <Button variant='contained' color='secondary' size='small' onClick={this.deleteImage} style={{borderRadius: '0px', fontSize: '10px', backgroundColor: '#b11f1f'}}>
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
                                    <h4 style={{margin: 0, marginBottom: '5px'}}>Edit this Image below</h4>
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
                                        variant='filled'
                                        label='Image URL'
                                        value={this.state.url}
                                        placeholder='Paste an image url here!'
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
                                    <Button variant='contained' color='secondary' size='small' onClick={this.updateImage} style={{backgroundColor: '#3c4454', marginBottom: '5px'}}>
                                        Save Changes<SaveTwoToneIcon fontSize="small"/>
                                    </Button>
                                    <br/>
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