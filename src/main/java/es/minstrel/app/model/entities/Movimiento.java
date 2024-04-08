package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Entity
public class Movimiento {

    private long id;
    private LocalDate fecha;
    private boolean esGasto;
    private BigDecimal base0;
    private BigDecimal base4;
    private BigDecimal base10;
    private BigDecimal base21;
    private RazonSocial razonSocial;
    private Concepto concepto;
    private Categoria categoria;
    private Cuenta cuenta;

    public Movimiento() {
    }

    public Movimiento(LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4, BigDecimal base10, BigDecimal base21) {
        this.fecha = fecha;
        this.esGasto = esGasto;
        this.base0 = base0;
        this.base4 = base4;
        this.base10 = base10;
        this.base21 = base21;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public boolean isEsGasto() {
        return esGasto;
    }

    public void setEsGasto(boolean esGasto) {
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

    @ManyToOne()
    @JoinColumn(name = "razonSocialId")
    public RazonSocial getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(RazonSocial razonSocial) {
        this.razonSocial = razonSocial;
    }

    @ManyToOne()
    @JoinColumn(name = "conceptoId")
    public Concepto getConcepto() {
        return concepto;
    }

    public void setConcepto(Concepto concepto) {
        this.concepto = concepto;
    }

    @ManyToOne()
    @JoinColumn(name = "categoriaId")
    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    @ManyToOne()
    @JoinColumn(name = "cuentaId")
    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }

    @Transient
    public BigDecimal getIva4() {
        return base4.multiply(new BigDecimal("0.04")).setScale(2, RoundingMode.HALF_DOWN);
    }

    @Transient
    public BigDecimal getIva10() {
        return base10.multiply(new BigDecimal("0.1")).setScale(2, RoundingMode.HALF_DOWN);
    }

    @Transient
    public BigDecimal getIva21() {
        return base21.multiply(new BigDecimal("0.21")).setScale(2, RoundingMode.HALF_DOWN);
    }

    @Transient
    public BigDecimal getBaseTotal() {
        return base0.add(base4).add(base10).add(base21);
    }

    @Transient
    public BigDecimal getIvaTotal() {
        return getIva4().add(getIva10()).add(getIva21());
    }

    @Transient
    public BigDecimal getTotal() {
        return getBaseTotal().add(getIvaTotal());
    }
}
