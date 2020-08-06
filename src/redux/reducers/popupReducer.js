import { combineReducers } from 'redux';

const createProject = (state = {open: null}, action) => {
    switch (action.type) {
      case 'SET_CREATE_PROJECT_POPUP_BOOLEAN':
        return action.payload;
      default:
        return state;
    }
  };
  
  const editProject = (state = {open: null}, action) => {
    switch (action.type) {
      case 'SET_EDIT_PROJECT_POPUP_BOOLEAN':
        return action.payload;
      default:
        return state;
    }
  };

  export default combineReducers({
    createProject,
    editProject
  });