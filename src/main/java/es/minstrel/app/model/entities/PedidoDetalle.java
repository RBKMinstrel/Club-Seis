package es.minstrel.app.model.entities;

import jakarta.persistence.*;

@Entity
public class PedidoDetalle {

    private long id;
    private Pedido pedido;
    private long cantidad;
    private Articulo articulo;
    private Talla talla;

    public PedidoDetalle() {
    }

    public PedidoDetalle(Pedido pedido, long cantidad, Articulo articulo, Talla talla) {
        this.pedido = pedido;
        this.cantidad = cantidad;
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
    @JoinColumn(name = "pedidoId")
    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public long getCantidad() {
        return cantidad;
    }

    public void setCantidad(long cantidad) {
        this.cantidad = cantidad;
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
