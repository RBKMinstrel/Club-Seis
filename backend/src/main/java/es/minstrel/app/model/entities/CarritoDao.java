package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoDao extends JpaRepository<Carrito, Long> {

    Optional<Carrito> findByUser(User user);

}
