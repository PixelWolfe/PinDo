import React, {Component} from 'react';
import NavProject from '../NavProject/NavProject';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Fade} from 'react-reveal';
import {Grid} from '@material-ui/core';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


class InfoPage extends Component{

  state={
    project_id: Number(this.props.match.params.id)
  }

   componentDidMount(){
     this.props.dispatch({type: 'FETCH_PROJECT', payload: {project_id: this.state.project_id}});
   }

  render(){
    return(
      <>
        <NavProject/>
        <Fade delay={200}>
          <CreateButtonOptions/>
          <Grid Item xs={12} style={{background: 'yellow'}}>
            <div>
              <h3>Project</h3>
              <p>{JSON.stringify(this.props.reduxState.activeProject.project)}</p>
              <h4>Notes</h4>
              <p>{JSON.stringify(this.props.reduxState.activeProject.notes)}</p>
              <h4>Checklists</h4>
              <p>{JSON.stringify(this.props.reduxState.activeProject.checklists)}</p>
              <h4>Images</h4>
              <p>{JSON.stringify(this.props.reduxState.activeProject.images)}</p>
              <h1>The card you have selected is: {this.state.project_id} </h1>
            </div>
          </Grid>
          
        </Fade>
       
      </>
    )
  }
    
}

const mapStateToProps = (reduxState)=>({
  reduxState
})
  
export default connect(mapStateToProps)(withRouter(InfoPage));
