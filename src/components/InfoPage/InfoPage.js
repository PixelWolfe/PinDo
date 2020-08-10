import React, {Component} from 'react';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';
import './infoPage.css';
import Draggable from 'react-draggable';

import Note from '../Note/Note';

import IconButton from '@material-ui/core/IconButton';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import CorkBoard from '../../images/corkboard.jpg';




class InfoPage extends Component{

  state={
    project: [],
    notes: [],
    checklists: [],
    images: []
  }

   componentDidMount(){
     this.props.dispatch({type: 'FETCH_PROJECT', payload: {project_id:  Number(this.props.match.params.id)}});
      console.log('this.props!!!!', this.props)

    /*!
    * Thanks to Chris Ferdinandi at https://gomakethings.com
    * for their epic scrollStop function which is adapted here :]
    */

     var scrollStop = function (callback) {
      // Make sure a valid callback was provided
      if (!callback || typeof callback !== 'function') return;
      // Setup scrolling variable
      var isScrolling;
      // Listen for scroll events
      document.querySelector('.box').addEventListener('scroll', function (event) {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
          // Run the callback
          callback();
        }, 66);
      }, false);
    };
    
    scrollStop(function () {
      const box = document.querySelector('.box');
      console.log('Scroll Left/Top', box.scrollLeft, box.scrollTop);
      setScroll(box.scrollLeft, box.scrollTop);
    });

    var setScroll = (scrollLeft, scrollTop)=>{
      this.props.dispatch({type: 'SET_PROJECT_SCROLL', payload: {scrollLeft: scrollLeft, scrollTop: scrollTop}});
    }
    this.resetScroll();
   }

   resetScroll = ()=>{
    this.props.dispatch({type: 'SET_PROJECT_SCROLL', payload: {scrollLeft: 0, scrollTop: 0}});
   }

   componentDidUpdate(previousProps){
    if(previousProps.reduxState.activeProject !== this.props.reduxState.activeProject){
      this.setState({
        ...this.state,
        project: this.props.reduxState.activeProject.project[0],
        notes: this.props.reduxState.activeProject.notes,
        checklists: this.props.reduxState.activeProject.checklists,
        images: this.props.reduxState.activeProject.images
      })
    }
   }

   //updates the x and y position after a note is moved
   updatePosition = (e, data, id, type) => {
    console.log('In updatePosition for note for note:', id)
    console.log('x:', data.x, 'y:', data.y);
    console.log(e, data)
    this.props.dispatch({type: 'UPDATE_POSITION', payload: {x: data.x, y: data.y, id: id, project_id: this.state.project.id, type: type}});
    }

    onStart(e) {
      console.log('onstart e event',e);
    }
    


  render(){
    
    return(
      <>
               
        <NavProject/>
        <div className='main-container'>
        
        <Fade delay={200}>  
          <Grid container >
            <Grid item xs={12} align='center'>
              {/*Will have to reposition most likely when zindex changin is implemented */}
              <CreateButtonOptions/>
              <div className="box">
              <div className="draggable-container" style={{backgroundImage: ('url('+CorkBoard+')')}}>
                {
                  this.state.notes.length > 0 ?
                    this.state.notes.map(note=>
                        <Note key={note.id} title={note.title} text={note.text}
                          z_index={note.z_index} x={note.x} y={note.y} note_id={note.id}
                          project_id={note.project_id} color_id={note.color_id} />
                      ):
                      <>
                      </>
                }
                
                </div>
                
              </div>
                <p>{JSON.stringify(this.props.reduxState.projectScroll)}</p>
            </Grid>
          </Grid>
        </Fade>
        </div>
      
       
      </>
    )
  }
    
}

const mapStateToProps = (reduxState)=>({
  reduxState
})
  
export default connect(mapStateToProps)(withRouter(InfoPage));
