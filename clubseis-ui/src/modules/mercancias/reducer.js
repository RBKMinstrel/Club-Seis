import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes.js';

const initialState = {
    tallas: null,
    articulos: null,
    articulo: null,
    carrito: [],
};

const tallas = (state = initialState.tallas, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_TALLAS_COMPLETED:
            return action.tallas;

        default:
            return state;

    }

}

const articulos = (state = initialState.articulos, action) => {

    switch (action.type) {

        case actionTypes.FIND_ARTICULOS_COMPLETED:
            return action.articulos;

        case actionTypes.CLEAR_ARTICULOS_COMPLETED:
            return initialState.articulos;

        default:
            return state;

    }

}

const articulo = (state = initialState.articulo, action) => {

    switch (action.type) {

        //case actionTypes.FIND_ARTICULO_COMPLETED:
        //    return action.articulo;

        //case actionTypes.CLEAR_ARTICULO:
        //    return initialState.articulo;

        default:
            return state;

    }

}

const carrito = (state = initialState.carrito, action) => {

    switch (action.type) {

        //case actionTypes.UPDATE_CARRITO:
        //    return action.carrito;

        //case actionTypes.CLEAR_CARRITO:
        //    return initialState.carrito;

        default:
            return state;

    }

}

const reducer = combineReducers({
    tallas,
    articulos,
    carrito,
    articulo,
});

export default reducer;