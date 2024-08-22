import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    razonSocial: null,
    conceptos: null,
    categorias: null,
    cuentas: null,
    movimientoSearch: null,
    movimiento: null,
    resumen: null,
    facturasSearch: null
};

const razonSocial = (state = initialState.razonSocial, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_RAZON_SOCIAL_COMPLETED:
            return action.razonSocial;

        default:
            return state;

    }

}

const conceptos = (state = initialState.conceptos, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_CONCEPTOS_COMPLETED:
            return action.conceptos;

        default:
            return state;

    }

}

const categorias = (state = initialState.categorias, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_CATEGORIAS_COMPLETED:
            return action.categorias;

        default:
            return state;

    }

}

const cuentas = (state = initialState.cuentas, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_CUENTAS_COMPLETED:
            return action.cuentas;

        default:
            return state;

    }

}

const movimientoSearch = (state = initialState.movimientoSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_MOVIMIENTOS_COMPLETED:
            return action.movimientoSearch;

        case actionTypes.CLEAR_MOVIMIENTO_SEARCH:
            return initialState.movimientoSearch;

        default:
            return state;

    }

}

const movimiento = (state = initialState.movimiento, action) => {

    switch (action.type) {

        case actionTypes.FIND_MOVIMIENTO_BY_ID_COMPLETED:
            return action.movimiento;

        case actionTypes.CLEAR_MOVIMIENTO:
            return initialState.movimiento;

        default:
            return state;

    }

}

const resumen = (state = initialState.resumen, action) => {

    switch (action.type) {

        case actionTypes.GET_RESUMEN_COMPLETED:
            return action.resumen;

        case actionTypes.CLEAR_RESUMEN:
            return initialState.resumen;

        default:
            return state;

    }

}

const facturasSearch = (state = initialState.facturasSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_FACTURAS_SEARCH_COMPLETED:
            return action.facturasSearch;

        case actionTypes.CLEAR_FACTURAS_SEARCH:
            return initialState.facturasSearch;

        default:
            return state;

    }

}

const reducer = combineReducers({
    razonSocial,
    conceptos,
    categorias,
    cuentas,
    movimientoSearch,
    movimiento,
    resumen,
    facturasSearch,
});

export default reducer;