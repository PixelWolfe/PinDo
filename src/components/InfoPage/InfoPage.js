import React, {Component} from 'react';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';
import './infoPage.css';

import Note from '../Note/Note';
import Image from '../Image/Image';
import Checklist from '../Checklist/Checklist';

class InfoPage extends Component{

  state={
    project: [],
    notes: [],
    checklists: [],
    images: [],
    zIndexSorted: []
  }

   componentDidMount(){
     this.props.dispatch({type: 'FETCH_PROJECT', payload: {project_id:  Number(this.props.match.params.id)}});
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
     
    //check to see if reducer array length for IMAGES/CHECKLISTS/NOTES has changed
    //if so make sure zIndex is sorted so elements append to DOM in the right order

    if(previousProps.reduxState.activeProject.notes.length !== this.props.reduxState.activeProject.notes.length ||
        previousProps.reduxState.activeProject.checklists.length !== this.props.reduxState.activeProject.checklists.length ||
        previousProps.reduxState.activeProject.images.length !== this.props.reduxState.activeProject.images.length){
        console.log('updating zindex sorted')
        this.orderFromZIndex();
    }
   }

   orderFromZIndex=()=>{
    let zIndexArray = [];
    zIndexArray.push(...this.props.reduxState.activeProject.notes);
    zIndexArray.push(...this.props.reduxState.activeProject.checklists);
    zIndexArray.push(...this.props.reduxState.activeProject.images);

    zIndexArray.sort((a,b)=>a.z_index - b.z_index);
    console.log('zindexarray post-sort',zIndexArray);


    // //take the last value (highest zIndex)
    if(zIndexArray.length > 0){
      const highestZIndex = zIndexArray[zIndexArray.length-1]
      console.log('highestZindex', highestZIndex);
      this.props.dispatch({type: 'SET_HIGHEST_ZINDEX', payload: Number(highestZIndex.z_index)});
    }

    this.setState({
      ...this.state,
      project: this.props.reduxState.activeProject.project[0],
      notes: this.props.reduxState.activeProject.notes,
      checklists: this.props.reduxState.activeProject.checklists,
      images: this.props.reduxState.activeProject.images,
      zIndexSorted: zIndexArray
    })
   }

  render(){
    
    return(
      <>
               
        <NavProject/>
        <div className='main-container'>
        
        <Fade delay={200}>  
          <Grid container >
            <Grid item xs={12} align='center'>
              <CreateButtonOptions/>
              {JSON.stringify(this.props.reduxState.highestZIndex)}
              <br/>
              <br/>
              {JSON.stringify(this.props.reduxState.activeProject.notes)}
              <br/>
              <br/>
              {JSON.stringify(this.state.zIndexSorted)}
              <div className="box">
                <div className="draggable-container corkboard">
                  {
                    this.state.zIndexSorted.map((item,index)=>{
                      console.log(this.state.zIndexSorted)
                      if(item.hasOwnProperty('url')){

                        return(<Image key={index} title={item.title} url={item.url}
                          x={item.x} y={item.y} image_id={item.id}
                          project_id={item.project_id} color_id={item.color_id}/>);
                      }
                      else if(item.hasOwnProperty('text')){
                        console.log(`Attaching note ${item.id} to the DOM`)
                        return (<Note key={index} title={item.title} text={index}
                          x={item.x} y={item.y} note_id={item.id}
                          project_id={item.project_id} color_id={item.color_id} />);
                      }
                      else{
                        return (<Checklist title={item.title} project_id={item.project_id} color_id={item.color_id}
                          list_id={item.id} x={item.x} y={item.y} tasks={item.tasks}/>);
                      }
                    })
                  }
                  </div>
              </div>
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
