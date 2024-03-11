const getModuleState = state => state.contabilidad;

export const getRazonSocial = state =>
    getModuleState(state).razonSocial;

export const getConceptos = state =>
    getModuleState(state).conceptos;

export const getCategorias = state =>
    getModuleState(state).categorias;

export const getCuentas = state =>
    getModuleState(state).cuentas;

export const getMovimientoSearch = state =>
    getModuleState(state).movimientoSearch;

export const getMovimiento = state =>
    getModuleState(state).movimiento;
