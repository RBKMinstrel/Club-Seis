package es.minstrel.app.model.entities;

import jakarta.persistence.*;

@Entity
public class Existencias {

    private long id;
    private long cantidad;
    private Articulo articulo;
    private Talla talla;
    private long version;

    public Existencias() {
    }

    public Existencias(long cantidad, Articulo articulo, Talla talla) {
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

    public long getCantidad() {
        return cantidad;
    }

    public void setCantidad(long cantidad) {
        this.cantidad = cantidad;
    }

    @ManyToOne
    @JoinColumn(name = "articuloId", nullable = false)
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

    @Version
    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }
}
