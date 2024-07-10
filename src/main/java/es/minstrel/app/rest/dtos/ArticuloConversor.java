package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Articulo;
import es.minstrel.app.model.entities.Existencias;
import es.minstrel.app.model.services.utils.StockArticulo;
import es.minstrel.app.model.services.utils.StockTalla;

import java.util.List;

public class ArticuloConversor {

    private ArticuloConversor() {
    }

    public final static List<ArticuloDto> toArticuloDtos(List<Articulo> articulos) {
        return articulos.stream().map(ArticuloConversor::toArticuloDto).toList();
    }

    public final static ArticuloDto toArticuloDto(Articulo articulo) {
        return new ArticuloDto(articulo.getId(), articulo.getName(), articulo.getPrecio(),
                articulo.getPrecioSocio(), toStockDtos(articulo.getExistencias().stream().toList()),
                articulo.getGenero().getValor(), articulo.isEsRopa());
    }

    public final static List<ArticuloShortDto> toArticuloShortDtos(List<Articulo> articuloList) {
        return articuloList.stream().map(ArticuloConversor::toArticuloShortDto).toList();
    }

    public final static ArticuloShortDto toArticuloShortDto(Articulo articulo) {
        return new ArticuloShortDto(articulo.getId(), articulo.getName(), articulo.getPrecio(),
                articulo.getPrecioSocio(), toStockDtos(articulo.getExistencias().stream().toList()));
    }

    public final static List<ArticuloStockDto> toArticuloStockDtos(List<StockArticulo> stockArticulos) {
        return stockArticulos.stream().map(ArticuloConversor::toArticuloStockDto).toList();
    }

    public final static ArticuloStockDto toArticuloStockDto(StockArticulo stockArticulo) {
        return new ArticuloStockDto(stockArticulo.getIdArticulo(), stockArticulo.getNameArticulo(),
                toStockDtosFromStockTallas(stockArticulo.getStockTallas()));
    }

    public final static List<StockArticulo> toStockArticulos(List<ArticuloStockDto> articuloStockDtos) {
        return articuloStockDtos.stream().map(ArticuloConversor::toStockArticulo).toList();
    }

    public final static StockArticulo toStockArticulo(ArticuloStockDto articuloStockDto) {
        return new StockArticulo(articuloStockDto.getId(), toStockTallas(articuloStockDto.getStockList()));
    }

    public final static List<StockTalla> toStockTallas(List<StockDto> stockDtos) {
        return stockDtos.stream().map(ArticuloConversor::toStockTalla).toList();
    }

    public final static StockTalla toStockTalla(StockDto stockDto) {
        return new StockTalla(stockDto.getId(), stockDto.getStock());
    }

    public final static List<StockDto> toStockDtos(List<Existencias> existenciasList) {
        return existenciasList.stream().map(ArticuloConversor::toStockDto).toList();
    }

    public final static StockDto toStockDto(Existencias existencias) {
        return new StockDto(existencias.getTalla().getId(), existencias.getTalla().getName(), existencias.getCantidad());
    }

    public final static List<StockDto> toStockDtosFromStockTallas(List<StockTalla> stockTallas) {
        return stockTallas.stream().map(ArticuloConversor::toStockDto).toList();
    }

    public final static StockDto toStockDto(StockTalla stockTalla) {
        return new StockDto(stockTalla.getIdTalla(), stockTalla.getStock());
    }

}
