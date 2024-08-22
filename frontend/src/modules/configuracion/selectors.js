const getModuleState = state => state.configuracion;

export const getConfigBase = state =>
    getModuleState(state).configBase;

export const getConfigContabilidad = state =>
    getModuleState(state).configContabilidad;

export const getConfigMercancias = state =>
    getModuleState(state).configMercancias;