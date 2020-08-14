import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox} from '@material-ui/core';

class TaskCheckItem extends Component{
    state = {
        completed: this.props.task.completed,
        id: this.props.task.id,
    }

    updateTaskCompleted = ()=>{
        this.props.dispatch({type: 'UPDATE_TASK_COMPLETED', payload: {completed: !this.state.completed, id: this.state.id}});
        this.setState({
            ...this.state,
            completed: !this.state.completed
        })
    }

    render(){
        return(
            <p style={{textAlign:'left', margin: '0px', paddingLeft: '15px', borderBottom: '1px solid lightblue'}}>
                <Checkbox
                    checked={this.state.completed}
                    onChange={this.updateTaskCompleted}
                    name="checkedB"
                    color="primary"
                    size='small'
                />
                {this.props.task.description}
            </p>
           
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(TaskCheckItem);