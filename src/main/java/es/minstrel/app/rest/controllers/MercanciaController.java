package es.minstrel.app.rest.controllers;

import es.minstrel.app.model.entities.Articulo;
import es.minstrel.app.model.entities.Carrito;
import es.minstrel.app.model.entities.Pedido;
import es.minstrel.app.model.exceptions.*;
import es.minstrel.app.model.services.MercanciaService;
import es.minstrel.app.model.services.utils.Block;
import es.minstrel.app.model.services.utils.FileType;
import es.minstrel.app.model.services.utils.StockArticulo;
import es.minstrel.app.rest.common.ErrorsDto;

import es.minstrel.app.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Locale;

import static es.minstrel.app.rest.dtos.ArticuloConversor.*;
import static es.minstrel.app.rest.dtos.CarritoConversor.toCarritoDto;
import static es.minstrel.app.rest.dtos.FechaConversor.fromDays;
import static es.minstrel.app.rest.dtos.PedidoConversor.toPedidoDtos;

@RestController
@RequestMapping("/api/mercancias")
public class MercanciaController {

    private final static String Insufficient_Stock_Exception_CODE = "project.exceptions.InsufficientStockException";

    private final static String UnsupportedFileTypeException_CODE = "project.exceptions.UnsupportedFileTypeException";


    @Autowired
    private MessageSource messageSource;

    @Autowired
    private MercanciaService mercanciaService;

