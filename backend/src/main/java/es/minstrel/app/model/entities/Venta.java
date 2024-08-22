package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Venta {

    private long id;
    private LocalDate fecha;
    private Set<VentaDetalle> ventaDetalles = new HashSet<>();

    public Venta() {
    }

    public Venta(LocalDate fecha) {
        this.fecha = fecha;
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

    @OneToMany(mappedBy = "venta")
    public Set<VentaDetalle> getVentaDetalles() {
        return ventaDetalles;
    }

    public void setVentaDetalles(Set<VentaDetalle> ventaDetalles) {
        this.ventaDetalles = ventaDetalles;
    }
}
