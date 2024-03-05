package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConceptoDao extends JpaRepository<Concepto, Long> {

    boolean existsByName(String name);

}
