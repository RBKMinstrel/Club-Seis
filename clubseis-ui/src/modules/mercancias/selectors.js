const getModuleState = state => state.mercancias;

export const getTallas = state =>
    getModuleState(state).tallas;

export const getTallaName = (tallas, id) => {

    if (!tallas) {
        return '';
    }

    const talla = tallas.find(talla => talla.id === id);

    if (!talla) {
        return '';
    }

    return talla.name;

}

export const getArticulos = state =>
    getModuleState(state).articulos;

export const getCarrito = state =>
    getModuleState(state).carrito;