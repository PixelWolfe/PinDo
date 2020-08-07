import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavProject from '../NavProject/NavProject';

import Menubar from "react-responsive-multi-level-menu";
const  menuItems = [
  { value: "Change Color"},
  { value: "Edit" },
  { value: "Delete"},
];

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