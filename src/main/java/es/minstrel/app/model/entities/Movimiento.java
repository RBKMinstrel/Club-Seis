package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
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

    public Movimiento(LocalDate fecha, boolean esGasto, BigDecimal base0, BigDecimal base4, BigDecimal base10, BigDecimal base21, RazonSocial razonSocial, Concepto concepto, Categoria categoria, Cuenta cuenta) {
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

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "razonSocialId")
    public RazonSocial getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(RazonSocial razonSocial) {
        this.razonSocial = razonSocial;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "conceptoId")
    public Concepto getConcepto() {
        return concepto;
    }

    public void setConcepto(Concepto concepto) {
        this.concepto = concepto;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "categoriaId")
    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cuentaId")
    public Cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }
}
