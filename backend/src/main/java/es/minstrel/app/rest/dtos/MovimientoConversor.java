package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Movimiento;
import es.minstrel.app.model.entities.RazonSocial;

import java.util.List;

import static es.minstrel.app.rest.dtos.FechaConversor.fromDays;
import static es.minstrel.app.rest.dtos.FechaConversor.toDays;

public class MovimientoConversor {

    private MovimientoConversor() {
    }

    public final static List<MovimientoShortDto> toShortMovimientoDtos(List<Movimiento> movimientosList) {
        return movimientosList.stream().map(MovimientoConversor::toShortMovimientoDto).toList();
    }

    public final static MovimientoShortDto toShortMovimientoDto(Movimiento movimiento) {
        return new MovimientoShortDto(movimiento.getId(), toDays(movimiento.getFecha()), toRazonSocialText(movimiento.getRazonSocial()),
                movimiento.getConcepto() != null ? (movimiento.getConcepto().getName()) : "",
                movimiento.getCategoria() != null ? (movimiento.getCategoria().getName()) : "",
                movimiento.getCuenta() != null ? (movimiento.getCuenta().getName()) : "",
                movimiento.getTotal(), movimiento.isEsGasto());
    }

    public final static Movimiento toMovimiento(MovimientoDto movimientoDto) {
        return new Movimiento(fromDays(movimientoDto.getFecha()), movimientoDto.getEsGasto(),
                movimientoDto.getBase0(), movimientoDto.getBase4(), movimientoDto.getBase10(), movimientoDto.getBase21());
    }

    public final static MovimientoDto toMovimientoDto(Movimiento movimiento) {
        return new MovimientoDto(movimiento.getId(), toDays(movimiento.getFecha()), movimiento.isEsGasto(),
                movimiento.getBase0(), movimiento.getBase4(), movimiento.getBase10(), movimiento.getBase21(),
                movimiento.getRazonSocial() != null ? movimiento.getRazonSocial().getId() : null,
                movimiento.getConcepto() != null ? movimiento.getConcepto().getId() : null,
                movimiento.getCategoria() != null ? movimiento.getCategoria().getId() : null,
                movimiento.getCuenta() != null ? movimiento.getCuenta().getId() : null);
    }

    private final static String toRazonSocialText(RazonSocial razonSocial) {
        return razonSocial != null ? (razonSocial.getDenominacion() +
                " (" +
                razonSocial.getCifnif() +
                ")") : "";
    }
}
