import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import {Grid, Button, Icon, TextField} from "@material-ui/core";
import NavHome from '../NavHome/NavHome';
import Fade from 'react-reveal/Fade';

import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import TitleTwoToneIcon from '@material-ui/icons/TitleTwoTone';
import AddPhotoAlternateTwoToneIcon from '@material-ui/icons/AddPhotoAlternateTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Popup from "reactjs-popup";

import InputAdornment from '@material-ui/core/InputAdornment';


class Home extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <>
        <NavHome/>
        <body style={{minheight: '100vh', width: '100%', backgroundColor: 'green'}}>
        <Fade delay={200}>
        <Grid container justify='center' alignItems='center' alignContent='center'>
        <Grid container justify='center' alignItems='center' alignContent='center'>
          <Grid item xs={5} sm={4} md={3} lg={2} align='center'>

          <Popup trigger={
              <Button 
                startIcon={<AddBoxTwoToneIcon/>}
                variant='contained' 
                color='primary' 
                style={{ marginTop: '0px'}}>
                  Create a Project
              </Button>} 
            position="bottom center"
            modal>
           <div>
           <h1>It's happening!</h1>
           <h4 style={{margin: 0}}>Let's get this project started!</h4>
            <br/>
           <TextField 
           style={{width: '60%'}}
           size='small'
           variant="filled"
           label="Title"
           
           inputProps={{maxLength: 80}}
           InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <TitleTwoToneIcon />
               </InputAdornment>
             ),
           }}
         />
         <br/>
         <TextField
           style={{width: '60%', marginTop: '10px'}}
           size='small'
           variant="filled"
           label="Image Url"
           type='text'
           inputProps={{maxLength: 1000}}
           InputProps={{
             startAdornment: (
               <InputAdornment position="start">
                 <AddPhotoAlternateTwoToneIcon/>
               </InputAdornment>
             ),
           }}
         />
         <TextField
            style={{width: '60%', marginTop: '10px'}}
            size='small'
            variant="filled"
            label="Description (optional)"
            type='text'
            multiline
            rows={5}
            inputProps={{maxLength: 250}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionTwoToneIcon/>
                </InputAdornment>
              ),
            }}
          />
         <br/>
         <Button 
           style={{marginTop: '10px'}}
           name="submit" 
           variant="contained" 
           color="primary" 
           onClick={this.login}
         >    
          Create
         </Button>

           </div>
          </Popup>

          </Grid>
        </Grid>
     
          <Grid item xs={5} sm={4} md={3} style={{backgroundColor: 'white', margin: '15px'}}>
            <Grid item align='right'>
              <Button
                  startIcon={<MoreTwoToneIcon/>}
                  variant="outlined"
                  color="primary"
                  style={{backgroundColor:'rgb(247, 242, 171)'}}
                >
                  Description
                </Button>
            </Grid>
            <div>
              
              
              <h1>Warhammer Painting</h1>
                <img 
                  style={{width:'100%'}}
                  src='https://curations-3.s3.amazonaws.com/curations3_custom_upload/gamesworkshop/gamesworkshop_1584109416649'
                />
            </div>
          </Grid>
          <Grid item xs={5} sm={4} md={3} lg={2} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={5} sm={4} md={3} lg={2} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={5} sm={4} md={3} lg={2} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
          <Grid item xs={5} sm={4} md={3} lg={2} style={{backgroundColor: 'white', margin: '15px'}}>
            <h1>Yo!</h1>
          </Grid>
        </Grid>
        </Fade>
      </body>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
