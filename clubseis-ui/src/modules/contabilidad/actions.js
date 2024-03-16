import * as actionTypes from './actionTypes';
import backend from '../../backend';

const findAllRazonSocialCompleted = razonSocial => ({
    type: actionTypes.FIND_ALL_RAZON_SOCIAL_COMPLETED,
    razonSocial
});

export const findAllRazonSocial = () => dispatch => {
    backend.contabilidadService.findAllRazonSocial(
        razonSocial => dispatch(findAllRazonSocialCompleted(razonSocial))
    );

}

const findAllConceptosCompleted = conceptos => ({
    type: actionTypes.FIND_ALL_CONCEPTOS_COMPLETED,
    conceptos
});

export const findAllConceptos = () => dispatch => {
    backend.contabilidadService.findAllConceptos(
        conceptos => dispatch(findAllConceptosCompleted(conceptos))
    );

}

const findAllCategoriasCompleted = categorias => ({
    type: actionTypes.FIND_ALL_CATEGORIAS_COMPLETED,
    categorias
});

export const findAllCategorias = () => dispatch => {
    backend.contabilidadService.findAllCategorias(
        categorias => dispatch(findAllCategoriasCompleted(categorias))
    );

}

const findAllCuentasCompleted = cuentas => ({
    type: actionTypes.FIND_ALL_CUENTAS_COMPLETED,
    cuentas
});

export const findAllCuentas = () => dispatch => {
    backend.contabilidadService.findAllCuentas(
        cuentas => dispatch(findAllCuentasCompleted(cuentas))
    );

}

const findMovimientosCompleted = movimientoSearch => ({
    type: actionTypes.FIND_MOVIMIENTOS_COMPLETED,
    movimientoSearch
});

export const findMovimientos = criteria => dispatch => {

    dispatch(clearMovimientoSearch());
    backend.contabilidadService.findMovimientos(criteria,
        result => dispatch(findMovimientosCompleted({criteria, result})));

}

export const previousFindMovimientosResultPage = criteria =>
    findMovimientos({...criteria, page: criteria.page - 1});

export const nextFindMovimientosResultPage = criteria =>
    findMovimientos({...criteria, page: criteria.page + 1});

const clearMovimientoSearch = () => ({
    type: actionTypes.CLEAR_MOVIMIENTO_SEARCH
});

const findMovimientoByIdCompleted = movimiento => ({
    type: actionTypes.FIND_MOVIMIENTO_BY_ID_COMPLETED,
    movimiento
});

export const findMovimientoById = id => dispatch => {
    backend.contabilidadService.findMovimientoById(id,
        movimiento => dispatch(findMovimientoByIdCompleted(movimiento)));
}

export const clearMovimiento = () => ({
    type: actionTypes.CLEAR_MOVIMIENTO
});

export const createMovimiento = (movimiento, onSuccess, onErrors) => () =>
    backend.contabilidadService.createMovimiento(movimiento, onSuccess, onErrors);

export const updateMovimiento = (movimiento, onSuccess, onErrors) => () =>
    backend.contabilidadService.updateMovimiento(movimiento, onSuccess, onErrors);

export const deleteMovimiento = (id, onSuccess, onErrors) => () =>
    backend.contabilidadService.deleteMovimiento(id, onSuccess, onErrors);

export const createRazonSocial = (razonSocial, onSuccess, onErrors) => () =>
    backend.contabilidadService.createRazonSocial(razonSocial, onSuccess, onErrors);

export const updateRazonSocial = (razonSocial, onSuccess, onErrors) => () =>
    backend.contabilidadService.updateRazonSocial(razonSocial, onSuccess, onErrors);

export const createConcepto = (concepto, onSuccess, onErrors) => () =>
    backend.contabilidadService.createConcepto(concepto, onSuccess, onErrors);

export const updateConcepto = (concepto, onSuccess, onErrors) => () =>
    backend.contabilidadService.updateConcepto(concepto, onSuccess, onErrors);

export const createCategoria = (categoria, onSuccess, onErrors) => () =>
    backend.contabilidadService.createCategoria(categoria, onSuccess, onErrors);

export const updateCategoria = (categoria, onSuccess, onErrors) => () =>
    backend.contabilidadService.updateCategoria(categoria, onSuccess, onErrors);

export const createCuenta = (cuenta, onSuccess, onErrors) => () =>
    backend.contabilidadService.createCuenta(cuenta, onSuccess, onErrors);

export const updateCuenta = (cuenta, onSuccess, onErrors) => () =>
    backend.contabilidadService.updateCuenta(cuenta, onSuccess, onErrors);
