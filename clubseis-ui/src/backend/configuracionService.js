import {appFetch, config} from './appFetch';

export const findConfiguracionBase = (onSuccess) =>
    appFetch('/configuracion/configBase', config('GET'), onSuccess);

export const updateConfiguracionBase = (configBase, onSuccess) =>
    appFetch('/configuracion/configBase', config('POST', configBase), onSuccess);