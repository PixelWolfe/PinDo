import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProjects(){
    try{
        const response = yield axios.get('/api/project');
        yield console.log('response from /api/project get', response);
        //call refresh of Get Data list
        yield put({type: 'SET_PROJECTS', payload: response.data});
    }
    catch (error) {
        console.log('Error getting projects', error);
    }
}

function* projectSaga() {
    yield takeLatest('FETCH_PROJECTS', fetchProjects);
}

  export default projectSaga;