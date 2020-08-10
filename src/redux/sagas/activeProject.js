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

function* updatePosition(action){
    try{
        const response = yield axios.put('/api/activeProject/updatePosition', action.payload);
        yield console.log('response from /api/activeProject/updatePositions put', response);
    }
    catch(error){
        console.log('Error updating position', error);
    }
}

function* updateNote(action){
    try{
        const response = yield axios.put('/api/activeProject/updateNote', action.payload);
        yield console.log('response from /api/activeProject/updateNote put', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error updating note', error);
    }
}

function* deleteNote(action){
    try{
        const response = yield axios({
            method: 'DELETE',
            url: '/api/activeProject/deleteNote',
            data: action.payload
        });
        yield console.log('response from /api/activeProject/deleteNote put', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error deleting note', error);
    }
}

function* createNote(action){
    try{
        const response = yield axios.post('/api/activeProject/createNote', action.payload);
        yield console.log('response from /api/activeProject/createNote post', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error creating note', error);
    }
}

function* updateZIndex(action){
    try{
        console.log(action.payload)
        const response = yield axios.put('/api/activeProject/updateZIndex', action.payload);
        yield console.log('response from /api/activeProject/updateZIndex', response);
    }
    catch(error){
        console.log('Error updating zindex:', error);
    }
}

function* activeProjectSaga() {
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeLatest('UPDATE_POSITION', updatePosition);
    yield takeLatest('UPDATE_NOTE', updateNote);
    yield takeLatest('DELETE_NOTE', deleteNote);
    yield takeLatest('CREATE_NOTE', createNote);
    yield takeLatest('UPDATE_ZINDEX', updateZIndex);
}

  export default activeProjectSaga;