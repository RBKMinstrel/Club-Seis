package es.minstrel.app.model.entities;

import jakarta.persistence.*;

@Entity
public class CarritoItem {

    private long id;
    private long quantity;
    private Carrito carrito;
    private Articulo articulo;
    private Talla talla;

    public CarritoItem() {
    }

    public CarritoItem(long quantity, Carrito carrito, Articulo articulo, Talla talla) {
        this.quantity = quantity;
        this.carrito = carrito;
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

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "carritoId")
    public Carrito getCarrito() {
        return carrito;
    }

    public void setCarrito(Carrito carrito) {
        this.carrito = carrito;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "articuloId")
    public Articulo getArticulo() {
        return articulo;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    @ManyToOne
    @JoinColumn(name = "tallaId")
    public Talla getTalla() {
        return talla;
    }

    public void setTalla(Talla talla) {
        this.talla = talla;
    }

    public void incrementQuantity(int increment) {
        this.quantity += increment;
    }
}
