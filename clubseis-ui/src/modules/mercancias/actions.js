import * as actionTypes from "./actionTypes.js";
import backend from "../../backend/index.js";

const findAllTallasCompleted = tallas => ({
    type: actionTypes.FIND_ALL_TALLAS_COMPLETED,
    tallas
});

export const findAllTallas = () => dispatch => {
    backend.mercanciaService.findAllTallas(
        tallas => dispatch(findAllTallasCompleted(tallas))
    );
};

const findArticulosCompleted = articulos => ({
    type: actionTypes.FIND_ARTICULOS_COMPLETED,
    articulos
});

export const findArticulos = ({name, tipo, genero, page, size}) => dispatch => {
    backend.mercanciaService.findArticulos(
        {name, tipo, genero, page, size},
        articulos => dispatch(findArticulosCompleted(articulos))
    )
};

export const cleanArticulos = () => ({
    type: actionTypes.CLEAR_ARTICULOS_COMPLETED
});

export const createArticulos = (articulo, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.createArticulo(
        articulo,
        onSuccess,
        onErrors,
    );
}

export const getArticuloImage = (id, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.getArticuloImage(
        id,
        onSuccess,
        onErrors,
    );
}

export const addMoreExistencias = (articuloStock, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.addMoreExistencias(articuloStock.id, articuloStock, onSuccess, onErrors);
}