    @ExceptionHandler(InsufficientStockException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public ErrorsDto handleInsufficientStockException(InsufficientStockException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(Insufficient_Stock_Exception_CODE, null,
                Insufficient_Stock_Exception_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(UnsupportedFileTypeException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ResponseBody
    public ErrorsDto handleUnsupportedFileTypeException(UnsupportedFileTypeException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(UnsupportedFileTypeException_CODE, null,
                UnsupportedFileTypeException_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/tallas")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createTalla(@RequestBody TallaDto tallaDto)
            throws DuplicateInstanceException {
        mercanciaService.createTalla(tallaDto.getName());
    }

    @GetMapping("/tallas")
    public List<TallaDto> getTallas() {
        return mercanciaService.getTallaList().stream().map(talla -> new TallaDto(talla.getId(), talla.getName())).toList();
    }

    @GetMapping("/articulos")
    public BlockDto<ArticuloDto> getArticulos(@RequestParam(required = false) String name,
                                              @RequestParam(required = false) Boolean tipo,
                                              @RequestParam(required = false) Byte genero,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "12") int size)
            throws InstanceNotFoundException, IOException {

        Block<Articulo> articuloBlock = mercanciaService.getArticuloBlock(name, tipo, genero, page, size);
        List<ArticuloDto> articuloDtos = toArticuloDtos(articuloBlock.getItems());
        for (ArticuloDto articuloDto : articuloDtos) {
            FileType imageArticulo = mercanciaService.getImageArticulo(articuloDto.getId());
            if (imageArticulo != null) {
                articuloDto.setFileType(imageArticulo.getContentType());
                articuloDto.setImageBytes(imageArticulo.getBase64Content());
            }
        }
        return new BlockDto<>(articuloDtos, articuloBlock.getTotalItems());
    }

    @GetMapping("/articulos/{id}/image")
    public FileTypeDto getArticuloImage(@PathVariable Long id) throws InstanceNotFoundException, IOException {
        FileType fileType = mercanciaService.getImageArticulo(id);
        if (fileType == null)
            return null;
        return new FileTypeDto(fileType.getContentType(), fileType.getBase64Content());
    }

    @GetMapping("/articulos/{id}")
    public ArticuloDto getArticulo(@PathVariable Long id) throws InstanceNotFoundException, IOException {
        Articulo articulo = mercanciaService.getArticulo(id);
        ArticuloDto articuloDto = toArticuloDto(articulo);
        FileType imageArticulo = mercanciaService.getImageArticulo(id);
        if (imageArticulo != null) {
            articuloDto.setFileType(imageArticulo.getContentType());
            articuloDto.setImageBytes(imageArticulo.getBase64Content());
        }
        return articuloDto;
    }

    @PostMapping("/articulos")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createArticulo(@RequestBody ArticuloDto articuloDto)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {

        mercanciaService.createArticulo(articuloDto.getName(), Articulo.Genero.fromValor(articuloDto.getGenero()),
                articuloDto.isEsRopa(), articuloDto.getPrecio(), articuloDto.getPrecioSocio(),
                Base64.getDecoder().decode(articuloDto.getImageBytes()),
                articuloDto.getFileType(), toStockTallas(articuloDto.getStockList()));
    }

    @PutMapping("/articulos")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateArticulo(@RequestBody ArticuloDto articuloDto)
            throws InstanceNotFoundException, UnsupportedFileTypeException, IOException {
        mercanciaService.updateArticulo(articuloDto.getId(), articuloDto.getName(), Articulo.Genero.fromValor(articuloDto.getGenero()),
                articuloDto.isEsRopa(), articuloDto.getPrecio(), articuloDto.getPrecioSocio(), articuloDto.isUpdateImage(),
                Base64.getDecoder().decode(articuloDto.getImageBytes()), articuloDto.getFileType(), toStockTallas(articuloDto.getStockList()));
    }

    @GetMapping("/carritos")
    public CarritoDto getCarrito(@RequestAttribute Long userId)
            throws InstanceNotFoundException {
        Carrito carrito = mercanciaService.getCarrito(userId);
        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}")
    public CarritoDto addToCarrito(@RequestAttribute Long userId, @PathVariable Long id,
                                   @RequestParam Long articuloId,
                                   @RequestParam(required = false) Long tallaId,
                                   @RequestParam int quantity)
            throws PermissionException, InstanceNotFoundException {
        Carrito carrito = mercanciaService.addToCarrito(userId, id, articuloId, tallaId, quantity);
        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}/changeQuantity")
    public CarritoDto updateCarritoItem(@RequestAttribute Long userId, @PathVariable Long id,
                                        @RequestParam Long articuloId,
                                        @RequestParam(required = false) Long tallaId,
                                        @RequestParam int quantity)
            throws PermissionException, InstanceNotFoundException {
        Carrito carrito = mercanciaService.updateCarritoItem(userId, id, articuloId, tallaId, quantity);
        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}/deleteItem")
    public CarritoDto removeCarritoItem(@RequestAttribute Long userId, @PathVariable Long id,
                                        @RequestParam Long articuloId,
                                        @RequestParam(required = false) Long tallaId)
            throws PermissionException, InstanceNotFoundException {
        Carrito carrito = mercanciaService.removeCarritoItem(userId, id, articuloId, tallaId);
        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}/deleteAllItems")
    public CarritoDto cleanCarrito(@RequestAttribute Long userId, @PathVariable Long id)
            throws PermissionException, InstanceNotFoundException {
        Carrito carrito = mercanciaService.cleanCarrito(userId, id);
        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}/comprar")
    public CarritoDto createVenta(@RequestAttribute Long userId, @PathVariable Long id,
                                  @RequestParam(defaultValue = "false") boolean ventaTotal,
                                  @RequestParam(defaultValue = "false") boolean esSocio)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException {

        Carrito carrito = mercanciaService.createVenta(userId, id, ventaTotal, esSocio);

        return toCarritoDto(carrito);
    }

    @PostMapping("/carritos/{id}/pedir")
    public CarritoDto createPedido(@RequestAttribute Long userId, @PathVariable Long id,
                                   @RequestParam String reserva)
            throws InstanceNotFoundException, PermissionException, EmptyCarritoException {

        Carrito carrito = mercanciaService.createPedido(userId, id, reserva);

        return toCarritoDto(carrito);
    }

    @PostMapping("/pedidos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createVenta(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean esSocio)
            throws InstanceNotFoundException, InsufficientStockException {
        mercanciaService.createVenta(id, esSocio);
    }

    @PostMapping("/articulos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addMoreExistencias(@PathVariable Long id,
                                   @RequestBody ArticuloStockDto articuloStockDto)
            throws InstanceNotFoundException {
        mercanciaService.addMoreExistencias(toStockArticulo(articuloStockDto));
    }

    @GetMapping("/demanda")
    public List<ArticuloStockDto> getVentasResumen(@RequestParam long beginDate,
                                                   @RequestParam long endDate) {
        LocalDate beginLocalDate = fromDays(beginDate);
        LocalDate endLocalDate = fromDays(endDate);
        return toArticuloStockDtos(mercanciaService.getVentaResumen(beginLocalDate, endLocalDate));
    }

    @GetMapping("/pedidos")
    public BlockDto<PedidoDto> getPedidosBlock(@RequestParam(required = false) String reserva,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "12") int size) {
        Block<Pedido> pedidosBlock = mercanciaService.getPedidosBlock(reserva, page, size);

        return new BlockDto<>(toPedidoDtos(pedidosBlock.getItems()), pedidosBlock.getTotalItems());
    }

    @DeleteMapping("/pedidos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePedido(@PathVariable Long id)
            throws InstanceNotFoundException {
        mercanciaService.deletePedido(id);
    }

}
