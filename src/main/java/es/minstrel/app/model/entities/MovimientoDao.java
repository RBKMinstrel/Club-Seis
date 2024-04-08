package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MovimientoDao extends JpaRepository<Movimiento, Long>, CustomizedMovimientoDao {

    List<Movimiento> findByConceptoAndFechaBetween(Concepto concepto, LocalDate fechaInicio, LocalDate fechaFin);

    List<Movimiento> findByCategoriaAndFechaBetween(Categoria categoria, LocalDate fechaInicio, LocalDate fechaFin);

    List<Movimiento> findByCuentaAndFechaBetween(Cuenta cuenta, LocalDate fechaInicio, LocalDate fechaFin);
}
