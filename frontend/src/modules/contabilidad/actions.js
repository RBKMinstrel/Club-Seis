import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from '../../backend';

import {fileTypeDtoDowload} from "../utils/dowloadsUtils.js";

const findAllRazonSocialCompleted = razonSocial => ({
    type: actionTypes.FIND_ALL_RAZON_SOCIAL_COMPLETED,
    razonSocial
});

export const findAllRazonSocial = (force = false) => (dispatch, getState) => {

    const razonesSociales = selectors.getRazonesSociales(getState());

    if (!razonesSociales || force) {

        backend.contabilidadService.findAllRazonSocial(
            razonSocial => dispatch(findAllRazonSocialCompleted(razonSocial))
        );

    }

}

const findAllConceptosCompleted = conceptos => ({
    type: actionTypes.FIND_ALL_CONCEPTOS_COMPLETED,
    conceptos
});

export const findAllConceptos = (force = false) => (dispatch, getState) => {

    const conceptos = selectors.getConceptos(getState());

    if (!conceptos || force) {

        backend.contabilidadService.findAllConceptos(
            conceptos => dispatch(findAllConceptosCompleted(conceptos))
        );

    }

}

const findAllCategoriasCompleted = categorias => ({
    type: actionTypes.FIND_ALL_CATEGORIAS_COMPLETED,
    categorias
});

export const findAllCategorias = (force = false) => (dispatch, getState) => {

    const categorias = selectors.getCategorias(getState());

    if (!categorias || force) {

        backend.contabilidadService.findAllCategorias(
            categorias => dispatch(findAllCategoriasCompleted(categorias))
        );

    }

}

const findAllCuentasCompleted = cuentas => ({
    type: actionTypes.FIND_ALL_CUENTAS_COMPLETED,
    cuentas
});

export const findAllCuentas = (force = false) => (dispatch, getState) => {

    const cuentas = selectors.getCuentas(getState());

    if (!cuentas || force) {

        backend.contabilidadService.findAllCuentas(
            cuentas => dispatch(findAllCuentasCompleted(cuentas))
        );

    }

}

const findMovimientosCompleted = movimientoSearch => ({
    type: actionTypes.FIND_MOVIMIENTOS_COMPLETED,
    movimientoSearch
});

export const findMovimientos = criteria => dispatch => {

    dispatch(clearMovimientoSearch());
    backend.contabilidadService.findMovimientos(criteria,
        result => dispatch(findMovimientosCompleted(result)));

};

const clearMovimientoSearch = () => ({
    type: actionTypes.CLEAR_MOVIMIENTO_SEARCH
});

const findMovimientoByIdCompleted = movimiento => ({
    type: actionTypes.FIND_MOVIMIENTO_BY_ID_COMPLETED,
    movimiento
});

export const findMovimientoById = (id, onSucceess) => dispatch => {
    backend.contabilidadService.findMovimientoById(id,
        movimiento => {
            dispatch(findMovimientoByIdCompleted(movimiento));
            onSucceess();
        });
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

const getResumenCompleted = resumen => ({
    type: actionTypes.GET_RESUMEN_COMPLETED,
    resumen
});

export const getResumen = (fechaInicio, fechaFin) => dispatch => {
    dispatch(clearResumen());
    backend.contabilidadService.getResumen(fechaInicio, fechaFin,
        resumen => dispatch(getResumenCompleted(resumen)));
}

export const clearResumen = () => ({
    type: actionTypes.CLEAR_RESUMEN
});

export const dowloadExcel = (criteria, onSuccess, onErrors) => () =>
    backend.contabilidadService.dowloadExcel(criteria, onSuccess, onErrors);

export const uploadExcel = (data, onSuccess, onErrors) => () =>
    backend.contabilidadService.uploadExcel(data, onSuccess, onErrors);

const getFacturasSearchCompleted = facturasSearch => ({
    type: actionTypes.FIND_FACTURAS_SEARCH_COMPLETED,
    facturasSearch
});

export const getFacturasSearch = ({keyword, page, size}) => dispatch =>
    backend.contabilidadService.getFacturasBlock(
        {keyword, page, size},
        facturasSearch => dispatch(getFacturasSearchCompleted(facturasSearch)),
        error => console.error(error));

const clearFacturasSearch = () => ({
    type: actionTypes.CLEAR_FACTURAS_SEARCH
});

export const getFacturaFile = (id) => () =>
    backend.contabilidadService.getFacturaFile(
        id,
        factura => fileTypeDtoDowload(factura.contentType, factura.base64Content, "factura"),
        error => console.error(error));

export const mockRecibi = (recibi, onErrors) => () =>
    backend.contabilidadService.mockRecibi(
        recibi,
        factura => fileTypeDtoDowload(factura.contentType, factura.base64Content, "recibi"),
        error => onErrors(error));

export const createRecibi = (recibi, onSuccess, onErrors) => () =>
    backend.contabilidadService.createRecibi(
        recibi,
        factura => {
            fileTypeDtoDowload(factura.contentType, factura.base64Content, "recibi");
            onSuccess();
        },
        error => onErrors(error));

export const mockFactura = (file, onErrors) => () =>
    backend.contabilidadService.mockFactura(
        file,
        factura => fileTypeDtoDowload(factura.contentType, factura.base64Content, "factura"),
        error => onErrors(error));

export const createFactura = (recibi, onSuccess, onErrors) => () =>
    backend.contabilidadService.createFactura(
        recibi,
        factura => {
            fileTypeDtoDowload(factura.contentType, factura.base64Content, "factura");
            onSuccess();
        },
        error => onErrors(error));
