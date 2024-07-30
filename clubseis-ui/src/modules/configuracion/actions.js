import * as actionTypes from "./actionTypes.js";
import backend from "../../backend/index.js";

const findConfigBaseCompleted = configBase => ({
    type: actionTypes.FIND_CONFIG_BASE_COMPLETED,
    configBase
});

export const findConfigBase = () => dispatch => {
    backend.configuracionService.findConfiguracionBase(
        configBase => dispatch(findConfigBaseCompleted(configBase))
    );
};

export const clearConfigBase = () => ({
    type: actionTypes.CLEAR_CONFIG_BASE
});

export const updateConfiguracionBase = (configBase, onSuccess) => dispatch => {
    backend.configuracionService.updateConfiguracionBase(configBase, onSuccess);
};