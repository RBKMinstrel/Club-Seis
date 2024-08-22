package es.minstrel.app.rest.dtos;

import java.util.List;

public class PedidoParamsDto {

    private String reserva;
    private List<ArticuloStockDto> articuloStock;

    public PedidoParamsDto() {
    }

    public PedidoParamsDto(String reserva, List<ArticuloStockDto> articuloStock) {
        this.reserva = reserva;
        this.articuloStock = articuloStock;
    }

    public String getReserva() {
        return reserva;
    }

    public void setReserva(String reserva) {
        this.reserva = reserva;
    }

    public List<ArticuloStockDto> getArticuloStock() {
        return articuloStock;
    }

    public void setArticuloStock(List<ArticuloStockDto> articuloStock) {
        this.articuloStock = articuloStock;
    }
}
