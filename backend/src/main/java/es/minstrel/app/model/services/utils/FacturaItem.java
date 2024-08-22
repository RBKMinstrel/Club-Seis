package es.minstrel.app.model.services.utils;

import java.math.BigDecimal;

public class FacturaItem {

    private String concepto;
    private TipoIVA tipoIVA;
    private int cantidad;
    private BigDecimal precio;

    public FacturaItem(String concepto, TipoIVA tipoIVA, int cantidad, BigDecimal precio) {
        this.concepto = concepto;
        this.tipoIVA = tipoIVA;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    public FacturaItem(String concepto, int tipoIVA, int cantidad, BigDecimal precio) {
        this.concepto = concepto;
        this.tipoIVA = TipoIVA.fromTipo(tipoIVA);
        this.cantidad = cantidad;
        this.precio = precio;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public TipoIVA getTipoIVA() {
        return tipoIVA;
    }

    public void setTipoIVA(TipoIVA tipoIVA) {
        this.tipoIVA = tipoIVA;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
}
