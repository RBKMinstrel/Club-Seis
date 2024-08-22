package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class FacturaItemDto {

    private String concepto;
    private int iva;
    private int cantidad;
    private BigDecimal amount;

    public FacturaItemDto(String concepto, int iva, int cantidad, BigDecimal amount) {
        this.concepto = concepto;
        this.iva = iva;
        this.cantidad = cantidad;
        this.amount = amount;
    }

    public FacturaItemDto() {
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public int getIva() {
        return iva;
    }

    public void setIva(int iva) {
        this.iva = iva;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
