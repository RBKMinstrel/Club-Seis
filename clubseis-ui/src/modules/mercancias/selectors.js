const getModuleState = state => state.mercancias;

export const getTallas = state =>
    getModuleState(state).tallas;

export const getTallaName = (tallas, id) => {

    if (!tallas) {
        return 'Cantidad';
    }

    const talla = tallas.find(talla => talla.id === id);

    if (!talla) {
        return 'Cantidad';
    }

    return "Talla " + talla.name;

}

export const getArticulos = state =>
    getModuleState(state).articulos;

export const getArticulo = state =>
    getModuleState(state).articulo;

export const getCarrito = state =>
    getModuleState(state).carrito;