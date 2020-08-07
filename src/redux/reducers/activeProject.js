const activeProject= (state = [], action)=>{
    switch (action.type) {
        case 'SET_ACTIVE_PROJECT':
          return action.payload;
        default:
          return state;
      }
}

export default activeProject;