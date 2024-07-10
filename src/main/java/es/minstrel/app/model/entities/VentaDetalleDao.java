package es.minstrel.app.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface VentaDetalleDao extends JpaRepository<VentaDetalle, Long> {

    List<VentaDetalle> findByVenta_FechaBetween(LocalDate startDate, LocalDate endDate);

}
