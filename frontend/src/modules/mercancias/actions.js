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
    type: actionTypes.CLEAR_ARTICULOS
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

const findArticuloCompleted = articulo => ({
    type: actionTypes.FIND_ARTICULO_COMPLETED,
    articulo
})

export const findArticulo = (id, onErrors) => dispatch => {
    backend.mercanciaService.getArticulo(
        id,
        articulo => dispatch(findArticuloCompleted(articulo)),
        onErrors
    )
};
export const clearArticulo = () => ({
    type: actionTypes.CLEAR_ARTICULO
})

export const updateArticulo = (articulo, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.updateArticulo(
        articulo,
        onSuccess,
        onErrors,
    );
}

const getCarritoCompleted = carrito => ({
    type: actionTypes.GET_CARRITO_COMPLETED,
    carrito
});

export const getCarrito = () => dipatch => {
    backend.mercanciaService.getCarrito(
        carrito => dipatch(getCarritoCompleted(carrito)),
        error => console.log(error)
    )
}

export const addToCarrito = (carritoId, articuloId, tallaId, quantity, onSuccess, onError) => dipatch => {
    backend.mercanciaService.addToCarrito(
        carritoId, articuloId, tallaId, quantity,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        onError
    )
}

export const updateCarritoItem = (carritoId, articuloId, tallaId, quantity, onSuccess) => dipatch => {
    backend.mercanciaService.updateCarritoItem(
        carritoId, articuloId, tallaId, quantity,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        error => console.log(error)
    )
}

export const removeCarritoItem = (carritoId, articuloId, tallaId, onSuccess) => dipatch => {
    backend.mercanciaService.removeCarritoItem(
        carritoId, articuloId, tallaId,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        error => console.log(error)
    )
}

export const cleanCarrito = (carritoId, onSuccess) => dipatch => {
    backend.mercanciaService.cleanCarrito(
        carritoId,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        error => console.log(error)
    )
}

export const createVenta = (carritoId, ventaTotal, esSocio, onSuccess, onErrors) => dipatch => {
    backend.mercanciaService.createVenta(
        carritoId, ventaTotal, esSocio,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        error => onErrors(error)
    )
}

export const createPedido = (carritoId, reserva, onSuccess, onErrors) => dipatch => {
    backend.mercanciaService.createPedido(
        carritoId, reserva,
        carrito => {
            dipatch(getCarritoCompleted(carrito));
            onSuccess();
        },
        error => onErrors(error)
    )
}

const getDemandaCompleted = demanda => ({
    type: actionTypes.GET_DEMANDA_COMPLETED,
    demanda
});

export const getDemanda = (beginDate, endDate) => dispatch => {
    backend.mercanciaService.getVentasResumen(
        beginDate, endDate,
        demanda => dispatch(getDemandaCompleted(demanda))
    )
};

export const cleanDemanda = () => ({
    type: actionTypes.CLEAR_DEMANDA
})

const getPedidosCompleted = pedidos => ({
    type: actionTypes.GET_PEDIDOS_COMPLETED,
    pedidos
});

export const getPedidos = ({reserva, page, size}) => dispatch => {
    backend.mercanciaService.findPedidos(
        {reserva, page, size},
        pedidos => dispatch(getPedidosCompleted(pedidos))
    )
};

export const cleanPedidos = () => ({
    type: actionTypes.CLEAR_PEDIDOS
})

export const createVentaByPedido = (pedidoId, esSocio, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.createVentaById(pedidoId, esSocio, onSuccess, onErrors);
}

export const deletePedido = (pedidoId, onSuccess, onErrors) => dispatch => {
    backend.mercanciaService.deletePedido(pedidoId, onSuccess, onErrors);
}