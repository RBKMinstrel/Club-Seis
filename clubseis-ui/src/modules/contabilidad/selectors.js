const getModuleState = state => state.contabilidad;

export const getRazonesSociales = state =>
    getModuleState(state).razonSocial;

export const getRazonSocial = (razonSociales, id) => {

    if (!razonSociales) {
        return '';
    }

    const razonSocial = razonSociales.find(razonSocial => razonSocial.id === id);

    if (!razonSocial) {
        return '';
    }

    return razonSocial;

}

export const getConceptos = state =>
    getModuleState(state).conceptos;

export const getConcepto = (conceptos, id) => {

    if (!conceptos) {
        return '';
    }

    const concepto = conceptos.find(concepto => concepto.id === id);

    if (!concepto) {
        return '';
    }

    return concepto.name;

}

export const getCategorias = state =>
    getModuleState(state).categorias;

export const getCategoria = (categorias, id) => {

    if (!categorias) {
        return '';
    }

    const categoria = categorias.find(categoria => categoria.id === id);

    if (!categoria) {
        return '';
    }

    return categoria.name;

}

export const getCuentas = state =>
    getModuleState(state).cuentas;

export const getCuenta = (cuentas, id) => {

    if (!cuentas) {
        return '';
    }

    const cuenta = cuentas.find(cuenta => cuenta.id === id);

    if (!cuenta) {
        return '';
    }

    return cuenta.name;

}

export const getMovimientoSearch = state =>
    getModuleState(state).movimientoSearch;

export const getMovimiento = state =>
    getModuleState(state).movimiento;
