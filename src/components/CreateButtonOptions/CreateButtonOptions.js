import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

class CreateButtonOptions extends Component{

    createNote =()=>{
        let zIndex = this.calculateZIndex();
        this.props.dispatch({type: 'CREATE_NOTE', payload: {x: this.props.reduxState.projectScroll.scrollLeft, y: this.props.reduxState.projectScroll.scrollTop, project_id: this.props.reduxState.activeProject.project[0].id, z_index: zIndex}});
    }

    calculateZIndex() {

        //grab all draggable elements with the classname of react-draggable
        let draggables = document.getElementsByClassName('react-draggable');
        let zIndexArray = [];

        //loop through all draggable elements
        for(let i = 0; i < draggables.length; i++) {
            
            if(draggables[i].style.zIndex === '' || draggables[i].style.zIndex === 0){
                //update css position to relative
                draggables[i].style.position = 'absolute';
                draggables[i].style.zIndex = i + 1;
            }
            //push into zIndexArray as an object {index, zIndex}
            zIndexArray.push({zIndex: draggables[i].style.zIndex})
        }

        // //sort the zIndex array by Ascending value
        zIndexArray.sort((a,b)=>a.zIndex - b.zIndex);
  
        // //take the last value (highest zIndex)
        let highestZIndex = 0;
        if(zIndexArray.length > 0){
            highestZIndex = zIndexArray.pop();   
        }
        
       
        console.log('Highest Index is:', highestZIndex.zIndex)
        return highestZIndex.zIndex;

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
                        onClick={console.log('Add Image Pressed')}>
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