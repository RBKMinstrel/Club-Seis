package es.minstrel.app.model.entities;

import org.springframework.data.domain.Slice;

import java.time.LocalDate;

public interface CustomizedMovimientoDao {

    Slice<Movimiento> find(LocalDate fecha, Long conceptoId, Long categoriaId, Long cuentaId, int page, int size);

}
