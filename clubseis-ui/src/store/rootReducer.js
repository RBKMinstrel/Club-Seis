import {combineReducers} from 'redux';

import app from '../modules/app';
import user from '../modules/user';
import admin from '../modules/admin';
import contabilidad from '../modules/contabilidad';
import mercancias from '../modules/mercancias';

const rootReducer = combineReducers({
    app: app.reducer,
    user: user.reducer,
    admin: admin.reducer,
    contabilidad: contabilidad.reducer,
    mercancias: mercancias.reducer,
});

export default rootReducer;