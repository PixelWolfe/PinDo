const zoomReducer= (state = {zoomValue: '.25'}, action)=>{
    switch(action.type){
        case 'SET_ZOOM_VALUE':
          console.log('setting zoom reducer')
          return action.payload;
        default:
          return state;
      }
}

export default zoomReducer;