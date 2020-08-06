const popupReducer = (state = {open: null}, action) => {
    switch (action.type) {
      case 'SET_POPUP_BOOLEAN':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default popupReducer;