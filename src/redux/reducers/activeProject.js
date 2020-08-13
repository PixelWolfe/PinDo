const activeProject= (state = {project:[], notes:[], checklists:[], images:[], tasks:[]}, action)=>{
    switch (action.type) {
        case 'SET_ACTIVE_PROJECT':
          console.log('SET activeProject data!')
          return action.payload;
        default:
          return state;
      }
}

export default activeProject;
