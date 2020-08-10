const highestZIndex= (state = 0, action)=>{
    switch (action.type) {
        case 'SET_HIGHEST_ZINDEX':
          return action.payload;
        default:
          return state;
      }
}

export default highestZIndex;