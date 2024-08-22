package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConceptoDao extends JpaRepository<Concepto, Long> {

    boolean existsByName(String name);

    @Query("SELECT c FROM Concepto c WHERE LOWER(function('replace', c.name, 'á', 'a')) LIKE LOWER(function('replace', :name, 'á', 'a'))" +
            " AND LOWER(function('replace', c.name, 'é', 'e')) LIKE LOWER(function('replace', :name, 'é', 'e'))" +
            " AND LOWER(function('replace', c.name, 'í', 'i')) LIKE LOWER(function('replace', :name, 'í', 'i'))" +
            " AND LOWER(function('replace', c.name, 'ó', 'o')) LIKE LOWER(function('replace', :name, 'ó', 'o'))" +
            " AND LOWER(function('replace', c.name, 'ú', 'u')) LIKE LOWER(function('replace', :name, 'ú', 'u'))" +
            " AND LOWER(function('replace', c.name, 'ñ', 'n')) LIKE LOWER(function('replace', :name, 'ñ', 'n'))")
    Optional<Concepto> getConceptoByName(@Param("name") String name);

}
