import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

class CreateButtonOptions extends Component{

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
                        onClick={()=>{
                            this.props.dispatch({type: 'SET_CREATE_PROJECT_POPUP_BOOLEAN', payload: {open: true}})
                            console.log("modal closed ");
                    }}>
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
                        onClick={()=>{
                            this.props.dispatch({type: 'SET_CREATE_PROJECT_POPUP_BOOLEAN', payload: {open: true}})
                            console.log("modal closed ");
                    }}>
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
                        onClick={()=>{
                            this.props.dispatch({type: 'SET_CREATE_PROJECT_POPUP_BOOLEAN', payload: {open: true}})
                            console.log("modal closed ");
                    }}>
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