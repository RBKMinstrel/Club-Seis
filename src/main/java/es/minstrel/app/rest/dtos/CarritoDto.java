package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;
import java.util.List;

public class CarritoDto {

    private Long id;
    private List<CarritoItemDto> items;
    private BigDecimal totalPrice;
    private BigDecimal totalPriceSocio;

    public CarritoDto() {
    }

    public CarritoDto(Long id, List<CarritoItemDto> items, BigDecimal totalPrice, BigDecimal totalPriceSocio) {
        this.id = id;
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalPriceSocio = totalPriceSocio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CarritoItemDto> getItems() {
        return items;
    }

    public void setItems(List<CarritoItemDto> items) {
        this.items = items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getTotalPriceSocio() {
        return totalPriceSocio;
    }

    public void setTotalPriceSocio(BigDecimal totalPriceSocio) {
        this.totalPriceSocio = totalPriceSocio;
    }
}
