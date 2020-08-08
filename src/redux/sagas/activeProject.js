import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProject(action){
    console.log('action.payload',action.payload.project_id)
    try{
        const response = yield axios({
            method: 'GET',
            url: `/api/activeProject/project/${action.payload.project_id}`,
            //theorectically this should also be '24' the server doesnt recieve it
        });
        yield console.log('response from /api/activeProject get', response);
        //call refresh of Get Data list
        yield put({type: 'SET_ACTIVE_PROJECT', payload: response.data});
    }
    catch (error) {
        console.log('Error getting projects', error);
    }
}


function* activeProjectSaga() {
    yield takeLatest('FETCH_PROJECT', fetchProject);
}

  export default activeProjectSaga;