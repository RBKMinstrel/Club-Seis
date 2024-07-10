package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
public class Carrito {

    private long id;
    private User user;
    private Set<CarritoItem> carritoItems = new HashSet<>();

    public Carrito() {
    }

    public Carrito(User user) {
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(mappedBy = "carrito")
    public Set<CarritoItem> getCarritoItems() {
        return carritoItems;
    }

    public void setCarritoItems(Set<CarritoItem> carritoItems) {
        this.carritoItems = carritoItems;
    }

    @Transient
    public Optional<CarritoItem> getItem(Articulo articulo, Talla talla) {
        return carritoItems.stream().filter(
                item ->
                        (item.getArticulo().getId() == articulo.getId()) && (item.getTalla() == talla)
        ).findFirst();
    }

    public void addItem(CarritoItem item) {
        carritoItems.add(item);
        item.setCarrito(this);
    }

    public void removeAll() {
        carritoItems = new HashSet<>();
    }

    public void removeItem(CarritoItem carritoItem) {
        carritoItems.remove(carritoItem);
    }

    @Transient
    public BigDecimal getTotalPrecio() {
        return carritoItems.stream().map(i -> i.getArticulo().getPrecio().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(new BigDecimal(0), BigDecimal::add);
    }

    @Transient
    public BigDecimal getTotalPrecioSocio() {
        return carritoItems.stream().map(i -> i.getArticulo().getPrecioSocio().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(new BigDecimal(0), BigDecimal::add);
    }

    @Transient
    public boolean isEmpty() {
        return carritoItems.isEmpty();
    }
}
