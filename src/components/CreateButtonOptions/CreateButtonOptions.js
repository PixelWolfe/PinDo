import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Grid, Button} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

class CreateButtonOptions extends Component{

    create= (type)=>{
        let zIndex = this.props.reduxState.highestZIndex + 1;
        let zoomValue = Number(this.props.reduxState.zoomReducer.zoomValue);
        let x = Number(this.props.reduxState.projectScroll.scrollLeft)*(1/zoomValue)
        let y = Number(this.props.reduxState.projectScroll.scrollTop)*(1/zoomValue)
        console.log('highest zIndex', zIndex);
        
        switch(type){
            case 'note':
                this.props.dispatch({type: 'CREATE_NOTE', payload: {x: x, y: y, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
                break;
            case 'image':
                this.props.dispatch({type: 'CREATE_IMAGE', payload: {x: x, y: y, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
                break;
            case 'checklist':
                this.props.dispatch({type: 'CREATE_CHECKLIST', payload: {x: x, y: y, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
                break;  
        }
    }

    // createNote =()=>{
    //     let zIndex = this.props.reduxState.highestZIndex + 1;
    //     let zoomValue = Number(this.props.reduxState.zoomReducer.zoomValue);
    //     let x = Number(this.props.reduxState.projectScroll.scrollLeft)*(1/zoomValue)
    //     let y = Number(this.props.reduxState.projectScroll.scrollTop)*(1/zoomValue)
    //     console.log('highest zIndex', zIndex);
    //     this.props.dispatch({type: 'CREATE_NOTE', payload: {x: x, y: y, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    // }

    // createImage = ()=>{
    //     let zIndex = this.props.reduxState.highestZIndex + 1;  
    //     console.log(zIndex);
    //     this.props.dispatch({type: 'CREATE_IMAGE', payload: {x: this.props.reduxState.projectScroll.scrollLeft, y: this.props.reduxState.projectScroll.scrollTop, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    // }

    // createChecklist = ()=>{
    //     let zIndex = this.props.reduxState.highestZIndex + 1;
    //     this.props.dispatch({type: 'CREATE_CHECKLIST', payload: {x: this.props.reduxState.projectScroll.scrollLeft, y: this.props.reduxState.projectScroll.scrollTop, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    // }

    render(){
        return(
            <Grid container justify='center' alignItems='center' alignContent='center'>
                <Grid item xs={3} md={2}  lg={1} align='center'>
                {JSON.stringify(this.props.reduxState.highestZIndex)}
                    <Button 
                        size='small'
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px', backgroundColor: '#3c4454'}}
                        onClick={()=>this.create('note')}>
                        Add Note
                    </Button> 
                </Grid>
                <Grid item xs={4} sm={3} md={2} align='center'>
                    <Button 
                        size='small'
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px', backgroundColor: '#3c4454'}}
                        onClick={()=>this.create('checklist')}>
                        Add Checklist
                    </Button> 
                </Grid>
                <Grid item xs={3} sm={3} md={2} lg={1} align='center'>
                    <Button
                        size='small' 
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px', backgroundColor: '#3c4454'}}
                        onClick={()=>this.create('image')}>
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