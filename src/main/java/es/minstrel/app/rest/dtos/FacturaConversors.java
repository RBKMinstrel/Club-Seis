package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Factura;

import java.util.List;

import static es.minstrel.app.rest.dtos.FechaConversor.toDays;

public class FacturaConversors {

    private FacturaConversors() {
    }

    public static final List<FacturaDto> toFacturaDtos(List<Factura> facturaList) {
        return facturaList.stream().map(FacturaConversors::toFacturaDto).toList();
    }

    public static final FacturaDto toFacturaDto(Factura factura) {
        return new FacturaDto(factura.getId(), factura.getCodigo(), toDays(factura.getMovimiento().getFecha()),
                factura.getTipo().getValor(), factura.getAnotacion(), factura.getEmisor(), factura.getEmisor());
    }

    public static final Factura toFactura(MovimientoParamsDto movimientoParamsDto) {
        return new Factura(movimientoParamsDto.getCodigo(),
                Factura.Tipo.fromValor(movimientoParamsDto.getTipo()),
                movimientoParamsDto.getAnotacion(), movimientoParamsDto.getEmisor(), movimientoParamsDto.getReceptor());
    }

}
