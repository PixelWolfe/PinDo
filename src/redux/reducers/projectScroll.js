const projectScroll = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PROJECT_SCROLL':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default projectScroll;