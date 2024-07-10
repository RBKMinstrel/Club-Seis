package es.minstrel.app.rest.dtos;

import es.minstrel.app.model.entities.Pedido;
import es.minstrel.app.model.entities.PedidoDetalle;

import java.util.List;

public class PedidoConversor {

    private PedidoConversor() {
    }

    public final static List<PedidoDto> toPedidoDtos(List<Pedido> pedidoList) {
        return pedidoList.stream().map(PedidoConversor::toPedidoDto).toList();
    }

    public final static PedidoDto toPedidoDto(Pedido pedido) {
        return new PedidoDto(pedido.getId(), pedido.getReserva(), toExistenciaDtos(pedido.getPedidoDetalles().stream().toList()));
    }

    public final static List<ExistenciaDto> toExistenciaDtos(List<PedidoDetalle> pedidoDetalleList) {
        return pedidoDetalleList.stream().map(PedidoConversor::toExistenciaDto).toList();
    }

    public final static ExistenciaDto toExistenciaDto(PedidoDetalle pedidoDetalle) {
        return new ExistenciaDto(pedidoDetalle.getArticulo().getName(), pedidoDetalle.getTalla().getName(), pedidoDetalle.getCantidad());
    }
}
