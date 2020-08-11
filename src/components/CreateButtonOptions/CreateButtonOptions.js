import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

class CreateButtonOptions extends Component{

    createNote =()=>{
        let zIndex = this.props.reduxState.highestZIndex + 1;
        this.props.dispatch({type: 'CREATE_NOTE', payload: {x: this.props.reduxState.projectScroll.scrollLeft, y: this.props.reduxState.projectScroll.scrollTop, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    }

    createImage =()=>{
        let zIndex = this.props.reduxState.highestZIndex + 1;
        this.props.dispatch({type: 'CREATE_IMAGE', payload: {x: this.props.reduxState.projectScroll.scrollLeft, y: this.props.reduxState.projectScroll.scrollTop, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    }

    render(){
        return(
            <Grid container justify='center' alignItems='center' alignContent='center'>
                <Grid item xs={3} md={2}  lg={1} align='center'>
                    <Button 
                        size='small'
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px'}}
                        onClick={this.createNote}>
                        Add Note
                    </Button> 
                </Grid>
                <Grid item xs={4} sm={3} md={2} align='center'>
                    <Button 
                        size='small'
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px'}}
                        onClick={console.log('Add Checklist Pressed')}>
                        Add Checklist
                    </Button> 
                </Grid>
                <Grid item xs={3} sm={3} md={2} lg={1} align='center'>
                    <Button
                        size='small' 
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px'}}
                        onClick={this.createImage}>
                        Add Image
                    </Button> 
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(CreateButtonOptions);