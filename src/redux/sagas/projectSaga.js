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

function* updateProject(payload){
    try{
        const response = yield axios.put('/api/project', payload);
        yield console.log('response from project update:', response);
        yield put({type: 'FETCH_PROJECTS'});
    }
    catch{

    }
}

function* postProject(payload){
    try{
        const response = yield axios.post('/api/project', payload);
        yield console.log('response from project post:', response);
        yield put({type: 'FETCH_PROJECTS'});
    }
    catch (error){
        console.log('Error posting project to server', error);
    }
}

function* deleteProject(action){
    console.log('logging payload', action.payload)
    try{
        const response = yield axios({
            method: 'DELETE',
            url: '/api/project/',
            data: action.payload
        });
        yield console.log('response from project Delete:', response); 
        yield put({type: 'FETCH_PROJECTS'});  
    }
    catch(error){
        console.log('Error posing project to server', error);
    }
}   

function* projectSaga() {
    yield takeLatest('FETCH_PROJECTS', fetchProjects);
    yield takeLatest('POST_PROJECT', postProject);
    yield takeLatest('UPDATE_PROJECT', updateProject);
    yield takeLatest('DELETE_PROJECT', deleteProject);
}

  export default projectSaga;