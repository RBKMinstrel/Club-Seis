package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoItemDao extends JpaRepository<CarritoItem, Long> {
}
