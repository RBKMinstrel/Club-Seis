package es.minstrel.app.rest.dtos;

import java.util.List;

public class PedidoDto {

    private Long id;
    private String reserva;
    private List<ExistenciaDto> subItems;

    public PedidoDto() {
    }

    public PedidoDto(Long id, String reserva, List<ExistenciaDto> subItems) {
        this.id = id;
        this.reserva = reserva;
        this.subItems = subItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReserva() {
        return reserva;
    }

    public void setReserva(String reserva) {
        this.reserva = reserva;
    }

    public List<ExistenciaDto> getSubItems() {
        return subItems;
    }

    public void setSubItems(List<ExistenciaDto> subItems) {
        this.subItems = subItems;
    }
}
