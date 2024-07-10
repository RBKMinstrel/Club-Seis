package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class CarritoItemDto {

    private Long articuloId;
    private String articuloName;
    private Long tallaId;
    private BigDecimal articuloPrecio;
    private BigDecimal articuloPrecioSocio;
    private int quantity;

    public CarritoItemDto() {
    }

    public CarritoItemDto(Long articuloId, String articuloName, Long tallaId, BigDecimal articuloPrecio, BigDecimal articuloPrecioSocio, int quantity) {
        this.articuloId = articuloId;
        this.articuloName = articuloName;
        this.tallaId = tallaId;
        this.articuloPrecio = articuloPrecio;
        this.articuloPrecioSocio = articuloPrecioSocio;
        this.quantity = quantity;
    }

    public Long getArticuloId() {
        return articuloId;
    }

    public void setArticuloId(Long articuloId) {
        this.articuloId = articuloId;
    }

    public String getArticuloName() {
        return articuloName;
    }

    public void setArticuloName(String articuloName) {
        this.articuloName = articuloName;
    }

    public Long getTallaId() {
        return tallaId;
    }

    public void setTallaId(Long tallaId) {
        this.tallaId = tallaId;
    }

    public BigDecimal getArticuloPrecio() {
        return articuloPrecio;
    }

    public void setArticuloPrecio(BigDecimal articuloPrecio) {
        this.articuloPrecio = articuloPrecio;
    }

    public BigDecimal getArticuloPrecioSocio() {
        return articuloPrecioSocio;
    }

    public void setArticuloPrecioSocio(BigDecimal articuloPrecioSocio) {
        this.articuloPrecioSocio = articuloPrecioSocio;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
