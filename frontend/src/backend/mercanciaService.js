import {appFetch, config} from "./appFetch.js";

//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/tallas")).permitAll()
export const findAllTallas = (onSuccess) =>
    appFetch('/mercancias/tallas', config('GET'), onSuccess);


//.requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/tallas")).permitAll()
export const createTalla = (talla, onSuccess, onErrors) =>
    appFetch('/mercancias/tallas', config('POST', talla), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/articulos")).permitAll()
export const findArticulos = ({name, tipo, genero, page, size}, onSuccess) => {
    let path = `/mercancias/articulos?page=${page}&size=${size}`;
    path += name ? `&name=${encodeURIComponent(name)}` : '';
    path += tipo != null ? `&tipo=${tipo}` : '';
    path += genero != null ? `&genero=${genero}` : '';
    return appFetch(path, config('GET'), onSuccess);
}


//.requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/articulos")).permitAll()
export const createArticulo = (articulo, onSuccess, onErrors) =>
    appFetch('/mercancias/articulos', config('POST', articulo), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.PUT, "/api/mercancias/articulos")).permitAll()
export const updateArticulo = (articulo, onSuccess, onErrors) =>
    appFetch('/mercancias/articulos', config('PUT', articulo), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/articulos/*")).permitAll()
export const getArticulo = (id, onSuccess, onErrors) =>
    appFetch(`/mercancias/articulos/${id}`, config('GET'), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/articulos/*")).permitAll()
export const addMoreExistencias = (id, articuloStock, onSuccess, onErrors) =>
    appFetch(`/mercancias/articulos/${id}`, config('POST', articuloStock), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/articulos/*/image")).permitAll()
export const getArticuloImage = (id, onSuccess, onErrors) =>
    appFetch(`/mercancias/articulos/${id}/image`, config('GET'), onSuccess, onErrors);


// .requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/carritos")).permitAll()
export const getCarrito = (onSuccess, onErrors) =>
    appFetch(`/mercancias/carritos`, config('GET'), onSuccess, onErrors);


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*")).permitAll()
export const addToCarrito = (carritoId, articuloId, tallaId, quantity, onSuccess, onErrors) => {
    let path = `/mercancias/carritos/${carritoId}?quantity=${quantity}&articuloId=${articuloId}`;
    path += tallaId != null ? `&tallaId=${tallaId}` : '';
    return appFetch(path, config('POST'), onSuccess, onErrors);
}


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*/changeQuantity")).permitAll()
export const updateCarritoItem = (carritoId, articuloId, tallaId, quantity, onSuccess, onErrors) => {
    let path = `/mercancias/carritos/${carritoId}/changeQuantity?quantity=${quantity}&articuloId=${articuloId}`;
    path += tallaId != null ? `&tallaId=${tallaId}` : '';
    return appFetch(path, config('POST'), onSuccess, onErrors);
}


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*/deleteItem")).permitAll()
export const removeCarritoItem = (carritoId, articuloId, tallaId, onSuccess, onErrors) => {
    let path = `/mercancias/carritos/${carritoId}/deleteItem?articuloId=${articuloId}`;
    path += tallaId != null ? `&tallaId=${tallaId}` : '';
    return appFetch(path, config('POST'), onSuccess, onErrors);
}


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*/deleteAllItems")).permitAll()
export const cleanCarrito = (carritoId, onSuccess, onErrors) => {
    return appFetch(`/mercancias/carritos/${carritoId}/deleteAllItems`, config('POST'), onSuccess, onErrors);
}


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*/comprar")).permitAll()
export const createVenta = (carritoId, ventaTotal, esSocio, onSuccess, onErrors) =>
    appFetch(`/mercancias/carritos/${carritoId}/comprar?ventaTotal=${ventaTotal}&esSocio=${esSocio}`, config('POST'), onSuccess, onErrors);


// .requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/carritos/*/pedir")).permitAll()
export const createPedido = (carritoId, reserva, onSuccess, onErrors) =>
    appFetch(`/mercancias/carritos/${carritoId}/pedir?reserva=${encodeURIComponent(reserva)}`, config('POST'), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/demanda")).permitAll()
export const getVentasResumen = (beginDate, endDate, onSuccess) =>
    appFetch(`/mercancias/demanda?beginDate=${beginDate}&endDate=${endDate}`, config('GET'), onSuccess);


//.requestMatchers(antMatcher(HttpMethod.GET, "/api/mercancias/pedidos")).permitAll()
export const findPedidos = ({reserva, page, size}, onSuccess) => {
    let path = `/mercancias/pedidos?page=${page}&size=${size}`;
    path += reserva ? `&reserva=${encodeURIComponent(reserva)}` : '';
    return appFetch(path, config('GET'), onSuccess);
}


//.requestMatchers(antMatcher(HttpMethod.POST, "/api/mercancias/pedidos/*")).permitAll()
export const createVentaById = (id, esSocio, onSuccess, onErrors) =>
    appFetch(`/mercancias/pedidos/${id}?esSocio=${esSocio}`, config('POST'), onSuccess, onErrors);


//.requestMatchers(antMatcher(HttpMethod.DELETE, "/api/mercancias/pedidos/*")).permitAll()
export const deletePedido = (id, onSuccess, onErrors) =>
    appFetch(`/mercancias/pedidos/${id}`, config('DELETE'), onSuccess, onErrors);
