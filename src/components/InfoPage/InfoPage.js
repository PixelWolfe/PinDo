import React, {Component} from 'react';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';
import './note.css';
import Draggable from 'react-draggable';

class InfoPage extends Component{

  state={
    project: [],
    notes: [],
    checklists: [],
    images: []
  }

   componentDidMount(){
     this.props.dispatch({type: 'FETCH_PROJECT', payload: {project_id:  Number(this.props.match.params.id)}});
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
              <div className="draggable-container">
                {
                  this.state.notes.length > 0 ?
                    this.state.notes.map(note=>
                      <Draggable
                        onStop={(e,data)=>this.updatePosition(e, data, note.id, "note")}
                        defaultPosition={{x: note.x, y: note.y}}
                        key={note.id}
                        onStart={this.onStart}
                        bounds='parent'
                      >
                        <div className='sticky-note green'>
                          <h3>{note.title}</h3>
                          <p>{note.text}</p>
                        </div>
                      </Draggable>
                      ):
                      <>
                      </>
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
