package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.Articulo;
import es.minstrel.app.model.entities.Articulo.Genero;
import es.minstrel.app.model.entities.Carrito;
import es.minstrel.app.model.entities.Pedido;
import es.minstrel.app.model.entities.Talla;
import es.minstrel.app.model.exceptions.*;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.FileType;
import es.minstrel.app.model.services.utils.StockArticulo;
import es.minstrel.app.model.services.utils.StockTalla;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface MercanciaService {

    void createTalla(String talla)
            throws DuplicateInstanceException;

    List<Talla> getTallaList();

    Block<Articulo> getArticuloBlock(String name, Boolean tipo, Byte genero, int page, int size);

    FileType getImageArticulo(Long articuloId)
            throws IOException, InstanceNotFoundException;

    Articulo getArticulo(Long articuloId) throws InstanceNotFoundException;

    Carrito getCarrito(Long userId) throws InstanceNotFoundException;

    Carrito addToCarrito(Long userId, Long carritoId, Long articuloId, Long tallaId, int quantity)
            throws InstanceNotFoundException, PermissionException;

    Carrito updateCarritoItem(Long userId, Long carritoId, Long articuloId, Long tallaId, int quantity)
            throws InstanceNotFoundException, PermissionException;

    Carrito removeCarritoItem(Long userId, Long carritoId, Long articuloId, Long tallaId)
            throws InstanceNotFoundException, PermissionException;

    Carrito cleanCarrito(Long userId, Long carritoId)
            throws InstanceNotFoundException, PermissionException;

    Carrito createVenta(Long userId, Long carritoId, boolean ventaTotal, boolean esSocio)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException;

    void createVenta(Long pedidoId, boolean esSocio)
            throws InstanceNotFoundException, InsufficientStockException;

    Carrito createPedido(Long userId, Long carritoId, String reserva)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException;

    void createArticulo(String name, Genero genero, boolean esRopa, BigDecimal precio, BigDecimal precioSocio,
                        byte[] imageBytes, String fileType, List<StockTalla> stockTallas)
            throws UnsupportedFileTypeException, IOException, InstanceNotFoundException;

    void updateArticulo(Long articuloId, String name, Genero genero, boolean esRopa, BigDecimal precio, BigDecimal precioSocio,
                        boolean updateImage, byte[] imageBytes, String fileType, List<StockTalla> stockTallas)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException;

    void addMoreExistencias(StockArticulo stockArticulo) throws InstanceNotFoundException;

    List<StockArticulo> getVentaResumen(LocalDate beginDate, LocalDate endDate);

    Block<Pedido> getPedidosBlock(String reserva, int page, int size);

    void deletePedido(Long pedidoId)
            throws InstanceNotFoundException;

}
