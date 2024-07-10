package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExistenciasDao extends JpaRepository<Existencias, Long> {

    Optional<Existencias> findByArticuloAndTalla(Articulo articulo, Talla talla);

}
