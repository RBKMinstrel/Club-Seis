import {appFetch, config} from './appFetch';

export const findAllConceptos = (onSuccess) =>
    appFetch('/contabilidad/conceptos', config('GET'), onSuccess);

export const createConcepto = (concepto, onSuccess, onErrors) =>
    appFetch('/contabilidad/conceptos', config('POST', concepto), onSuccess, onErrors);

export const updateConcepto = (concepto, onSuccess, onErrors) =>
    appFetch(`/contabilidad/conceptos/${concepto.id}`, config('PUT', concepto), onSuccess, onErrors);

export const findAllCategorias = (onSuccess) =>
    appFetch('/contabilidad/categorias', config('GET'), onSuccess);

export const createCategoria = (categoria, onSuccess, onErrors) =>
    appFetch('/contabilidad/categorias', config('POST', categoria), onSuccess, onErrors);

export const updateCategoria = (categoria, onSuccess, onErrors) =>
    appFetch(`/contabilidad/categorias/${categoria.id}`, config('PUT', categoria), onSuccess, onErrors);

export const findAllCuentas = (onSuccess) =>
    appFetch('/contabilidad/cuentas', config('GET'), onSuccess);

export const createCuenta = (cuenta, onSuccess, onErrors) =>
    appFetch('/contabilidad/cuentas', config('POST', cuenta), onSuccess, onErrors);

export const updateCuenta = (cuenta, onSuccess, onErrors) =>
    appFetch(`/contabilidad/cuentas/${cuenta.id}`, config('PUT', cuenta), onSuccess, onErrors);

export const findAllRazonSocial = (onSuccess) =>
    appFetch('/contabilidad/razon-social', config('GET'), onSuccess);

export const createRazonSocial = (razonSocial, onSuccess, onErrors) =>
    appFetch('/contabilidad/razon-social', config('POST', razonSocial), onSuccess, onErrors);

export const updateRazonSocial = (razonSocial, onSuccess, onErrors) =>
    appFetch(`/contabilidad/razon-social/${razonSocial.id}`, config('PUT', razonSocial), onSuccess, onErrors);

export const findMovimientos = ({razonSocialId, fecha, conceptoId, categoriaId, cuentaId, page, size, tipo},
                                onSuccess) => {

    let path = `/contabilidad/movimientos?page=${page}`;

    path += (tipo != null) ? `&tipo=${tipo}` : "";
    path += razonSocialId ? `&razonSocialId=${razonSocialId}` : "";
    path += fecha ? `&fecha=${fecha}` : "";
    path += conceptoId ? `&conceptoId=${conceptoId}` : "";
    path += categoriaId ? `&categoriaId=${categoriaId}` : "";
    path += cuentaId ? `&cuentaId=${cuentaId}` : "";
    path += size ? `&size=${size}` : "";

    return appFetch(path, config('GET'), onSuccess);

}

export const findMovimientoById = (id, onSuccess) =>
    appFetch(`/contabilidad/movimientos/${id}`, config('GET'), onSuccess);

export const createMovimiento = (movimiento, onSuccess, onErrors) =>
    appFetch('/contabilidad/movimientos', config('POST', movimiento), onSuccess, onErrors);

export const updateMovimiento = (movimiento, onSuccess, onErrors) =>
    appFetch(`/contabilidad/movimientos/${movimiento.id}`, config('PUT', movimiento), onSuccess, onErrors);

export const deleteMovimiento = (id, onSuccess, onErrors) =>
    appFetch(`/contabilidad/movimientos/${id}`, config('DELETE'), onSuccess, onErrors);

export const getResumen = (fechaInicio, fechaFin, onSuccess) =>
    appFetch(`/contabilidad/summary?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, config('GET'), onSuccess);

export const dowloadExcel = ({razonSocialId, fecha, conceptoId, categoriaId, cuentaId, tipo},
                             onSuccess, onErrors) => {

    let path = `/contabilidad/descargar-excel?page=0`;

    path += (tipo != null) ? `&tipo=${tipo}` : "";
    path += razonSocialId ? `&razonSocialId=${razonSocialId}` : "";
    path += fecha ? `&fecha=${fecha}` : "";
    path += conceptoId ? `&conceptoId=${conceptoId}` : "";
    path += categoriaId ? `&categoriaId=${categoriaId}` : "";
    path += cuentaId ? `&cuentaId=${cuentaId}` : "";

    return appFetch(path, config('GET'), onSuccess, onErrors);
}

export const uploadExcel = (data, onSuccess, onErrors) =>
    appFetch('/contabilidad/subir-excel', config('POST', data), onSuccess, onErrors);

export const getFacturasBlock = ({keyword, page, size}, onSuccess, onErrors) => {

    let path = `/contabilidad/facturas?page=${page}&size=${size}`;

    path += keyword ? `&keyword=${encodeURIComponent(keyword)}` : "";

    return appFetch(path, config('GET'), onSuccess, onErrors);
}

export const getFacturaFile = (id, onSuccess, onErrors) =>
    appFetch(`/contabilidad/facturas/${id}`, config('GET'), onSuccess, onErrors);

