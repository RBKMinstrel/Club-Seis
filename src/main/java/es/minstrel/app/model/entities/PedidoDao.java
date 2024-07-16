package es.minstrel.app.model.entities;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoDao extends JpaRepository<Pedido, Long> {
    Page<Pedido> findByReservaIsLikeIgnoreCase(String reserva, Pageable pageable);

}
