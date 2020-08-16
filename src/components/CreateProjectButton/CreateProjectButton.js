import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

class CreateProjectButton extends Component{

    render(){
        return(
            <Grid container justify='center' alignItems='center' alignContent='center'>
                <Grid item xs={5} sm={4} md={3} lg={2} align='center'>
                    <Button 
                        startIcon={<AddBoxTwoToneIcon/>}
                        variant='contained' 
                        color='primary' 
                        style={{ marginTop: '0px', backgroundColor: '#3c4454'}}
                        onClick={()=>{
                            this.props.dispatch({type: 'SET_CREATE_PROJECT_POPUP_BOOLEAN', payload: {open: true}})
                            console.log("modal closed ");
                    }}>
                        Create a Project
                    </Button> 
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(CreateProjectButton);