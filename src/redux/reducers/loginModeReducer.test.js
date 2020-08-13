import loginModeReducer from './loginModeReducer';

describe('Testing the loginModeReducer...', ()=>{
test('test initial state is login', ()=>{
    //Testing initialization, don't really care about the action
    const action = {type: 'test'};
    //Testing initialization, so state should be undefined
    const previousState = undefined;
    // Output should be our default state value
    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual('login');
})

test('Testing SET_TO_LOGIN_MODE', ()=>{
    const action = {type: 'SET_TO_LOGIN_MODE'};
    const previousState = 'undefined';

    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual('login');
})

test('Testing SET_TO_REGISTER_MODE', ()=>{
    const action = {type: 'SET_TO_REGISTER_MODE'};
    const previousState = 'login';

    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual('register');
})
})


