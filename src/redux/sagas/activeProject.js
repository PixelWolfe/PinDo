import { put, takeLatest, takeLeading } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProject(action){
    console.log('action.payload',action.payload.project_id)
    try{
        const response = yield axios({
            method: 'GET',
            url: `/api/activeProject/project/${action.payload.project_id}`,
            //theorectically this should also be '24' the server doesnt recieve it
        });
        //call refresh of Get Data list
        yield console.log('GET of project data successful!', response.data)
        yield put({type: 'SET_ACTIVE_PROJECT', payload: response.data});
    }
    catch (error) {
        console.log('Error getting projects', error);
    }
}

function* updatePosition(action){
    try{
        const response = yield axios.put('/api/activeProject/updatePosition', action.payload);
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
        yield console.log('Delete note SUCCESSFUL!', response);
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

function* createImage(action){
    try{
        const response = yield axios.post('/api/activeProject/createImage', action.payload);
        yield console.log('response from /api/activeProject/createNote image', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error creating image', error);
    }
}

function* createChecklist(action){
    try{
        const response = yield axios.post('/api/activeProject/createChecklist', action.payload);
        yield console.log('response from /api/activeProject/createChecklist post', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error creating checklist', error);
    }
}

function* updateZIndex(action){
    try{
        console.log(action.payload)
        const response = yield axios.put('/api/activeProject/updateZIndex', action.payload);

    }
    catch(error){
        console.log('Error updating zindex:', error);
    }
}

function* updateImage(action){
    try{
        console.log(action.payload)
        const response = yield axios.put('/api/activeProject/updateImage', action.payload);
        yield console.log('response from /api/activeProject/updateImage', response);
        yield put({type: 'FETCH_PROJECT', payload:{project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error updating image:', error);
    }
}

function* deleteImage(action){
    try{
        const response = yield axios({
            method: 'DELETE',
            url: '/api/activeProject/deleteImage',
            data: action.payload
        });
        yield console.log('response from /api/activeProject/deleteImage', response);
        yield put({type: 'FETCH_PROJECT', payload:{project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error deleting image:', error);
    }
}

function* deleteChecklist(action){
    try{
        const response = yield axios({
            method: 'DELETE',
            url: '/api/activeProject/deleteChecklist',
            data: action.payload
        });
        yield console.log('response from /api/activeProject/deleteChecklist', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error deleting image:', error);
    }   
}

function* createNewTask(action){
    try{
        const response = yield axios.post('/api/activeProject/createNewTask', action.payload);
        yield console.log('response from /api/activeProject/createChecklist createNewTask', response);
        yield put({type: 'FETCH_PROJECT', payload: {project_id: action.payload.project_id}});
    }
    catch(error){
        console.log('Error creating new task', error);
    }
}

function* activeProjectSaga() {
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeLatest('UPDATE_POSITION', updatePosition);
    yield takeLatest('UPDATE_NOTE', updateNote);
    yield takeLatest('DELETE_NOTE', deleteNote);
    yield takeLatest('CREATE_NOTE', createNote);
    yield takeLatest('UPDATE_ZINDEX', updateZIndex);
    yield takeLatest('UPDATE_IMAGE', updateImage);
    yield takeLatest('DELETE_IMAGE', deleteImage);
    yield takeLatest('CREATE_IMAGE', createImage);
    yield takeLatest('DELETE_CHECKLIST', deleteChecklist);
    yield takeLatest('CREATE_CHECKLIST', createChecklist);
    yield takeLatest('CREATE_NEW_TASK', createNewTask);
}

  export default activeProjectSaga;