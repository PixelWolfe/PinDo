import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid} from "@material-ui/core";
import NavHome from '../NavHome/NavHome';
import ProjectCard from '../ProjectCard/ProjectCard';
import Fade from 'react-reveal/Fade';

import CreateProjectButton from '../CreateProjectButton/CreateProjectButton';
import CreateProjectPopup from '../CreateProjectPopup/CreateProjectPopup';

class Home extends Component {

  componentDidMount(){
    this.getProjects();
  }

  getProjects = ()=>{
    this.props.dispatch({type: 'FETCH_PROJECTS'});
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <>
          
          <div className='wooden-wall'>
          <NavHome/>
          <Fade delay={200}>
            <CreateProjectButton/>  
            <Grid container justify='center' alignItems='center' alignContent='center'> 
              <CreateProjectPopup/>
              {
                  this.props.reduxState.project?
                    this.props.reduxState.project.map((project)=>
                      <Grid key={project.id} item align='center' xs={9} sm={6} md={4} lg={3} style={{margin: '15px'}}>
                        <ProjectCard 
                          title={project.title} 
                          image_url={project.image_url} 
                          description={project.description}
                          project_id={project.id}
                          />
                      </Grid>)
                  :
                  <>
                  </>
              }
            </Grid>
            </Fade>
          </div>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (reduxState) => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);
