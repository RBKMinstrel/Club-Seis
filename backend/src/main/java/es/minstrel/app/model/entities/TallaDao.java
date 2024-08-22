package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TallaDao extends JpaRepository<Talla, Long> {

    Optional<Talla> findByName(String name);

}
