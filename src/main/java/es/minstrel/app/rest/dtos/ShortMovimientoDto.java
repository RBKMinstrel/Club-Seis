package es.minstrel.app.rest.dtos;

import java.math.BigDecimal;

public class ShortMovimientoDto {

    private Long id;
    private Long fecha;
    private String razonSocial;
    private String concepto;
    private String categoria;
    private String cuenta;
    private BigDecimal total;
    private boolean gasto;

    public ShortMovimientoDto() {
    }

    public ShortMovimientoDto(Long id, Long fecha, String razonSocial, String concepto, String categoria, String cuenta, BigDecimal total, boolean gasto) {
        this.id = id;
        this.fecha = fecha;
        this.razonSocial = razonSocial;
        this.concepto = concepto;
        this.categoria = categoria;
        this.cuenta = cuenta;
        this.total = total;
        this.gasto = gasto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFecha() {
        return fecha;
    }

    public void setFecha(Long fecha) {
        this.fecha = fecha;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCuenta() {
        return cuenta;
    }

    public void setCuenta(String cuenta) {
        this.cuenta = cuenta;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public boolean isGasto() {
        return gasto;
    }

    public void setGasto(boolean gasto) {
        this.gasto = gasto;
    }
}
