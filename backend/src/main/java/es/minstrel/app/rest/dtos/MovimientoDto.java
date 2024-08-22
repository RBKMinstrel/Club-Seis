package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Factura;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;

import java.math.BigDecimal;

public class MovimientoDto {

    private Long id;
    private Long fecha;
    private Boolean esGasto;
    private BigDecimal base0;
    private BigDecimal base4;
    private BigDecimal base10;
    private BigDecimal base21;
    private Long razonSocial;
    private Long concepto;
    private Long categoria;
    private Long cuenta;
    private Factura factura;

    public MovimientoDto() {
    }

    public MovimientoDto(Long id, Long fecha, Boolean esGasto, BigDecimal base0, BigDecimal base4, BigDecimal base10, BigDecimal base21, Long razonSocial, Long concepto, Long categoria, Long cuenta) {
        this.id = id;
        this.fecha = fecha;
        this.esGasto = esGasto;
        this.base0 = base0;
        this.base4 = base4;
        this.base10 = base10;
        this.base21 = base21;
        this.razonSocial = razonSocial;
        this.concepto = concepto;
        this.categoria = categoria;
        this.cuenta = cuenta;
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

    public Boolean getEsGasto() {
        return esGasto;
    }

    public void setEsGasto(Boolean esGasto) {
        this.esGasto = esGasto;
    }

    public BigDecimal getBase0() {
        return base0;
    }

    public void setBase0(BigDecimal base0) {
        this.base0 = base0;
    }

    public BigDecimal getBase4() {
        return base4;
    }

    public void setBase4(BigDecimal base4) {
        this.base4 = base4;
    }

    public BigDecimal getBase10() {
        return base10;
    }

    public void setBase10(BigDecimal base10) {
        this.base10 = base10;
    }

    public BigDecimal getBase21() {
        return base21;
    }

    public void setBase21(BigDecimal base21) {
        this.base21 = base21;
    }

    public Long getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(Long razonSocial) {
        this.razonSocial = razonSocial;
    }

    public Long getConcepto() {
        return concepto;
    }

    public void setConcepto(Long concepto) {
        this.concepto = concepto;
    }

    public Long getCategoria() {
        return categoria;
    }

    public void setCategoria(Long categoria) {
        this.categoria = categoria;
    }

    public Long getCuenta() {
        return cuenta;
    }

    public void setCuenta(Long cuenta) {
        this.cuenta = cuenta;
    }

    @OneToOne(mappedBy = "movimiento", fetch = FetchType.LAZY)
    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }
}
