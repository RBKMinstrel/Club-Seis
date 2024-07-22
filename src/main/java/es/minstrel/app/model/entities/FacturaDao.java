package es.minstrel.app.model.entities;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaDao extends JpaRepository<Factura, Long> {

    Page<Factura> findByCodigoIsLikeIgnoreCaseOrAnotacionIsLikeIgnoreCaseOrEmisorIsLikeIgnoreCaseOrReceptorIsLikeIgnoreCase(String codigo, String anotacion, String emisor, String receptor, Pageable pageable);

}
