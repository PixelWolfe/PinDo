import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavProject from '../NavProject/NavProject';

class Project extends Component{
    render(){
        return(
            <>
            <NavProject/>
            </>
        )
    }
}

export default Project