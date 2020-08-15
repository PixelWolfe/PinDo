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
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

import TaskCheckItem from '../TaskCheckItem/TaskCheckItem';
import {Button} from '@material-ui/core'
import { TextField, Checkbox } from '@material-ui/core';

class Checklist extends Component {

  state={
    id: this.props.list_id,
    project_id: this.props.project_id,
    title: this.props.title,
    tasks: this.props.tasks,
    edit_mode: false,
    add_task_mode: false,
    task_to_add: ''
}

setAddTaskMode = ()=>{
    console.log('in setAddTaskMode');
    this.setState({
        ...this.state,
        add_task_mode: !this.state.add_task_mode
    })
}

clearTask = ()=>{
    console.log('in clearTask');
    this.setState({
        ...this.state,
        task_to_add: '',
        add_task_mode: !this.state.add_task_mode
    })
}

updatePosition = (e, data, id, type) => {
    this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: this.state.id, project_id: this.state.project_id, type: type}});
}

calculateZIndex(e) {
        const newIndex = this.props.reduxState.highestZIndex + 1
        e.currentTarget.style.zIndex = newIndex;
        this.props.dispatch({type: 'UPDATE_ZINDEX', payload: {z_index: newIndex, type: 'list', id: this.state.id, project_id: this.state.project_id}});
        this.props.dispatch({type: 'SET_HIGHEST_ZINDEX', payload: newIndex});
      }

makeEditable = ()=>{
    if(this.state.add_task_mode === true){
        this.setState({
            ...this.state,
            edit_mode: !this.state.edit_mode,
            add_task_mode: !this.state.add_task_mode
        })  
    }
    else{
        this.setState({
            ...this.state,
            edit_mode: !this.state.edit_mode,
        })  
    }
}
    
updateChecklist = ()=>{
    //check to see if old details match new, if not send update request
    if(this.props.text === this.state.text && this.props.title === this.state.title){
        console.log('No update made, details were not changed.');
        this.makeEditable();
        return;
    }
    console.log('Updating Checklist!');
    this.props.dispatch({type: 'UPDATE_CHECKLIST_TITLE', payload: {id: this.props.list_id, project_id: this.props.project_id, title: this.state.title}});
    this.makeEditable();
}

addNewTask = ()=>{
    if(this.state.task_to_add !== ''){
        this.props.dispatch({type: 'CREATE_NEW_TASK', payload: {project_id: this.state.project_id, list_id: this.state.id, description: this.state.task_to_add, position: this.state.tasks.length}});



        this.setState({
            ...this.state,
            task_to_add: '',
            add_task_mode: !this.state.add_task_mode
        })
    }
}

handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

deleteChecklist = ()=>{
    this.props.dispatch({type: 'DELETE_CHECKLIST', payload: {id: this.props.list_id, project_id: this.props.project_id}});
}

  render() {
    return (
        <Draggable
        handle='.handle'
        onStop={(e,data)=>this.updatePosition(e, data, this.state.id, "list")}
        defaultPosition={{x: this.props.x, y: this.props.y}}
        onStart={(e)=>this.calculateZIndex(e)}
        bounds='parent'
        >
        {
          !this.state.edit_mode ? 
          <div className='checklist green handle'>
              <span style={{float: 'right'}}>
                  <IconButton aria-label="edit" size="small"
                      onClick={this.makeEditable}>
                      <EditTwoToneIcon fontSize="small" />
                  </IconButton>
              </span>
              <br/>
              <br/>
              <h3 style={{margin:'0px', marginTop: '5px', paddingBottom:'10px', borderBottom: '1px solid lightblue'}}>
              {
                this.state.title === ''?
                'Click the edit icon upper right!'
                :
                this.state.title
              }
              </h3>
              {
                  this.props.tasks.map(task=>
                    <TaskCheckItem task={task} key={task.id}/>)
              }
              {
                  this.state.add_task_mode ?
                  <>
                  <TextField    
                  size='small'
                  variant="filled"
                  label="Task Description"
                  placeholder='Add a task here'
                  value={this.state.task_to_add}
                  type='text'
                  onChange={this.handleInputChangeFor('task_to_add')}
                  style={{width: '80%', marginTop: '5px'}}
                  inputProps={{maxLength: 40}}
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <TitleTwoToneIcon />
                      </InputAdornment>
                  ),
                  }}/>
                  <br/>
                  <div style={{margin: '5px'}}>
                    <Button size='small' onClick={this.clearTask} variant='outlined' style={{backgroundColor: '#b11f1f', height: '25px', fontSize: '12px', minWidth: '40px'}}>
                        <AddBoxTwoToneIcon fontSize="small"/>
                        Cancel
                    </Button>
                    {'\u00A0'}
                    <Button size='small' onClick={this.addNewTask} variant='outlined' style={{backgroundColor: '#3c4454', color: 'white', height: '25px', fontSize: '12px'}}>
                        <AddBoxTwoToneIcon fontSize="small"/>
                        Add task
                    </Button>
                  </div>
                  
                  </>
                  :
                  <Button size='small' onClick={this.setAddTaskMode}>
                      <AddBoxTwoToneIcon fontSize="small"/>
                      Add task
                  </Button>
              }
              
          </div>
              : 
          <div className='checklist green'> 
            <div style={{textAlign: 'left'}}>
                <span>
                    <Button variant='contained' color='secondary' size='small' onClick={this.deleteChecklist} style={{borderRadius: '0px', fontSize: '10px', backgroundColor: '#b11f1f'}}>
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
          <h4 style={{margin: 0, marginBottom: '5px'}}>Edit this checklist below</h4>
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
          <div style={{backgroundColor: 'rgb(243, 235, 219)', minHeight: '30px', display: 'flex', alignItems: 'center', width: '230px', margin: 'auto', borderRadius:'3px', marginTop: '10px'}}>
          <span style={{marginLeft: '5px'}}>Color:{'\u00A0'}</span>
              <Checkbox style={{backgroundColor: '#ffff88', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
              <Checkbox style={{backgroundColor: '#a2e5ff', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
              <Checkbox style={{backgroundColor: '#88ffe1', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
              <Checkbox style={{backgroundColor: '#d7beff', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
              <Checkbox style={{backgroundColor: '#ff9c9c', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
              <Checkbox style={{backgroundColor: '#90ee90', padding: '0px', borderRadius: '0px', marginRight: '5px'}} color='default'/>
          </div>
          <br/>
          <br/>
          <Button variant='contained' color='secondary' size='small' onClick={this.updateChecklist} style={{backgroundColor: '#3c4454', marginBottom: '5px'}}>
            Save Changes<SaveTwoToneIcon fontSize="small"/>
          </Button>
          </div>
          
      }
        </Draggable>
     
      )

  }
}

const mapStateToProps = (reduxState)=>({
  reduxState
})

export default connect(mapStateToProps)(Checklist);