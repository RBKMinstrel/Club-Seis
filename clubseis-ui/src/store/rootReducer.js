import {combineReducers} from 'redux';

import app from '../modules/app';
import user from '../modules/user';

const rootReducer = combineReducers({
    app: app.reducer,
    user: user.reducer
});

export default rootReducer;