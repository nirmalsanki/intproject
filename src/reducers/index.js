import { combineReducers } from 'redux';

import auth from './auth.reducer';
import registerUser from './reg.reducer';
import addUser from './addUser.reducer';

const reducers = combineReducers({
    auth, registerUser, addUser
});

export default reducers;