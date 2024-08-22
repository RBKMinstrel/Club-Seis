package es.minstrel.app.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Pedido {

    private long id;
    private String reserva;
    private LocalDate fecha;
    private Set<PedidoDetalle> pedidoDetalles = new HashSet<>();

    public Pedido() {
    }

    public Pedido(String reserva, LocalDate fecha) {
        this.reserva = reserva;
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

    public String getReserva() {
        return reserva;
    }

    public void setReserva(String reserva) {
        this.reserva = reserva;
    }

    @OneToMany(mappedBy = "pedido")
    public Set<PedidoDetalle> getPedidoDetalles() {
        return pedidoDetalles;
    }

    public void setPedidoDetalles(Set<PedidoDetalle> pedidoDetalles) {
        this.pedidoDetalles = pedidoDetalles;
    }
}
