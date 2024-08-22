import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    configBase: null,
    configContabilidad: null,
    configMercancias: null,
};

const configBase = (state = initialState.configBase, action) => {

    switch (action.type) {

        case actionTypes.FIND_CONFIG_BASE_COMPLETED:
            return action.configBase;

        case actionTypes.CLEAR_CONFIG_BASE:
            return initialState.configBase;

        default:
            return state;

    }

}

const configContabilidad = (state = initialState.configContabilidad, action) => {

    switch (action.type) {

        case actionTypes.FIND_CONFIG_CONTABILIDAD_COMPLETED:
            return action.configContabilidad;

        case actionTypes.CLEAR_CONFIG_CONTABILIDAD:
            return initialState.configContabilidad;

        default:
            return state;

    }

}

const configMercancias = (state = initialState.configMercancias, action) => {

    switch (action.type) {

        case actionTypes.FIND_CONFIG_MERCANCIAS_COMPLETED:
            return action.configMercancias;

        case actionTypes.CLEAR_CONFIG_MERCANCIAS:
            return initialState.configMercancias;

        default:
            return state;

    }

}

const reducer = combineReducers({
    configBase,
    configContabilidad,
    configMercancias,
});

export default reducer;