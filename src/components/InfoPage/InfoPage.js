import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';

import Note from '../Note/Note';
import Image from '../Image/Image';
import Checklist from '../Checklist/Checklist';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';

class InfoPage extends Component{

  state={
    project: [],
    notes: [],
    checklists: [],
    images: [],
    zIndexSorted: []
  }

   componentDidMount(){
     console.log('Component did mount for InfoPage')
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
    console.log(previousProps.reduxState.activeProject.notes.length, this.props.reduxState.activeProject.notes.length)
    //check to see if reducer array length for IMAGES/CHECKLISTS/NOTES has changed
    //if so make sure zIndex is sorted so elements append to DOM in the right order
    if(previousProps.reduxState.activeProject !== this.props.reduxState.activeProject){
        
          console.log('updating zindex sorted')
        this.orderFromZIndex();
    }
   }

   orderFromZIndex=()=>{
    let zIndexArray = [];
    zIndexArray.push(...this.props.reduxState.activeProject.notes, ...this.props.reduxState.activeProject.checklists, ...this.props.reduxState.activeProject.images);

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
        <div className='main-container'>
        <div className='wooden-wall'>
        <NavProject/>
        <Fade>  
          <Grid container>
            <Grid item xs={12} align='center'>
              <CreateButtonOptions/>
              <div className="box">
                <div className="draggable-container corkboard" style={{zoom: `${this.props.reduxState.zoomReducer.zoomValue}`}}>
                  {
                    this.state.zIndexSorted.map((item,index)=>{
                      let color;
                      switch(item.color_id){
                          case 1:
                              color = 'yellow';
                              break;
                          case 2:
                              color = 'blue';
                              break;
                          case 3:
                              color = 'cyan';
                              break;
                          case 4:
                              color = 'purple';
                              break;
                          case 5:
                              color ='red';
                              break;
                          case 6:
                              color = 'green';
                              break;
                          default:
                              color = 'yellow';
                      }
                      if(item.hasOwnProperty('url')){

                        return(<Image key={('image-'+item.id)} title={item.title} url={item.url}
                          x={item.x} y={item.y} image_id={item.id}
                          project_id={item.project_id} color_id={item.color_id} color={color}/>);
                      }
                      else if(item.hasOwnProperty('text')){
                        return (<Note key={('note-'+item.id)} title={item.title} text={item.text}
                          x={item.x} y={item.y} note_id={item.id}
                          project_id={item.project_id} color_id={item.color_id} color={color} zIndex={item.z_index}/>);
                      }
                      else{
                        console.log(`Attaching checklist ${item.id} to the DOM color ${color} color_id ${item.color_id }`)
                        return (<Checklist key={('checklist-'+item.id)} title={item.title} project_id={item.project_id} color_id={item.color_id}
                          list_id={item.id} x={item.x} y={item.y} tasks={item.tasks} color={color}/>);
                      }
                    })
                  }
                  </div>
                  
              </div>
              
            </Grid>
          </Grid>
        </Fade>
        </div>
        </div>
      
       
      </>
    )
  }
    
}

const mapStateToProps = (reduxState)=>({
  reduxState
})
  
export default connect(mapStateToProps)(withRouter(InfoPage));
