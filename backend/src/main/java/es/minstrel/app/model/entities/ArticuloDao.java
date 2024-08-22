package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticuloDao extends JpaRepository<Articulo, Long>, ArticuloDaoCustom {
}
