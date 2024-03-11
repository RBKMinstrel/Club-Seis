package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Movimiento;
import es.minstrel.app.model.entities.RazonSocial;

import java.time.LocalDate;
import java.util.List;

public class MovimientoConversor {

    private MovimientoConversor() {
    }

    public final static List<ShortMovimientoDto> toShortMovimientoDtos(List<Movimiento> movimientosList) {
        return movimientosList.stream().map(MovimientoConversor::toShortMovimientoDto).toList();
    }

    public final static ShortMovimientoDto toShortMovimientoDto(Movimiento movimiento) {
        return new ShortMovimientoDto(movimiento.getId(), toDays(movimiento.getFecha()),
                toRazonSocialText(movimiento.getRazonSocial()), movimiento.getConcepto().getName(),
                movimiento.getCategoria().getName(), movimiento.getCuenta().getName(), movimiento.getTotal());
    }

    public final static Movimiento toMovimiento(MovimientoDto movimientoDto) {
        return new Movimiento(fromDays(movimientoDto.getFecha()), movimientoDto.getEsGasto(),
                movimientoDto.getBase0(), movimientoDto.getBase4(), movimientoDto.getBase10(), movimientoDto.getBase21());
    }

    public final static MovimientoDto toMovimientoDto(Movimiento movimiento) {
        return new MovimientoDto(movimiento.getId(), toDays(movimiento.getFecha()), movimiento.isEsGasto(),
                movimiento.getBase0(), movimiento.getBase4(), movimiento.getBase10(), movimiento.getBase21(),
                movimiento.getRazonSocial().getId(), movimiento.getConcepto().getId(), movimiento.getCategoria().getId(),
                movimiento.getCuenta().getId());
    }

    private final static String toRazonSocialText(RazonSocial razonSocial) {
        return razonSocial.getDenominacion() +
                " (" +
                razonSocial.getCifnif() +
                ")";
    }

    private final static long toDays(LocalDate date) {
        return date.toEpochDay();
    }

    public final static LocalDate fromDays(Long millis) {
        if (millis != null)
            return LocalDate.ofEpochDay(millis);
        else
            return null;
    }
}
