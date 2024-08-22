package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class VentaDetalle {

    private long id;
    private Venta venta;
    private long cantidad;
    private BigDecimal costeUnidad;
    private Articulo articulo;
    private Talla talla;

    public VentaDetalle() {
    }

    public VentaDetalle(Venta venta, long cantidad, BigDecimal costeUnidad, Articulo articulo, Talla talla) {
        this.venta = venta;
        this.cantidad = cantidad;
        this.costeUnidad = costeUnidad;
        this.articulo = articulo;
        this.talla = talla;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "ventaId")
    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public long getCantidad() {
        return cantidad;
    }

    public void setCantidad(long cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getCosteUnidad() {
        return costeUnidad;
    }

    public void setCosteUnidad(BigDecimal costeUnidad) {
        this.costeUnidad = costeUnidad;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "articuloId")
    public Articulo getArticulo() {
        return articulo;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tallaId")
    public Talla getTalla() {
        return talla;
    }

    public void setTalla(Talla talla) {
        this.talla = talla;
    }
}
