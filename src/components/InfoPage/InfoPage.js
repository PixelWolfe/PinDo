import React, {Component} from 'react';
import NavHome from '../NavHome/NavHome';
import CreateButtonOptions from '../CreateButtonOptions/CreateButtonOptions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component{
  render(){
    return(
      <>
        <NavHome/>
        <CreateButtonOptions/>
        <div>
          <h1>The card you have selected is </h1>
        </div>
      </>
    )
  }
    
}
  
export default InfoPage;
