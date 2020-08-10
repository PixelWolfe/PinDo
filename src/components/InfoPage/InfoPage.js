import React, {Component} from 'react';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';
import './infoPage.css';


import Note from '../Note/Note';




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


      let zIndexArray = [];
      zIndexArray.push(...this.props.reduxState.activeProject.notes);
      zIndexArray.push(...this.props.reduxState.activeProject.checklists);
      zIndexArray.push(...this.props.reduxState.activeProject.images);

      console.log('zindexarray pre-sort',zIndexArray);
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
              {JSON.stringify(this.props.reduxState.highestZIndex)}
              <div className="box">
              <div className="draggable-container corkboard">
                {
                  this.state.zIndexSorted.map(item=>{
                    if(item.hasOwnProperty('url')){
                      console.log('item is an image');
                      return;
                    }
                    else if(item.hasOwnProperty('text')){
                      console.log('item is a note');
                      return (<Note key={item.id} title={item.title} text={item.text}
                       x={item.x} y={item.y} note_id={item.id}
                      project_id={item.project_id} color_id={item.color_id} />);
                    }
                    else{
                      console.log('item is a checklist');
                      return;
                    }
                  })
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
