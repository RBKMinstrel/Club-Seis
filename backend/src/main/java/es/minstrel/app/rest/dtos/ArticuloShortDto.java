package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;
import java.util.List;

public class ArticuloShortDto extends ArticuloStockDto {

    private BigDecimal precio;
    private BigDecimal precioSocio;

    public ArticuloShortDto() {
        super();
    }

    public ArticuloShortDto(Long id, String name, BigDecimal precio, BigDecimal precioSocio, List<StockDto> stockList) {
        super(id, name, stockList);
        this.precio = precio;
        this.precioSocio = precioSocio;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getPrecioSocio() {
        return precioSocio;
    }

    public void setPrecioSocio(BigDecimal precioSocio) {
        this.precioSocio = precioSocio;
    }

}
