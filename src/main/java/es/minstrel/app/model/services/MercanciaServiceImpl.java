package es.minstrel.app.model.services;

import es.minstrel.app.model.entities.*;
import es.minstrel.app.model.exceptions.*;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.FileType;
import es.minstrel.app.model.services.utils.StockArticulo;
import es.minstrel.app.model.services.utils.StockTalla;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class MercanciaServiceImpl implements MercanciaService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private PermissionChecker permissionChecker;

    @Autowired
    private TallaDao tallaDao;

    @Autowired
    private ArticuloDao articuloDao;

    @Autowired
    private ExistenciasDao existenciasDao;

    @Autowired
    private CarritoDao carritoDao;

    @Autowired
    private CarritoItemDao carritoItemDao;

    @Autowired
    private VentaDao ventaDao;

    @Autowired
    private VentaDetalleDao ventaDetalleDao;

    @Autowired
    private PedidoDao pedidoDao;

    @Autowired
    private PedidoDetalleDao pedidoDetalleDao;

    @Value("${app.folders}")
    private String[] folderPaths;

    private Articulo getArticuloFromId(Long articuloId)
            throws InstanceNotFoundException {
        Optional<Articulo> articuloOptional = articuloDao.findById(articuloId);

        if (articuloOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.articulo", articuloId);

        return articuloOptional.get();
    }

    private Talla getTallaFromId(Long tallaId)
            throws InstanceNotFoundException {
        Optional<Talla> tallaOptional = tallaDao.findById(tallaId);

        if (tallaOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.talla", tallaId);

        return tallaOptional.get();
    }

    @Override
    public void createTalla(String talla) throws DuplicateInstanceException {
        Optional<Talla> optionalTalla = tallaDao.findByName(talla);

        if (optionalTalla.isEmpty()) {
            tallaDao.save(new Talla(talla));
        } else {
            throw new DuplicateInstanceException("project.entities.talla", talla);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Talla> getTallaList() {
        return tallaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Articulo getArticulo(Long articuloId)
            throws InstanceNotFoundException {
        Optional<Articulo> articuloOptional = articuloDao.findById(articuloId);

        if (articuloOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.articulo", articuloId);

        return articuloOptional.get();
    }

    @Override
    public Carrito getCarrito(Long userId)
            throws InstanceNotFoundException {
        User user = permissionChecker.checkUser(userId);
        Optional<Carrito> carritoOptional = carritoDao.findByUser(user);

        if (carritoOptional.isPresent()) {
            return carritoOptional.get();
        } else {
            Carrito carrito = new Carrito(user);
            return carritoDao.save(carrito);
        }

    }

    @Override
    public Carrito addToCarrito(Long userId, Long carritoId, Long articuloId, Long tallaId, int quantity)
            throws InstanceNotFoundException, PermissionException {
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);
        Articulo articulo = getArticuloFromId(articuloId);
        Talla talla = tallaId == null ? null : getTallaFromId(tallaId);

        Optional<CarritoItem> carritoItemOptional =
                carrito.getItem(articulo, talla);

        if (carritoItemOptional.isPresent()) {
            carritoItemOptional.get().incrementQuantity(quantity);
        } else {
            CarritoItem carritoItem = new CarritoItem(quantity, carrito, articulo, talla);
            carrito.addItem(carritoItem);
            carritoItemDao.save(carritoItem);
        }

        return carrito;
    }

    @Override
    public Carrito updateCarritoItem(Long userId, Long carritoId, Long articuloId, Long tallaId, int quantity)
            throws InstanceNotFoundException, PermissionException {
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);
        Articulo articulo = getArticuloFromId(articuloId);
        Talla talla = tallaId == null ? null : getTallaFromId(tallaId);
        Optional<CarritoItem> carritoItemOptional = carrito.getItem(articulo, talla);

        if (carritoItemOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.articulo", articuloId);

        carritoItemOptional.get().setQuantity(quantity);

        return carrito;
    }

    @Override
    public Carrito removeCarritoItem(Long userId, Long carritoId, Long articuloId, Long tallaId) throws InstanceNotFoundException, PermissionException {
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);
        Articulo articulo = getArticuloFromId(articuloId);
        Talla talla = tallaId == null ? null : getTallaFromId(tallaId);
        Optional<CarritoItem> carritoItemOptional = carrito.getItem(articulo, talla);

        if (carritoItemOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.articulo", articuloId);

        carrito.removeItem(carritoItemOptional.get());
        carritoItemDao.delete(carritoItemOptional.get());

        return carrito;
    }

    @Override
    public Carrito cleanCarrito(Long userId, Long carritoId) throws InstanceNotFoundException, PermissionException {
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);

        carritoItemDao.deleteAll(carrito.getCarritoItems());
        carrito.removeAll();

        return carrito;
    }

    @Override
    @Transactional(readOnly = true)
    public Block<Articulo> getArticuloBlock(String name, Boolean tipo, Byte genero, int page, int size) {

        Page<Articulo> articuloPage = articuloDao.find(name, tipo, genero, page, size);
        return new Block<>(articuloPage.getContent(), articuloPage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public FileType getImageArticulo(Long articuloId)
            throws IOException, InstanceNotFoundException {

        Articulo articulo = this.getArticulo(articuloId);
        if (articulo.getImagepath() == null)
            return null;

        Path imagePath = Paths.get(articulo.getImagepath());

        // Verificar si el archivo existe
        if (!Files.exists(imagePath)) {
            return null;
        }

        String contentType = Files.probeContentType(imagePath);
        byte[] imageBytes = Files.readAllBytes(imagePath);

        return new FileType(contentType, imageBytes);
    }

    @Override
    public Carrito createVenta(Long userId, Long carritoId, boolean ventaTotal, boolean esSocio)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException, EmptyAcquireException { //Arreglar venta vacia
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);

        if (carrito.isEmpty())
            throw new EmptyCarritoException();

        Venta venta = new Venta(LocalDate.now());
        ventaDao.save(venta);

        List<CarritoItem> itemsAEliminar = new ArrayList<>();
        boolean vacio = true;

        //Iteramos por el carrito
        for (CarritoItem carritoItem : carrito.getCarritoItems()) {
            Optional<Existencias> existenciaOptional = existenciasDao.findByArticuloAndTalla(carritoItem.getArticulo(), carritoItem.getTalla());

            //Compruebo que haya existencia creada
            if (existenciaOptional.isEmpty())
                continue;

            Existencias existencias = existenciaOptional.get();
            VentaDetalle ventaDetalle;

            if (existencias.getCantidad() >= carritoItem.getQuantity()) {
                existencias.setCantidad(existencias.getCantidad() - carritoItem.getQuantity());

                ventaDetalle = new VentaDetalle();
                ventaDetalle.setVenta(venta);
                ventaDetalle.setArticulo(carritoItem.getArticulo());
                ventaDetalle.setCantidad(carritoItem.getQuantity());
                ventaDetalle.setCosteUnidad(esSocio ? carritoItem.getArticulo().getPrecioSocio() : carritoItem.getArticulo().getPrecio());
                ventaDetalle.setTalla(carritoItem.getTalla());
                ventaDetalleDao.save(ventaDetalle);

                carritoItemDao.delete(carritoItem);
                itemsAEliminar.add(carritoItem);
                vacio = false;

            } else if (existencias.getCantidad() != 0 && !ventaTotal) {
                long cantidadPendiente = carritoItem.getQuantity() - existencias.getCantidad();

                ventaDetalle = new VentaDetalle();
                ventaDetalle.setVenta(venta);
                ventaDetalle.setArticulo(carritoItem.getArticulo());
                ventaDetalle.setCantidad(existencias.getCantidad());
                ventaDetalle.setCosteUnidad(esSocio ? carritoItem.getArticulo().getPrecioSocio() : carritoItem.getArticulo().getPrecio());
                ventaDetalle.setTalla(carritoItem.getTalla());
                ventaDetalleDao.save(ventaDetalle);

                existencias.setCantidad(0);

                carritoItem.setQuantity(cantidadPendiente);
                vacio = false;

            }
        }

        if (vacio)
            throw new EmptyAcquireException();

        for (CarritoItem carritoItem : itemsAEliminar)
            carrito.removeItem(carritoItem);

        return carrito;
    }

    @Override
    public void createVenta(Long pedidoId, boolean esSocio)
            throws InstanceNotFoundException, InsufficientStockException {//Arreglar venta vacia
        Optional<Pedido> pedidoOptional = pedidoDao.findById(pedidoId);

        if (pedidoOptional.isEmpty())
            throw new InstanceNotFoundException("project.entities.pedido", pedidoId);

        Pedido pedido = pedidoOptional.get();
        Venta venta = new Venta(LocalDate.now());
        ventaDao.save(venta);

        for (PedidoDetalle pedidoDetalle : pedido.getPedidoDetalles()) {
            Optional<Existencias> existenciasOptional =
                    existenciasDao.findByArticuloAndTalla(pedidoDetalle.getArticulo(), pedidoDetalle.getTalla());

            if (existenciasOptional.isEmpty())
                throw new InsufficientStockException();

            Existencias existencias = existenciasOptional.get();
            Articulo articulo = existencias.getArticulo();
            Talla talla = existencias.getTalla();

            if (existencias.getCantidad() < pedidoDetalle.getCantidad())
                throw new InsufficientStockException();

            existencias.setCantidad(existencias.getCantidad() - pedidoDetalle.getCantidad());

            VentaDetalle ventaDetalle = new VentaDetalle(venta, pedidoDetalle.getCantidad(),
                    esSocio ? articulo.getPrecioSocio() : articulo.getPrecio(), articulo, talla);

            ventaDetalleDao.save(ventaDetalle);
        }

        pedidoDao.delete(pedido);

    }

    @Override
    public Carrito createPedido(Long userId, Long carritoId, String reserva)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException {
        Carrito carrito = permissionChecker.checkCarritoExistsAndBelongsTo(carritoId, userId);

        if (carrito.isEmpty())
            throw new EmptyCarritoException();

        Pedido pedido = new Pedido(reserva, LocalDate.now());
        pedidoDao.save(pedido);

        for (CarritoItem carritoItem : carrito.getCarritoItems()) {

            PedidoDetalle pedidoDetalle = new PedidoDetalle(pedido, carritoItem.getQuantity(), carritoItem.getArticulo(), carritoItem.getTalla());
            pedidoDetalleDao.save(pedidoDetalle);

            carritoItemDao.delete(carritoItem);
        }

        carrito.removeAll();

        return carrito;
    }

    private void saveFile(byte[] imageBytes, String fileType, Articulo articulo) throws IOException, UnsupportedFileTypeException {
        String extension = commonService.getExtensionFromMimeType(fileType);
        String newFileName = UUID.randomUUID() + extension;
        Path filePath = Paths.get(folderPaths[1], newFileName);
        Files.write(filePath, imageBytes);

        articulo.setImagename(newFileName);
        articulo.setImagepath(filePath.toString());
    }

    // Método para eliminar el archivo
    private void deleteFile(Articulo articulo) throws IOException {
        String imagePath = articulo.getImagepath();

        if (imagePath != null) {
            Path filePath = Paths.get(imagePath);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
        }

        articulo.setImagename(null);
        articulo.setImagepath(null);
    }

    @Override
    public void createArticulo(String name, Articulo.Genero genero, boolean esRopa, BigDecimal precio, BigDecimal precioSocio,
                               byte[] imageBytes, String fileType, List<StockTalla> stockTallas)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {
        Articulo articulo = new Articulo();
        articulo.setName(name);
        articulo.setGenero(genero);
        articulo.setEsRopa(esRopa);
        articulo.setPrecio(precio);
        articulo.setPrecioSocio(precioSocio);

        if (imageBytes.length != 0 && !fileType.isEmpty())
            saveFile(imageBytes, fileType, articulo);

        articuloDao.save(articulo);

        for (StockTalla stockTalla : stockTallas) {
            Talla talla = stockTalla.getIdTalla() == null ? null : getTallaFromId(stockTalla.getIdTalla());

            Existencias existencias = new Existencias(stockTalla.getStock(), articulo, talla);
            existenciasDao.save(existencias);
        }

    }

    @Override
    public void updateArticulo(Long articuloId, String name, Articulo.Genero genero, boolean esRopa, BigDecimal precio,
                               BigDecimal precioSocio, boolean updateImage, byte[] imageBytes, String fileType, List<StockTalla> stockTallas)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {
        Articulo articulo = getArticuloFromId(articuloId);

        articulo.setName(name);
        articulo.setGenero(genero);
        articulo.setEsRopa(esRopa);
        articulo.setPrecio(precio);
        articulo.setPrecioSocio(precioSocio);

        if (updateImage) {

            deleteFile(articulo);

            if (imageBytes.length != 0 && !fileType.isEmpty())
                saveFile(imageBytes, fileType, articulo);

        }

        existenciasDao.deleteAll(articulo.getExistencias());
        articulo.setExistencias(new HashSet<>());

        for (StockTalla stockTalla : stockTallas) {
            Talla talla = stockTalla.getIdTalla() == null ? null : getTallaFromId(stockTalla.getIdTalla());

            Existencias existencias = new Existencias(stockTalla.getStock(), articulo, talla);
            existenciasDao.save(existencias);
        }

    }

    @Override
    public void addMoreExistencias(StockArticulo stockArticulo)
            throws InstanceNotFoundException {
        Articulo articulo = getArticuloFromId(stockArticulo.getIdArticulo());

        List<StockTalla> stockTallas = stockArticulo.getStockTallas();

        for (StockTalla stockTalla : stockTallas) {
            Talla talla = stockTalla.getIdTalla() == null ? null : getTallaFromId(stockTalla.getIdTalla());

            Optional<Existencias> existenciaOptional = existenciasDao.findByArticuloAndTalla(articulo, talla);
            Existencias existencias;

            if (existenciaOptional.isPresent()) {
                existencias = existenciaOptional.get();
                existencias.setCantidad(existencias.getCantidad() + stockTalla.getStock());
            } else {
                existencias = new Existencias(stockTalla.getStock(), articulo, talla);
                existenciasDao.save(existencias);
            }
        }

    }

    @Override
    @Transactional(readOnly = true)
    public List<StockArticulo> getVentaResumen(LocalDate beginDate, LocalDate endDate) {
        List<VentaDetalle> ventaDetalles = ventaDetalleDao.findByVenta_FechaBetween(beginDate, endDate);
        return ventaDetalles.stream().collect(Collectors.groupingBy(VentaDetalle::getArticulo)).values().stream()
                .map(v -> {
                    Articulo articulo = v.get(0).getArticulo();
                    List<StockTalla> stockTallas =
                            v.stream().collect(Collectors.groupingBy(
                                            i -> Optional.ofNullable(i.getTalla()).map(Talla::getId).orElse(-1L)
                                    )).values().stream()
                                    .map(t -> {
                                        StockTalla stockTalla = new StockTalla();
                                        Talla talla = t.get(0).getTalla();
                                        stockTalla.setIdTalla(talla != null ? talla.getId() : null);
                                        stockTalla.setStock(t.stream().mapToLong(VentaDetalle::getCantidad).sum());
                                        return stockTalla;
                                    }).toList();
                    return new StockArticulo(articulo.getId(), articulo.getName(), stockTallas);
                }).toList();
    }

    @Override
    public Block<Pedido> getPedidosBlock(String reserva, int page, int size) {
        Page<Pedido> pedidoBlock;

        if (reserva == null || reserva.isEmpty()) {
            pedidoBlock = pedidoDao.findAll(PageRequest.of(page, size));
        } else {
            pedidoBlock = pedidoDao.findByReservaIsLikeIgnoreCase("%" + reserva + "%", PageRequest.of(page, size));
        }

        return new Block<>(pedidoBlock.getContent(), pedidoBlock.getTotalElements());
    }

    @Override
    public void deletePedido(Long pedidoId)
            throws InstanceNotFoundException {
        Optional<Pedido> pedidoOptional = pedidoDao.findById(pedidoId);
        if (pedidoOptional.isPresent()) {
            pedidoDao.delete(pedidoOptional.get());
        } else {
            throw new InstanceNotFoundException("project.entities.pedido", pedidoId);
        }
    }
}
